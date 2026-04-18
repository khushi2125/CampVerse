// src/api/client.js
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // Django ka URL

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


