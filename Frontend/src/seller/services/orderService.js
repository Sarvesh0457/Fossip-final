import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");

  return {
    Authorization: `Bearer ${token}`,
  };
};

// SELLER ORDERS ONLY
export const getOrders = async () => {
  const res = await axios.get(`${API_URL}/orders/seller-orders`, {
    headers: getAuthHeaders(),
  });

  return res.data.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const res = await axios.patch(
    `${API_URL}/orders/${orderId}/status`,
    { status },
    {
      headers: getAuthHeaders(),
    },
  );

  return res.data.data;
};
