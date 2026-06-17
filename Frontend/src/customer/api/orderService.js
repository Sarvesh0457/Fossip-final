import API from "./axiosClient";

// Get all orders of logged-in customer
export const getMyOrders = async () => {
  try {
    const response = await axiosInstance.get("/orders/my-orders");

    return response.data.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch orders";
  }
};

// Get single order
export const getOrderById = async (id) => {
  try {
    const response = await axiosInstance.get(`/orders/${id}`);

    return response.data.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch order";
  }
};
