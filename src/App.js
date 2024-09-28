import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createMyTheme } from "./styles/Theme";
import NavBar from "./Components/Navegation/NavBar";
import Inicio from "./Components/Home/Inicio";
import Providers from "./Components/Providers/Providers";
import Users from "./Components/Users/Users";
import Services from "./Components/Services/Services";
import Products from "./Components/Products/Products";
import Guests from "./Components/Guests/Guests";

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
            <Route path="/" element={<Inicio />} />
            <Route path="/providers" element={<Providers />} />
            <Route path="/users" element={<Users />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/guest" element={<Guests />} />
          </Routes>
        </main>
      </ThemeProvider>
    </Router>
  );
}

export default App;
