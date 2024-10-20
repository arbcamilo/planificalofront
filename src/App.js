import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createMyTheme } from "./styles/Theme";
import NavBar from "./Components/Navegation/NavBar";
import Inicio from "./Components/Home/Home";
import Providers from "./Components/Providers/Providers";
import Users from "./Components/Users/Users";
import Services from "./Components/Services/Services";
import CreateEvents from "./Components/Events/CreateEvents";
import EventsList from "./Components/Events/EventsList";
import Products from "./Components/Products/Products";
import Guests from "./Components/Guests/Guests";
// import Login from "./Components/Security/Login";
// import Registro from "./Components/Security/Registro";

import { AuthProvider } from "./Components/Security/context/AuthContext";
import PrivateRoute from "./Components/Security/PrivateRoute";
import Login from "./Components/Security/Login";
import Logout from "./Components/Security/Logout";
import Register from "./Components/Security/Register";
import ResendConfirmation from "./Components/Security/ResendConfirmation";
import EditUser from "./Components/Security/EditUser";
import ForgotPassword from "./Components/Security/ForgotPassword";
import ResetPassword from "./Components/Security/ResetPassword";
import Profile from "./Components/Profile/profile";

function App() {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = createMyTheme(mode);

  return (
    <AuthProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavBar toggleTheme={toggleTheme} mode={mode} />
          <main
            style={{
              padding: "16px",
              marginTop: "64px", // Ajuste para la altura del AppBar
            }}
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/resend-confirmation"
                element={<ResendConfirmation />}
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
              <Route
                path="/edit-user"
                element={
                  <PrivateRoute
                    roles={["user", "admin"]}
                    component={EditUser}
                  />
                }
              />
              <Route
                path="/logout"
                element={
                  <PrivateRoute roles={["user", "admin"]} component={Logout} />
                }
              />
              {/* <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} /> */}
              <Route path="/" element={<Inicio />} />
              {/* Rutas privadas */}
              <Route
                path="/providers"
                element={<PrivateRoute component={Providers} />}
              />
              <Route
                path="/users"
                element={<PrivateRoute component={Users} />}
              />
              <Route
                path="/services"
                element={<PrivateRoute component={Services} />}
              />
              <Route
                path="/create-events"
                element={<PrivateRoute component={CreateEvents} />}
              />
              <Route
                path="/events-list"
                element={<PrivateRoute component={EventsList} />}
              />
              <Route
                path="/create-events/:id"
                element={<PrivateRoute component={CreateEvents} />}
              />
              <Route
                path="/products"
                element={<PrivateRoute component={Products} />}
              />
              <Route
                path="/guests"
                element={<PrivateRoute component={Guests} />}
              />
              <Route
                path="/profile"
                element={<PrivateRoute component={Profile} />}
              />
            </Routes>
          </main>
        </ThemeProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
