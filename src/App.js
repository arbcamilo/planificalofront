import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createMyTheme } from "./styles/Theme";
import NavBar from "./Components/Navegation/NavBar";
import Login from "./Components/Security/Login";
import Registro from "./Components/Security/Registro";
import Inicio from "./Components/Home/Inicio";
import Providers from "./Components/Providers/Providers";
import Users from "./Components/Users/Users";
// import Services from "./Components/Services/Services";

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
            <Route path="/" element={<Inicio />} />
            <Route path="/providers" element={<Providers />} />
            <Route path="/users" element={<Users />} />
            {/* <Route path="/services" element={<Services />} /> */}
          </Routes>
        </main>
      </ThemeProvider>
    </Router>
  );
}

export default App;
