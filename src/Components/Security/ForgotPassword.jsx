import React, { useState } from "react";
import {
  Container,
  Button,
  TextField,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from "@mui/material";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.get(
        `https://localhost:7003/api/admin/Users/RecoveryPassword`,
        {
          params: {
            email: email,
            lenguage: "en", // Enviar siempre "en" como idioma
          },
        }
      );
      setSnackbarMessage("Reset link sent successfully");
      setDialogOpen(true); // Abrir el diálogo
    } catch (error) {
      setSnackbarMessage("Error sending reset link");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Send Reset Link
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <Button color="inherit" size="small" onClick={handleSnackbarClose}>
            Close
          </Button>
        }
      />
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Check Your Email"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The reset link has been sent successfully. Please close this tab and
            check your email inbox.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ForgotPassword;
