// src/seller/services/productService.js

import API from "./axiosService";

export const productService = {
  // Get all seller products
  async getProducts() {
    const res = await API.get("/products/seller");
    return res.data;
  },

  // Get single product
  async getProductById(productId) {
    const res = await API.get(`/products/${productId}`);
    return res.data;
  },

  // Create product
  async createProduct(formData) {
    const res = await API.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },

  // Update product
  async updateProduct(productId, payload) {
    const res = await API.patch(`/products/${productId}`, payload);

    return res.data;
  },

  // Delete product
  async deleteProduct(productId) {
    const res = await API.delete(`/products/${productId}`);

    return res.data;
  },
};
