import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  ListItemText,
  Box,
  // Avatar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LanguageIcon from "@mui/icons-material/Language";
import PeopleIcon from "@mui/icons-material/People";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../Security/context/AuthContext";

const NavBar = ({ toggleTheme, mode }) => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const [usersAnchorEl, setUsersAnchorEl] = useState(null);
  const [providersAnchorEl, setProvidersAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

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

  const handleUserMenu = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleLanguageClose();
  };

  const renderMenuItems = () => {
    switch (user?.role) {
      case "Admin":
        return (
          <>
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
                <ListItemText primary={t("providers")} />
              </MenuItem>
              <MenuItem component={Link} to="/users">
                <ListItemText primary={t("users")} />
              </MenuItem>
            </Menu>
          </>
        );
      case "provider":
        return (
          <>
            <Button color="inherit" onClick={handleProvidersMenu}>
              <LocalShippingIcon sx={{ marginRight: 1 }} />
              {t("providers")}
            </Button>
            <Menu
              anchorEl={providersAnchorEl}
              open={Boolean(providersAnchorEl)}
              onClose={handleProvidersClose}
              MenuListProps={{
                onMouseLeave: handleProvidersClose,
              }}
            >
              <MenuItem component={Link} to="/products">
                <ListItemText primary={t("products")} />
              </MenuItem>
              <MenuItem component={Link} to="/services">
                <ListItemText primary={t("services")} />
              </MenuItem>
            </Menu>
          </>
        );
      case "User":
        return (
          <>
            <Button color="inherit" onClick={handleUsersMenu}>
              <PeopleIcon sx={{ marginRight: 1 }} />
              {t("users")}
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
                <ListItemText primary={t("events")} />
              </MenuItem>
              <MenuItem component={Link} to="/guests">
                <ListItemText primary={t("guests")} />
              </MenuItem>
            </Menu>
          </>
        );
      default:
        return null;
    }
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
          {renderMenuItems()}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {user ? (
            <>
              <IconButton color="inherit" onClick={handleUserMenu}>
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={userMenuAnchorEl}
                open={Boolean(userMenuAnchorEl)}
                onClose={handleUserMenuClose}
                MenuListProps={{
                  onMouseLeave: handleUserMenuClose,
                }}
              >
                <MenuItem component={Link} to="/profile">
                  <Typography sx={{ marginRight: 2, fontWeight: "bold" }}>
                    {user.firstName}
                  </Typography>
                </MenuItem>
                <MenuItem component={Link} to="/profile">
                  <AccountCircleIcon sx={{ marginRight: 2 }} />
                  <ListItemText primary={t("myProfile")} />
                </MenuItem>
                <MenuItem onClick={logout}>
                  <ExitToAppIcon sx={{ marginRight: 2 }} />
                  <ListItemText primary={t("logout")} />
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                {t("login")}
              </Button>
              <Button color="inherit" component={Link} to="/register">
                {t("createAccount")}
              </Button>
            </>
          )}
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
