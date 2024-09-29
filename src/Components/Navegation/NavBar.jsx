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
// import EventIcon from "@mui/icons-material/Event";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LanguageIcon from "@mui/icons-material/Language";
import PeopleIcon from "@mui/icons-material/People";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NavBar = ({ toggleTheme, mode }) => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const [usersAnchorEl, setUsersAnchorEl] = useState(null);
  const [providersAnchorEl, setProvidersAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageMenu = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchorEl(null);
  };

  const handleUsersMenu = (event) => {
    setUsersAnchorEl(event.currentTarget);
  };

  const handleUsersClose = () => {
    setUsersAnchorEl(null);
  };

  const handleProvidersMenu = (event) => {
    setProvidersAnchorEl(event.currentTarget);
  };

  const handleProvidersClose = () => {
    setProvidersAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleLanguageClose();
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Box
              component="img"
              src="/logo1.png"
              alt="Logo"
              sx={{ height: 60, width: 150, marginRight: 2 }}
            />
          </Box>
          <Button color="inherit" component={Link} to="/">
            <HomeIcon sx={{ marginRight: 1 }} />
            {t("home")}
          </Button>
          {/* <Button color="inherit" component={Link} to="/">
            <EventIcon sx={{ marginRight: 1 }} />
            {t("events")}
          </Button> */}
          <Button color="inherit" onClick={handleUsersMenu}>
            <PeopleIcon sx={{ marginRight: 1 }} />
            Usuarios
          </Button>
          <Menu
            anchorEl={usersAnchorEl}
            open={Boolean(usersAnchorEl)}
            onClose={handleUsersClose}
            MenuListProps={{
              onMouseLeave: handleUsersClose,
            }}
          >
            <MenuItem component={Link} to="/events-list">
              <ListItemText primary="Eventos" />
            </MenuItem>
            <MenuItem component={Link} to="/guests">
              <ListItemText primary="Guests" />
            </MenuItem>
          </Menu>
          <Button color="inherit" onClick={handleProvidersMenu}>
            <LocalShippingIcon sx={{ marginRight: 1 }} />
            Proveedores
          </Button>
          <Menu
            anchorEl={providersAnchorEl}
            open={Boolean(providersAnchorEl)}
            onClose={handleProvidersClose}
            MenuListProps={{
              onMouseLeave: handleProvidersClose,
            }}
          >
            {/* <MenuItem component={Link} to="/requests">
              <ListItemText primary="Solicitudes" />
            </MenuItem> */}
            <MenuItem component={Link} to="/products">
              <ListItemText primary="Productos" />
            </MenuItem>
            <MenuItem component={Link} to="/services">
              <ListItemText primary="Servicios" />
            </MenuItem>
          </Menu>
          <Button color="inherit" onClick={handleMenu}>
            <AdminPanelSettingsIcon sx={{ marginRight: 1 }} />
            ADMIN
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{
              onMouseLeave: handleClose,
            }}
          >
            <MenuItem component={Link} to="/providers">
              <ListItemText primary="Providers" />
            </MenuItem>
            <MenuItem component={Link} to="/users">
              <ListItemText primary="Users" />
            </MenuItem>
          </Menu>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* <Button color="inherit" component={Link} to="/login">
            {t("login")}
          </Button>
          <Button color="inherit" component={Link} to="/registro">
            {t("createAccount")}
          </Button> */}
          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton color="inherit" onClick={handleLanguageMenu}>
            <LanguageIcon />
          </IconButton>
          <Menu
            anchorEl={languageAnchorEl}
            open={Boolean(languageAnchorEl)}
            onClose={handleLanguageClose}
            MenuListProps={{
              onMouseLeave: handleLanguageClose,
            }}
          >
            <MenuItem onClick={() => changeLanguage("en")}>
              <ListItemText primary="Español" />
            </MenuItem>
            <MenuItem onClick={() => changeLanguage("es")}>
              <ListItemText primary="English" />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
