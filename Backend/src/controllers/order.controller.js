import { Order } from "../models/Order.js";
import mongoose from "mongoose";

import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import { User } from "../models/User.js";

import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const createOrder = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const cartItems = await Cart.find({
    user: req.user._id,
  }).populate("product");

  if (!cartItems.length) {
    throw new ApiError(400, "Cart is empty");
  }

  // Phone number check
  if (!user.phoneNumber) {
    throw new ApiError(
      400,
      "Please add your phone number before placing an order",
    );
  }

  // Address check
  if (
    !user.address ||
    !user.address.street ||
    !user.address.city ||
    !user.address.state ||
    !user.address.country ||
    !user.address.pincode
  ) {
    throw new ApiError(
      400,
      "Please complete your address before placing an order",
    );
  }

  const orderItems = [];
  let totalAmount = 0;

  for (const item of cartItems) {
    orderItems.push({
      product: item.product._id,
      seller: item.product.seller,
      quantity: item.quantity,
      price: item.product.price,
      size: item.size,
      color: item.color,
    });

    totalAmount += item.product.price * item.quantity;
  }

  const { paymentId, razorpayOrderId, paymentMethod } = req.body;
  const resolvedPaymentMethod = paymentMethod === "cod" ? "cod" : "card";
  const isCashOnDelivery = resolvedPaymentMethod === "cod";

  const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    totalAmount,
    shippingAddress: user.address,

    paymentId,
    razorpayOrderId,

    paymentMethod: resolvedPaymentMethod,
    paymentStatus: isCashOnDelivery ? "pending" : "paid",
    orderStatus: isCashOnDelivery ? "pending" : "confirmed",
  });

  await Cart.deleteMany({
    user: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order created successfully"));
});

const getMyOrders = asyncHandler(async (req, res) => {
  console.log("aidmo");
  const orders = await Order.find({
    user: req.user._id,
  })
    .populate("items.product")
    .sort({ createdAt: -1 });
  console.log("orders:", orders);
  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Buyer orders fetched"));
});

const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // 🔥 prevent crash
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid order id");
  }

  const order = await Order.findById(id).populate("items.product");

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order fetched successfully"));
});

const getSellerOrders = asyncHandler(async (req, res) => {
  const sellerId = req.user._id;

  const orders = await Order.find({
    "items.seller": sellerId,
  })
    .populate("user", "username email phoneNumber")
    .populate("items.product")
    .sort({ createdAt: -1 });

  // OPTIONAL: filter only seller items inside each order
  const filteredOrders = orders.map((order) => {
    const sellerItems = order.items.filter(
      (item) => item.seller.toString() === sellerId.toString(),
    );

    return {
      ...order._doc,
      items: sellerItems,
    };
  });

  return res
    .status(200)
    .json(new ApiResponse(200, filteredOrders, "Seller orders fetched"));
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  order.orderStatus = status;

  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order status updated successfully"));
});

export {
  createOrder,
  getMyOrders,
  getOrderById,
  getSellerOrders,
  updateOrderStatus,
};
