import API from "./axiosClient";

export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

export const loginApi = (data) => {
  return API.post("/auth/login", data);
};

export const logoutApi = () => {
  return API.post("/auth/logout");
};
