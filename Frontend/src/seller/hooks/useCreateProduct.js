// src/seller/hooks/useCreateProduct.js

import { useState } from "react";
import { productService } from "../services/productService";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

const initialState = {
  name: "",
  description: "",
  images: [],
  category: "",
  subCategory: "",
  gender: "",
  brand: "",
  price: "",
  discountedPrice: "",
  quantity: "",
  lowStockThreshold: 5,
  size: [],
  color: [],
  fabric: "",
  deliveryTime: "3-5 Days",
  isFeatured: false,
};

const useCreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(initialState);

  const handleInputChange = (field, value) => {
    // Image validation
    if (field === "images") {
      const files = Array.from(value);

      const oversizedImage = files.find((file) => file.size > MAX_IMAGE_SIZE);

      if (oversizedImage) {
        alert(
          `"${oversizedImage.name}" is larger than 5MB.\nPlease select smaller images.`,
        );
        return;
      }

      setProduct((prev) => ({
        ...prev,
        images: files,
      }));

      return;
    }

    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const createProduct = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      Object.entries(product).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((image) => {
            formData.append("images", image);
          });
        } else if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(key, item);
          });
        } else {
          formData.append(key, value);
        }
      });

      await productService.createProduct(formData);

      setProduct(initialState);

      return true;
    } catch (error) {
      alert(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    product,
    loading,
    handleInputChange,
    createProduct,
  };
};

export default useCreateProduct;
