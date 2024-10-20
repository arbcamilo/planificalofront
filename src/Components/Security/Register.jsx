import React, { useState } from "react";
import axios from "../../axiosConfig";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    emailConfirmed: false,
    phoneNumber: "",
    phoneNumberConfirmed: true,
    firstName: "",
    lastName: "",
    documentType: "CC",
    userType: 2,
    userStatus: "Active",
    birthDate: "",
    accountCreationDate: "2024-10-19",
    password: "",
    confirmPassword: "",
    language: "es",
    photo: "", // Add photo field
  });

  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        photo: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/admin/Users/CreateUser", formData);
      console.log("User created successfully:", response.data.entity);
      setOpen(true); // Open the dialog on successful response
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Container component="main" maxWidth="sm">
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
                  variant="outlined"
                  required
                  fullWidth
                  id="userType"
                  label="User Type"
                  name="userType"
                  value={formData.userType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      userType: parseInt(e.target.value, 10),
                    })
                  }
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value={1}>Usuario</option>
                  <option value={2}>Proveedor</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  variant="outlined"
                  required
                  fullWidth
                  id="documentType"
                  label="Document Type"
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="NIT">NIT</option>
                  <option value="CC">CC</option>
                  <option value="CE">CE</option>
                  <option value="PA">PA</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="documet"
                  label="Document"
                  name="document"
                  autoComplete="document"
                  value={formData.document}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="Username"
                  name="userName"
                  autoComplete="username"
                  value={formData.userName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phone"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="fname"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="birthDate"
                  label="Birth Date"
                  name="birthDate"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.birthDate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {formData.password && formData.confirmPassword && (
                  <Typography
                    variant="body2"
                    color={
                      formData.password === formData.confirmPassword
                        ? "green"
                        : "red"
                    }
                  >
                    {formData.password === formData.confirmPassword
                      ? "Las contraseñas coinciden"
                      : "Las contraseñas no coinciden"}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="photo"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="photo">
                  <Button variant="contained" color="primary" component="span">
                    Upload Profile Picture
                  </Button>
                </label>
                {formData.photo && (
                  <Box mt={2} textAlign="center">
                    <img
                      src={formData.photo}
                      alt="Profile Preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Create User
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Usuario creado exitosamente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A tu correo debió llegar un email de confirmación para completar el
            registro. Una vez lo confirmes podrás iniciar sesión.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button component={Link} to="/login" color="primary">
            Inicio de sesión
          </Button>
          <Button component={Link} to="/" color="primary">
            Ir al home
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Register;
