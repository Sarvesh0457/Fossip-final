import API from "./axiosClient";

export const createOrderApi = (paymentData) => {
  return API.post("/orders", paymentData);
};

export const getMyOrdersApi = () => {
  return API.get("/orders");
};
