import API from "./axiosClient";

export const getCurrentUser = () => {
  return API.get("/users/me");
};

export const logoutUser = () => {
  return API.post("/auth/logout");
};
