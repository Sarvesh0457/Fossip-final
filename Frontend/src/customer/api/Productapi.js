import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const fetchProducts = async (gender) => {
  const response = await axios.get(`${API_URL}/products`, {
    params: gender ? { gender } : {},
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  // Because your backend returns ApiResponse
  return response.data.data;
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`${API_URL}/products/${id}`);
  return res.data.data;
};
