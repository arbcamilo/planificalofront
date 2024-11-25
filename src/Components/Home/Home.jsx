import React from "react";
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
} from "@mui/material";
import { useTranslation } from "react-i18next";
import Carousel from "react-material-ui-carousel";

const events = [
  {
    id: 1,
    title: "Event 1",
    description: "Description for event 1",
    image: "/Images/Evento1.png",
    date: "2023-10-01",
    time: "10:00 AM",
    location: "Location 1",
    cost: "$10",
  },
  {
    id: 2,
    title: "Event 2",
    description: "Description for event 2",
    image: "/Images/Evento2.png",
    date: "2023-10-02",
    time: "11:00 AM",
    location: "Location 2",
    cost: "$20",
  },
  {
    id: 3,
    title: "Event 3",
    description: "Description for event 3",
    image: "/Images/Evento3.png",
    date: "2023-10-03",
    time: "12:00 PM",
    location: "Location 3",
    cost: "$30",
  },
  {
    id: 4,
    title: "Event 4",
    description: "Description for event 4",
    image: "/Images/Evento4.png",
    date: "2023-10-04",
    time: "01:00 PM",
    location: "Location 4",
    cost: "$40",
  },
  {
    id: 5,
    title: "Event 5",
    description: "Description for event 5",
    image: "/Images/Evento5.png",
    date: "2023-10-05",
    time: "02:00 PM",
    location: "Location 5",
    cost: "$50",
  },
  {
    id: 6,
    title: "Event 6",
    description: "Description for event 6",
    image: "/Images/Evento2.png",
    date: "2023-10-06",
    time: "03:00 PM",
    location: "Location 6",
    cost: "$60",
  },
];

const Inicio = () => {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 4;
  const handleChange = (event, value) => {
    setPage(value);
  };

  const paginatedEvents = events.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Container>
      <Carousel>
        <img
          src="/Images/Cumple.jpg"
          alt="Banner 1"
          style={{ width: "100%", height: "400px", objectFit: "fill" }}
        />
        <img
          src="/Images/Evento_matrimonio.jpg"
          alt="Banner 2"
          style={{ width: "100%", height: "400px", objectFit: "fill" }}
        />
        <img
          src="/Images/Evento.jpg"
          alt="Banner 3"
          style={{ width: "100%", height: "400px", objectFit: "fill" }}
        />
      </Carousel>

      <Typography variant="h4" gutterBottom style={{ marginTop: "20px" }}>
        {t("publicEvents")}
      </Typography>
      <Grid container spacing={3}>
        {paginatedEvents.map((event) => (
          <Grid item xs={12} sm={6} md={3} key={event.id}>
            <Card style={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="275"
                image={event.image}
                alt={event.title}
                style={{ objectFit: "fill" }}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {t("eventType")}
                </Typography>
                <Typography variant="h5" component="div">
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t("createdBy")}: {event.description}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {t("eventLocation")}: {event.location}
                </Typography>
                <Typography variant="h6" color="text.primary">
                  {event.date}
                </Typography>
              </CardContent>
            </Card>
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

      {/* Clients Banner */}
      <Typography variant="h4" gutterBottom style={{ marginTop: "20px" }}>
        {t("ourClients")}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <img
            src="/Images/empresa1.webp"
            alt="Client 1"
            style={{ width: "100%", objectFit: "fill" }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <img
            src="/Images/empresa2.jpg"
            alt="Client 2"
            style={{ width: "100%", objectFit: "fill" }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <img
            src="/Images/empresa3.jpg"
            alt="Client 3"
            style={{ width: "100%", objectFit: "fill" }}
          />
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
