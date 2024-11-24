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
  Snackbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    emailConfirmed: false,
    phoneNumber: "",
    phoneNumberConfirmed: true,
    firstName: "",
    lastName: "",
    documentType: "CC",
    documentNumber: "",
    userType: 2,
    userStatus: "Active",
    birthDate: "",
    accountCreationDate: "2024-10-19",
    password: "",
    confirmPassword: "",
    language: "es",
    photo: "",
  });

  const [open, setOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
      console.log(t("userCreatedSuccessfully"), response.data.entity);
      setOpen(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Bad Request:", error.response.data);
        setSnackbarMessage(t("text8"));
        setErrorDialogOpen(true);
      } else {
        console.error("Error creating user:", error);
        setSnackbarMessage(t("errorCreatingUser"));
      }
      setSnackbarOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleErrorDialogClose = () => {
    setErrorDialogOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Container component="main" maxWidth="sm">
        <Box textAlign="center" mt={5}>
          <Typography variant="h4" gutterBottom>
            {t("createAccount")}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {t("alreadyHaveAccount")} <Link to="/login">{t("signInHere")}</Link>
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {t("completeFields")}
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
                  label={t("userType")}
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
                  <option value={1}>{t("user")}</option>
                  <option value={2}>{t("provider")}</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  variant="outlined"
                  required
                  fullWidth
                  id="documentType"
                  label={t("documentType")}
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="NIT">{t("NIT")}</option>
                  <option value="CC">{t("CC")}</option>
                  <option value="CE">{t("CE")}</option>
                  <option value="PA">{t("PA")}</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="documentNumber"
                  label={t("documentNumber")}
                  name="documentNumber"
                  autoComplete="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label={t("userName")}
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
                  label={t("email")}
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
                  label={t("phoneNumber")}
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
                  label={t("firstName")}
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
                  label={t("lastName")}
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
                  label={t("birthDate")}
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
                  label={t("password")}
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
                  label={t("confirmPassword")}
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
                      ? t("passwordsMatch")
                      : t("passwordsDoNotMatch")}
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
                    {t("uploadProfilePicture")}
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
                  {t("createUser")}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t("userCreatedSuccessfully")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("confirmationEmailSent")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button component={Link} to="/login" color="primary">
            {t("signIn")}
          </Button>
          <Button component={Link} to="/" color="primary">
            {t("goToHome")}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={errorDialogOpen} onClose={handleErrorDialogClose}>
        <DialogTitle>{t("text9")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("text8")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button component={Link} to="/" color="primary">
            {t("close")}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <Button color="inherit" size="small" onClick={handleSnackbarClose}>
            {t("close")}
          </Button>
        }
      />
    </div>
  );
};

export default Register;
