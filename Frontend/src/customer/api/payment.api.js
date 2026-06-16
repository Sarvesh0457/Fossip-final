import API from "./axiosClient";

export const createPaymentOrderApi = (amount) => {
  return API.post("/payment/create-order", { amount });
};

export const verifyPaymentApi = (data) => {
  return API.post("/payment/verify", data);
};
