// src/axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7003/api", // Cambia esto a la URL de tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
