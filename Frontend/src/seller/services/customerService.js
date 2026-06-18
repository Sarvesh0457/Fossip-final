// src/seller/services/customerService.js

import API from "./axiosService.js";

export const getCustomers = async () => {
  const res = await API.get("/seller/customers");
  return res.data.data;
};
