import React from "react";
import {
  Container,
  Grid,
  Typography,
  Avatar,
  Button,
  Paper,
  Box,
} from "@mui/material";

const Profile = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Mi Perfil
      </Typography>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
            <Avatar
              alt="Profile Picture"
              src="/path/to/profile-picture.jpg"
              style={{ width: "100px", height: "100px", margin: "0 auto" }}
            />
            <Typography variant="h6" style={{ marginTop: "10px" }}>
              Nombre del Usuario
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Información de perfil
            </Typography>
            <Box>
              <Typography variant="body1">
                <strong>Tipo de documento:</strong> Cédula
              </Typography>
              <Typography variant="body1">
                <strong>Número de documento:</strong> 123456789
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> usuario@example.com
              </Typography>
              <Typography variant="body1">
                <strong>Teléfono:</strong> +1234567890
              </Typography>
            </Box>
            <Box style={{ marginTop: "20px" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
              >
                Actualizar Información
              </Button>
              <Button variant="outlined" color="secondary">
                Cambiar Contraseña
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile;
