import axios from "axios";
import { getApiBaseUrl } from "../../utils/apiBaseUrl";

const axiosService = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
});

axiosService.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token && token !== "undefined" && token !== "null") {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosService;
