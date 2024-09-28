import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createMyTheme } from "./styles/Theme";
import NavBar from "./Components/Navegation/NavBar";
import Login from "./Components/Security/Login";
import Registro from "./Components/Security/Registro";
import EventosPrivados from "./Components/Events/EventosPrivados";
import Inicio from "./Components/Home/Inicio";
import Proveedores from "./Components/Proveedores/Proveedores";
import Usuarios from "./Components/Usuarios/Usuarios";

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
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/registro" element={<Registro />} />
            <Route
              exact
              path="/eventosprivados"
              element={<EventosPrivados />}
            />
            <Route path="/" element={<Inicio />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/usuarios" element={<Usuarios />} />
          </Routes>
        </main>
      </ThemeProvider>
    </Router>
  );
}

export default App;
