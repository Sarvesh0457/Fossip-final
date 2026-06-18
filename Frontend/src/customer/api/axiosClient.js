import axios from "axios";
import { getApiBaseUrl } from "../../utils/apiBaseUrl";

const axiosClient = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token && token !== "undefined" && token !== "null") {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;
