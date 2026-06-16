// src/seller/services/customerService.js

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
});

export const getCustomers = async () => {
  const res = await axios.get(`${BASE_URL}/seller/customers`, {
    headers: getAuthHeaders(),
  });

  return res.data.data;
};
