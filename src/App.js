import React from "react";
import Login from "./Components/Security/Login";
import Registro from "./Components/Security/Registro";
import MenuAppBar from "./Components/Navegation/MenuAppBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventosPrivados from "./Components/Events/EventosPrivados";
import Inicio from "./Components/Home/Inicio";

function App() {
  return (
    <Router>
      <MenuAppBar />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/registro" element={<Registro />} />
        <Route exact path="/eventosprivados" element={<EventosPrivados />} />
        <Route path="/" element={<Inicio />} />
      </Routes>
    </Router>
  );
}

export default App;
