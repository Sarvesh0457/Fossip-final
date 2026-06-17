import API from "./axiosClient";

export const fetchProducts = async (gender) => {
  const response = await API.get(`/products`, {
    params: gender ? { gender } : {},
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  // Because your backend returns ApiResponse
  return response.data.data;
};

export const fetchProductById = async (id) => {
  const res = await API.get(`/products/${id}`);
  return res.data.data;
};
