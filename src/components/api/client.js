// src/api/client.js
import axios from "axios";

const API_BASE_URL = "https://campverse-backend-cn95.onrender.com";
// const API_BASE_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,  // Send cookies for CSRF
});

// request interceptor: har request pe token laga do
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("campverse_token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default api;


