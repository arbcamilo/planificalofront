// src/Components/Security/PrivateRoute.js
import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // Mientras se carga el estado, mostramos un mensaje o spinner.
    return <div>Cargando...</div>;
  }

  if (!user) {
    // Si no hay usuario, redirigimos a login.
    return <Navigate to="/login" />;
  }

  // Si se han definido roles y el rol del usuario no está permitido, redirigimos.
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  // Si todo está en orden, renderizamos el componente protegido.
  return <Component {...rest} />;
};

export default PrivateRoute;

