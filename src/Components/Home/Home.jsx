import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Pagination,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import Carousel from "react-material-ui-carousel";
import axios from "../../axiosConfig";
import { Link } from "react-router-dom"; // nuevo import

// Función para obtener eventos desde la API
const fetchEvents = async () => {
  try {
    const response = await axios.get("/admin/Events/GetAll");
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error fetching events:", response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

const Inicio = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 4;

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const allEvents = await fetchEvents();
        const publicEvents = allEvents.filter(event => event.isPrivate === "no");
        setEvents(publicEvents);
      } catch (err) {
        setError("No se pudieron cargar los eventos.");
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const paginatedEvents = events.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Container>
      {/* Banner Carousel */}
      <Carousel>
        <img src="/Images/Cumple.jpg" alt="Banner 1" style={{ width: "100%", height: "400px", objectFit: "fill" }} />
        <img src="/Images/Evento_matrimonio.jpg" alt="Banner 2" style={{ width: "100%", height: "400px", objectFit: "fill" }} />
        <img src="/Images/Evento.jpg" alt="Banner 3" style={{ width: "100%", height: "400px", objectFit: "fill" }} />
      </Carousel>

      {/* Eventos Públicos */}
      <Typography variant="h4" gutterBottom style={{ marginTop: "20px" }}>
        {t("publicEvents")}
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Box mt={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {!loading && !error && (
        <>
          <Grid container spacing={3}>
            {paginatedEvents.map((event) => (
              <Grid item xs={12} sm={6} md={3} key={event.id}>
                <Link to={`/event/${event.id}`} style={{ textDecoration: 'none' }}>
                  <Card style={{ height: "100%" }}>
                    <CardMedia
                      component="img"
                      height="275"
                      image={event.imageEvent}
                      alt={event.title}
                      style={{ objectFit: "fill" }}
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t("eventLocation")}: {event.location}
                      </Typography>
                      <Typography variant="h6" color="text.primary">
                        {event.date}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center" marginTop="20px">
            <Pagination
              count={Math.ceil(events.length / itemsPerPage)}
              page={page}
              onChange={handleChange}
            />
          </Box>
        </>
      )}

      {/* Clientes */}
      <Typography variant="h4" gutterBottom style={{ marginTop: "20px" }}>
        {t("ourClients")}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <img src="/Images/empresa1.webp" alt="Client 1" style={{ width: "100%", objectFit: "fill" }} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <img src="/Images/empresa2.jpg" alt="Client 2" style={{ width: "100%", objectFit: "fill" }} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <img src="/Images/empresa3.jpg" alt="Client 3" style={{ width: "100%", objectFit: "fill" }} />
        </Grid>
      </Grid>

      {/* Footer */}
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="body1" align="center">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Inicio;
