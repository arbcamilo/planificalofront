import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const Registro = () => {
  const [form, setForm] = useState({
    userType: "",
    documentType: "",
    documentNumber: "",
    firstName: "",
    lastName: "",
    razonSocial: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setErrors({ confirmPassword: "Las contraseñas no coinciden" });
    } else {
      // Aquí puedes manejar el envío del formulario
      console.log("Formulario enviado", form);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          Crea tu cuenta
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Completa los siguientes campos
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                label="Tipo de usuario"
                name="userType"
                value={form.userType}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="user">Usuario</MenuItem>
                <MenuItem value="admin">Proveedor</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Tipo de documento"
                name="documentType"
                value={form.documentType}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="dni">Cedula</MenuItem>
                <MenuItem value="passport">Pasaporte</MenuItem>
                <MenuItem value="nit">NIT</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Número de documento"
                name="documentNumber"
                value={form.documentNumber}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            {form.documentType === "nit" ? (
              <Grid item xs={12}>
                <TextField
                  label="Razón Social"
                  name="razonSocial"
                  value={form.razonSocial}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
            ) : (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Nombres"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Apellidos"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                label="Correo electrónico"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Repetir contraseña"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Registro;
