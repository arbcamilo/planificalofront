import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createEvent, updateEvent } from "./EventsServices";
import { useParams } from "react-router-dom"; // Para obtener el parámetro 'id'
import { fetchEventsId } from "./EventsServices"; // Asume que tienes una función para obtener un evento por ID

const CreateEvents = () => {
  const { id } = useParams(); // Obtener el ID del evento de la URL
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    userId: 1,
    location: "",
    eventTypeId: 0,
    isPrivate: "",
    quotes: [],
  });
  const [editMode, setEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const getEvent = async () => {
        const event = await fetchEventsId(id); // Obtén los datos del evento desde el backend
        setEventData(event);
        setEditMode(true); // Cambiamos a modo de edición
      };
      getEvent();
    }
  }, [id]);

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
    navigate("/events-list");
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  return (
    <Container>
      <h1>Crear Evento</h1>
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
        <TextField
          margin="dense"
          name="isPrivate"
          label="Es Privado"
          type="text"
          fullWidth
          value={eventData.isPrivate}
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
