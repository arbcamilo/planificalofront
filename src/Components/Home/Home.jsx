import React from "react";
import { Button, Typography, Container, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Inicio = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          {t("text6")}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {t("text7")}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/create-events"
            >
              {t("create")} {t("events")}
            </Button>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/events"
            >
              View events
            </Button>
          </Grid> */}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Inicio;
