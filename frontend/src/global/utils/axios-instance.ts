import axios from "axios";
import { useAuthStore } from "../contexts/auth-store";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://192.168.29.108:8000/api/", // Adjust based on your dev server
});

// Request interceptor to add the JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration (Optional, can be added later)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle logout or token refresh here if needed
      console.error("Session expired. Please login again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
