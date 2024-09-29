import React from "react";
import { Button, Typography, Container, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <Container>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Bienvenido a Planifícalo
        </Typography>
        <Typography variant="body1" gutterBottom>
          Aquí puedes gestionar tus eventos de manera eficiente.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/create-events"
            >
              Crear Evento
            </Button>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/events"
            >
              Ver Eventos
            </Button>
          </Grid> */}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Inicio;
