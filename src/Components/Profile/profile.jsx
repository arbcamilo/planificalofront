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
  TextField,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userType: 0,
    firstName: "",
    lastName: "",
    userStatus: "Active",
    fullName: "",
    documentType: "",
    documentNumber: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    language: "es",
    photo: "",
  });

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
        setFormData({
          userType: userProfile.userType,
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          userStatus: userProfile.userStatus,
          fullName: userProfile.fullName,
          documentType: userProfile.documentType,
          documentNumber: userProfile.documentNumber,
          email: userProfile.email,
          phoneNumber: userProfile.phoneNumber,
          birthDate: userProfile.birthDate,
          language: "es",
          photo: userProfile.photo,
        });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateClick = async () => {
    if (isEditing) {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = parseJwt(token);
        const userId = decodedToken["id"];
        await axios.put(`/admin/Users/${userId}`, formData);
        setProfileData(formData);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating profile data:", error);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        photo: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
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
              src={formData.photo || "/path/to/profile-picture.jpg"}
              style={{ width: "150px", height: "150px", margin: "0 auto" }} // Increased size
            />
            {isEditing && (
              <div>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="upload-photo"
                  type="file"
                  onChange={handlePhotoChange}
                />
                <label htmlFor="upload-photo">
                  <IconButton color="primary" component="span">
                    <EditIcon />
                  </IconButton>
                </label>
              </div>
            )}
            {isEditing ? (
              <TextField
                name="fullName"
                label="Nombre Completo"
                value={formData.fullName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            ) : (
              <Typography variant="h6" style={{ marginTop: "10px" }}>
                {profileData.fullName}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography variant="h6" gutterBottom>
              <strong>Información de perfil</strong>
            </Typography>
            <Box>
              {isEditing ? (
                <>
                  <TextField
                    name="userType"
                    label="Tipo de Usuario"
                    value={formData.userType}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="documentType"
                    label="Tipo de Documento"
                    value={formData.documentType}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="documentNumber"
                    label="Número de Documento"
                    value={formData.documentNumber}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="firstName"
                    label="Nombres"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="lastName"
                    label="Apellidos"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="phoneNumber"
                    label="Teléfono"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="birthDate"
                    label="Fecha Nacimiento"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Tipo de usuario:</strong>
                    </Typography>
                    <Typography variant="body1">
                      <strong>Tipo de documento:</strong>
                    </Typography>
                    <Typography variant="body1">
                      <strong>Número de documento:</strong>
                    </Typography>
                    <Typography variant="body1">
                      <strong>Nombres:</strong>
                    </Typography>
                    <Typography variant="body1">
                      <strong>Apellidos:</strong>
                    </Typography>
                    <Typography variant="body1">
                      <strong>Email:</strong>
                    </Typography>
                    <Typography variant="body1">
                      <strong>Teléfono:</strong>
                    </Typography>
                    <Typography variant="body1">
                      <strong>Fecha Nacimiento:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      {profileData.userType === 0
                        ? " Administrador"
                        : profileData.userType === 1
                        ? " Usuario"
                        : profileData.userType === 2
                        ? " Proveedor"
                        : " Desconocido"}
                    </Typography>
                    <Typography variant="body1">
                      {profileData.documentType}
                    </Typography>
                    <Typography variant="body1">
                      {profileData.documentNumber}
                    </Typography>
                    <Typography variant="body1">
                      {profileData.firstName}
                    </Typography>
                    <Typography variant="body1">
                      {profileData.lastName}
                    </Typography>
                    <Typography variant="body1">{profileData.email}</Typography>
                    <Typography variant="body1">
                      {profileData.phoneNumber}
                    </Typography>
                    <Typography variant="body1">
                      {profileData.birthDate}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Box>
            <Box style={{ marginTop: "20px" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
                onClick={handleUpdateClick}
              >
                {isEditing ? "Guardar Cambios" : "Actualizar Información"}
              </Button>
              {/* <Button variant="outlined" color="secondary">
                Cambiar Contraseña
              </Button> */}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile;
