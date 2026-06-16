import API from "./axiosClient";

export const addToCartApi = async (data) => {
  return await API.post("/cart", data);
};

export const getCartApi = () => {
  return API.get("/cart");
};

export const removeFromCartApi = (id) => {
  return API.delete(`/cart/${id}`);
};

export const clearCartApi = () => {
  return API.delete("/cart");
};

export const updateCartApi = (id, data) => {
  return API.patch(`/cart/${id}`, data);
};
