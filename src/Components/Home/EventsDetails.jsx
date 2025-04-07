import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Modal,
  Box,
  TextField,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchEventsId } from "../Events/EventsServices"; // Ajusta la ruta según tu estructura

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const data = await fetchEventsId(id);
        setEvent(data);
      } catch {
        setError("Error cargando el evento");
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !event) {
    return (
      <Box mt={2}>
        <Alert severity="error">{error || "Evento no encontrado"}</Alert>
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        {event.title}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            src={event.imageEvent}
            alt={event.title}
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Ubicación:</Typography>
          <Typography>{event.location}</Typography>

          <Typography variant="h6" mt={2}>Fecha:</Typography>
          <Typography>{event.date}</Typography>

          <Typography variant="h6" mt={2}>Descripción:</Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>

          <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={() => setOpen(true)}>
            Reservar
          </Button>
        </Grid>
      </Grid>

      {/* Modal de Reserva */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          component={Paper}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            p: 4,
            width: 400,
            outline: "none",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Reservar Evento
          </Typography>
          <form>
            <TextField label="Nombre" fullWidth margin="normal" required />
            <TextField label="Correo electrónico" fullWidth margin="normal" type="email" required />
            <TextField label="Teléfono" fullWidth margin="normal" required />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Enviar Reserva
            </Button>
          </form>
        </Box>
      </Modal>
    </Container>
  );
};

export default EventDetails;
