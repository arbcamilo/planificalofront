// src/components/Logout.js
import React, { useContext } from "react";
import axios from "../../axiosConfig";
import { AuthContext } from "./context/AuthContext";

const Logout = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axios.post("/api/admin/Users/Logout");
      await logout();
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
