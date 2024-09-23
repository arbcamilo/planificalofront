import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  ListItemText,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link } from "react-router-dom";

const NavBar = ({ toggleTheme, mode }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src="/logo1.png"
            alt="Logo"
            sx={{ height: 60, width: 150, marginRight: 2 }}
          />
          <Button color="inherit" component={Link} to="/">
            <HomeIcon sx={{ marginRight: 1 }} />
            Inicio
          </Button>
          <Button color="inherit" component={Link} to="/eventosprivados">
            <EventIcon sx={{ marginRight: 1 }} />
            Eventos
          </Button>
          <Button color="inherit" component={Link} to="/conocenos">
            <InfoIcon sx={{ marginRight: 1 }} />
            Conócenos
          </Button>
          <Button color="inherit" onClick={handleMenu}>
            <AdminPanelSettingsIcon sx={{ marginRight: 1 }} />
            ADMIN
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/proveedores">
              <ListItemText primary="Proveedores" />
            </MenuItem>
            <MenuItem component={Link} to="/usuarios">
              <ListItemText primary="Usuarios" />
            </MenuItem>
          </Menu>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/registro">
            Crear Cuenta
          </Button>
          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
