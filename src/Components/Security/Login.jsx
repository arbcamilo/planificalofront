import React from "react";
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
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <Box className={classes.box}>
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inicia Sesión
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
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
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            <Link className={classes.link} to="/registro">
              Registrarse
            </Link>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
