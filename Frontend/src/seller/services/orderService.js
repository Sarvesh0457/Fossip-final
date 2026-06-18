import API from "./axiosService";

// GET SELLER ORDERS
export const getOrders = async () => {
  const res = await API.get("/orders/seller-orders");

  return res.data.data;
};

// UPDATE ORDER STATUS
export const updateOrderStatus = async (orderId, status) => {
  const res = await API.patch(`/orders/${orderId}/status`, { status });

  return res.data.data;
};
