// src/Components/Security/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "../../../axiosConfig"; // Importa la instancia de Axios configurada
import { jwtDecode } from "jwt-decode"; // Importa jwtDecode como una exportación nombrada

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const decodedToken = jwtDecode(token);
          const userData = {
            email:
              decodedToken[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
              ],
            role: decodedToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ],
            firstName: decodedToken.FirstName,
            lastName: decodedToken.LastName,
            photo: decodedToken.Photo,
          };
          setUser(userData);
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
      const token = response.data.token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const decodedToken = jwtDecode(token);
      const userData = {
        email:
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ],
        role: decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
        firstName: decodedToken.FirstName,
        lastName: decodedToken.LastName,
        photo: decodedToken.Photo,
      };
      setUser(userData);
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
