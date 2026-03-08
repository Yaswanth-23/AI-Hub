import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-hub-blush-five.vercel.app/api",
  withCredentials: true,
});

// Attach JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;