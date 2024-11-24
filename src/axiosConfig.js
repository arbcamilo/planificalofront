// src/axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7003/api", // Cambia esto a la URL de tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token a cada solicitud
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
