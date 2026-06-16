import API from "./axiosClient";

export const addToWishlistApi = (productId) => {
  return API.post("/wishlist", { productId });
};

export const getWishlistApi = () => {
  return API.get("/wishlist");
};

export const removeWishlistApi = (productId) => {
  return API.delete(`/wishlist/${productId}`);
};

export const clearWishlistApi = () => {
  return API.delete("/wishlist");
};
