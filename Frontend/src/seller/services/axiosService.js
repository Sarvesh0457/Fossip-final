import axios from "axios";

// Automatically switches between Render live URL and Localhost
const baseURL =
  import.meta.env.MODE === "production"
    ? "/api/v1"
    : "http://localhost:5000/api/v1";

const axiosService = axios.create({
  baseURL: import.meta.env.VITE_API_URL || baseURL,
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
