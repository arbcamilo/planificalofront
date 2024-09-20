import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import "./MenuAppBar.css";
import { Search, SearchIconWrapper, StyledInputBase } from "./StylesAppBar";

const MenuAppBar = ({ mode, toggleTheme }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          LOGO
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Buscar eventos"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Button color="inherit">
          <Link className="Link" to="/" color="inherit">
            Inicio
          </Link>
        </Button>
        <Button color="inherit">
          <Link className="Link" to="/eventosprivados">
            Eventos
          </Link>
        </Button>
        <Button color="inherit">Conócenos</Button>
        <Button color="inherit">Centro de Ayuda</Button>
        <Button color="inherit">
          <Link className="Link" to="/login">
            Login
          </Link>
        </Button>
        <IconButton color="inherit" onClick={toggleTheme}>
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MenuAppBar;
