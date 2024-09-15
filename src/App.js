import React from "react";
import Login from "./Components/Security/Login";
import Registro from "./Components/Security/Registro";
import MenuAppBar from "./Components/Navegation/MenuAppBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <MenuAppBar />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;
