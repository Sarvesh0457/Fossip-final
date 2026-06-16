// src/seller/services/productService.js

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");

  return {
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  };
};

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.message || data?.error || "Something went wrong.");
  }

  return data;
};

export const productService = {
  // Get all products
  async getProducts() {
    const response = await fetch(`${API_URL}/products/seller`, {
      headers: getAuthHeaders(),
    });

    return handleResponse(response);
  },

  // Get single product
  async getProductById(productId) {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      headers: getAuthHeaders(),
    });

    return handleResponse(response);
  },

  // Create product
  async createProduct(payload) {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: getAuthHeaders(), // NO content-type
      body: payload, // FormData directly
    });

    return handleResponse(response);
  },

  // Update product
  async updateProduct(productId, payload) {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    return handleResponse(response);
  },

  // Delete product
  async deleteProduct(productId) {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    return handleResponse(response);
  },
};
