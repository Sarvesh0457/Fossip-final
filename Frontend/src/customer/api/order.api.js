import API from "./axiosClient";

export const createOrderApi = (paymentData) => {
  return API.post("/orders", paymentData);
};

export const getMyOrders = async () => {
  try {
    console.log("anubhavmkmkkk");
    const response = await API.get("/orders/my-orders");

    console.log(response.data);

    return response.data.data;
  } catch (error) {
    console.error(error.response?.data || error);

    throw error.response?.data?.message || "Failed to fetch orders";
  }
};
