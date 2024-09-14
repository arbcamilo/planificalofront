import React from "react";
// import Login from './Components/Security/Login';
import Registro from "./Components/Security/Registro";
import MenuAppBar from "./Components/Navegation/MenuAppBar";

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      <MenuAppBar />
      <Registro />
    </div>
  );
}

export default App;
