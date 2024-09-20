import React, { useState } from "react";
import Login from "./Components/Security/Login";
import Registro from "./Components/Security/Registro";
import MenuAppBar from "./Components/Navegation/MenuAppBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventosPrivados from "./Components/Events/EventosPrivados";
import Inicio from "./Components/Home/Inicio";
import { ThemeProvider } from "@mui/material/styles";
import { createMyTheme } from "./styles/Theme";
import CssBaseline from "@mui/material/CssBaseline";
// import OtherComponent from "./Components/OtherComponent";

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
        <MenuAppBar toggleTheme={toggleTheme} />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/registro" element={<Registro />} />
          <Route exact path="/eventosprivados" element={<EventosPrivados />} />
          <Route path="/" element={<Inicio />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
