// src/Components/Profile/Profile.jsx
import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig"; // Asegúrate de que la ruta sea correcta
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
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("admin/Users/GetAll"); // Ajusta la URL según tu backend
        const token = localStorage.getItem("token"); // Obtén el token del almacenamiento local
        const decodedToken = parseJwt(token); // Decodifica el token para obtener el ID del usuario
        const userId = decodedToken["id"];
        const userProfile = response.data.entity.find(
          (user) => user.id === userId
        );
        setProfileData(userProfile);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  // Función para decodificar el token JWT
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

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
              {profileData.fullName}
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              <strong>Información de perfil</strong>
            </Typography>
            <Box>
              <Typography variant="body1">
                <strong>Tipo de usuario:</strong>
                {profileData.userType === 0
                  ? " Administrador"
                  : profileData.userType === 1
                  ? " Usuario"
                  : profileData.userType === 2
                  ? " Proveedor"
                  : " Desconocido"}
              </Typography>
              <Typography variant="body1">
                <strong>Tipo de documento:</strong> {profileData.documentType}
              </Typography>
              <Typography variant="body1">
                <strong>Número de documento:</strong> 123456789
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {profileData.email}
              </Typography>
              <Typography variant="body1">
                <strong>Teléfono:</strong> {profileData.phoneNumber}
              </Typography>
              <Typography variant="body1">
                <strong>Fecha Nacimiento:</strong> {profileData.birthDate}
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
