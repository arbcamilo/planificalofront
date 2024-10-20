// src/Components/Security/Login.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import {
  Container,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import useStyles from "./LoginStyles";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook para la navegación
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(credentials);
    if (result.success) {
      navigate("/"); // Redirigir al home después de un inicio de sesión exitoso
    } else {
      setError(result.message); // Mostrar mensaje de error
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <Box className={classes.box}>
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            fullWidth
            id="email"
            label="Correo"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar Sesión
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/" variant="body2">
                {"¿Olvidaste tu contraseña?"}
              </Link>
            </Grid>
          </Grid>
          <Button
            color="primary"
            component={Link}
            to="/register"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrarse
          </Button>
          {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
