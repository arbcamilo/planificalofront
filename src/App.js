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
import Login from "./Components/Security/Login";
import Registro from "./Components/Security/Registro";

function App() {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = createMyTheme(mode);

  return (
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
            <Route path="/registro" element={<Registro />} />
            <Route path="/" element={<Inicio />} />
            <Route path="/providers" element={<Providers />} />
            <Route path="/users" element={<Users />} />
            <Route path="/services" element={<Services />} />
            <Route path="/create-events" element={<CreateEvents />} />
            <Route path="/events-list" element={<EventsList />} />
            <Route path="/create-events/:id" element={<CreateEvents />} />
            <Route path="/products" element={<Products />} />
            <Route path="/guests" element={<Guests />} />
          </Routes>
        </main>
      </ThemeProvider>
    </Router>
  );
}

export default App;
