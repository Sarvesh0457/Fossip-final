// src/seller/services/customerService.js

import API from "./axiosService.js";

export const getCustomers = () => {
  return API.get("/seller/customers");

  return res.data.data;
};
