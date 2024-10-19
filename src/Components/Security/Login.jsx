// src/Components/Security/Login.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook para la navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(credentials);
    if (result.success) {
      navigate("/"); // Redirigir al home después de un inicio de sesión exitoso
    } else {
      setError(result.message); // Mostrar mensaje de error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        placeholder="Password"
        required
      />
      <button type="submit">Iniciar Sesión</button>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Mostrar mensaje de error */}
    </form>
  );
};

export default Login;
