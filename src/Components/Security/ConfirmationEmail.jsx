import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ConfirmationEmail = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ userId: "", token: "" });
  const [open, setOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  useEffect(() => {
    const userId = query.get("userId");
    const token = query.get("token");
    if (userId && token) {
      setFormData({ userId, token });
    }
  }, [query]);

  const handleConfirmEmail = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7003/api/admin/Users/ConfirmEmail",
        {
          params: {
            userId: formData.userId,
            token: formData.token,
          },
        }
      );
      if (response.status === 200) {
        setConfirmationMessage("El email fue confirmado de manera exitosa.");
        setOpen(true);
      }
    } catch (error) {
      console.error("Error confirming email:", error);
      setConfirmationMessage("Hubo un error confirmando el email.");
      setOpen(true);
    }
  };

  const handleGoToLogin = () => {
    setOpen(false);
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <form noValidate autoComplete="off">
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirmEmail}
          fullWidth
        >
          Confirmar Email
        </Button>
      </form>
      <Dialog open={open} onClose={handleGoToLogin}>
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmationMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGoToLogin} color="primary" variant="contained">
            Ir al Login
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ConfirmationEmail;
