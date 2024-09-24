// src/theme.js
import { createTheme } from "@mui/material/styles";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: { main: "#1976d2" },
          background: { default: "#fff", paper: "#fff" },
        }
      : {
          // palette values for dark mode
          primary: { main: "#90caf9" },
          background: { default: "#121212", paper: "#121212" },
        }),
  },
});

export const createMyTheme = (mode) => createTheme(getDesignTokens(mode));
