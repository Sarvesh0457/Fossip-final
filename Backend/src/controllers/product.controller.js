import { Product } from "../models/Product.js";
import { SellerProfile } from "../models/SellerProfile.js";
import { User } from "../models/User.js";

import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const createProduct = asyncHandler(async (req, res) => {
  console.log("HEADERS:", req.headers);
  console.log("BODY:", req.body);
  const {
    name,
    description,
    category,
    subCategory,
    gender,
    brand,
    price,
    discountedPrice,
    quantity,
    lowStockThreshold,
    size,
    color,
    fabric,
    deliveryTime,
    isFeatured,
  } = req.body;

  const seller = await User.findById(req.user._id);

  if (!seller) {
    throw new ApiError(404, "Seller not found");
  }

  const sellerProfile = await SellerProfile.findOne({
    user: seller._id,
  });

  if (!sellerProfile) {
    throw new ApiError(
      400,
      "Please complete your seller profile before creating products.",
    );
  }

  if (!seller.phoneNumber) {
    throw new ApiError(
      400,
      "Please add your phone number before creating products.",
    );
  }

  if (
    !seller.address ||
    !seller.address.street ||
    !seller.address.city ||
    !seller.address.state ||
    !seller.address.country ||
    !seller.address.pincode
  ) {
    throw new ApiError(
      400,
      "Please complete your address before creating products.",
    );
  }

  if (
    !sellerProfile.storeName ||
    !sellerProfile.bankAccountNumber ||
    !sellerProfile.upiId
  ) {
    throw new ApiError(
      400,
      "Please complete all required seller profile details.",
    );
  }

  const uploadedImages = [];

  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      if (file.size > 5 * 1024 * 1024) {
        throw new ApiError(
          400,
          `${file.originalname} exceeds the maximum size of 5MB`,
        );
      }

      const image = await uploadToCloudinary(file.path);

      uploadedImages.push({
        url: image.url,
        publicId: image.publicId,
      });
    }
  }

  const product = await Product.create({
    seller: req.user._id,
    name,
    description,
    images: uploadedImages,
    category,
    subCategory,
    gender,
    brand,
    price,
    discountedPrice,
    quantity,
    lowStockThreshold,
    size,
    color,
    fabric,
    deliveryTime,
    isFeatured,

    isPublished: true,
    isDeleted: false,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = req.product;

  if (product.seller.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this product");
  }

  await product.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Product deleted successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    images,
    category,
    subCategory,
    brand,
    price,
    discountedPrice,
    quantity,
    lowStockThreshold,
    size,
    color,
    fabric,
    deliveryTime,
    isFeatured,
  } = req.body;

  const product = req.product;

  if (product.seller.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this product");
  }

  if (name) product.name = name;
  if (description) product.description = description;
  if (images) product.images = images;
  if (category) product.category = category;
  if (subCategory) product.subCategory = subCategory;
  if (brand) product.brand = brand;
  if (price !== undefined) product.price = price;

  if (discountedPrice !== undefined) {
    product.discountedPrice = discountedPrice;
  }

  if (quantity !== undefined) {
    product.quantity = quantity;
  }

  if (lowStockThreshold !== undefined) {
    product.lowStockThreshold = lowStockThreshold;
  }

  if (size) product.size = size;
  if (color) product.color = color;
  if (fabric) product.fabric = fabric;
  if (deliveryTime) product.deliveryTime = deliveryTime;

  if (isFeatured !== undefined) {
    product.isFeatured = isFeatured;
  }

  await product.save();

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product updated successfully"));
});

const getProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const query = {
    seller: req.user._id,
    isDeleted: false,
  };

  if (req.query.category) {
    query.category = req.query.category;
  }

  if (req.query.brand) {
    query.brand = req.query.brand;
  }

  const totalItems = await Product.countDocuments(query);

  const products = await Product.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const inventoryValue = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const stats = {
    inventoryValue,
    inventoryGrowth: 0,
    totalSku: totalItems,
    warehouseCapacity: 100,
  };

  const pagination = {
    currentPage: page,
    totalPages: Math.ceil(totalItems / limit),
    totalItems,
    itemsPerPage: limit,
  };

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        products,
        stats,
        pagination,
      },
      "Products fetched successfully",
    ),
  );
});

const SingleProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});

const getAllProductsForBuyers = asyncHandler(async (req, res) => {
  const { gender } = req.query;

  let query = {
    isDeleted: { $ne: true },
    isPublished: { $ne: false },
  };

  if (gender) {
    const escapedGender = String(gender).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    query.gender = new RegExp(`^${escapedGender}$`, "i");
  }

  const products = await Product.find(query).sort({ createdAt: -1 });

  const filters = {
    categories: await Product.distinct("category", query),
    brands: await Product.distinct("brand", query),
    colors: await Product.distinct("color", query),
    fabrics: await Product.distinct("fabric", query),
  };

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { products, filters },
        "Products fetched successfully",
      ),
    );
});

export {
  createProduct,
  getAllProductsForBuyers,
  deleteProduct,
  updateProduct,
  getProducts,
  SingleProductById,
};
