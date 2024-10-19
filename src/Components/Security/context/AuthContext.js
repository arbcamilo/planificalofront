// src/Components/Security/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "../../../axiosConfig"; // Importa la instancia de Axios configurada

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await axios.get("/admin/Users/me");
          setUser(response.data);
        }
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post("/admin/Users/Login", credentials);
      setUser(response.data);
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        message: error.response.data.message || "Login failed",
      };
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
