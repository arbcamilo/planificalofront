import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { createEvent, updateEvent } from "./EventsServices";

const CreateEvents = () => {
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    userId: 0,
    location: "",
    eventTypeId: 0,
    isPrivate: true,
    quotes: [],
  });
  const [editMode, setEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.event) {
      setEventData(location.state.event);
      setEditMode(true);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      const updatedEvent = await updateEvent(eventData.id, eventData);
      if (updatedEvent) {
        setSnackbarMessage("Evento actualizado exitosamente");
        setSnackbarOpen(true);
      }
    } else {
      const createdEvent = await createEvent(eventData);
      if (createdEvent) {
        setSnackbarMessage("Evento creado exitosamente");
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleGoToEvents = () => {
    history.push("/events");
  };

  const handleGoToHome = () => {
    history.push("/");
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="dense"
          name="title"
          label="Nombre del Evento"
          type="text"
          fullWidth
          value={eventData.title}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="date"
          label="Fecha del Evento"
          type="date"
          fullWidth
          value={eventData.date}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          name="location"
          label="Ubicación del Evento"
          type="text"
          fullWidth
          value={eventData.location}
          onChange={handleInputChange}
        />
        <Button type="submit" color="primary" variant="contained">
          {editMode ? "Actualizar Evento" : "Crear Evento"}
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          action={
            <>
              <Button color="inherit" size="small" onClick={handleGoToEvents}>
                Ir a Mis Eventos
              </Button>
              <Button color="inherit" size="small" onClick={handleGoToHome}>
                Ir a Home
              </Button>
            </>
          }
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateEvents;
