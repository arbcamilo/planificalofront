import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createEvent, updateEvent } from "./EventsServices";
import { useParams } from "react-router-dom";
import { fetchEventsId } from "./EventsServices";
import { useTranslation } from "react-i18next";

const CreateEvents = () => {
  const { id } = useParams();
  const { t } = useTranslation();
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
        const event = await fetchEventsId(id);
        setEventData(event);
        setEditMode(true);
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
        setSnackbarMessage(t("text4"));
        setSnackbarOpen(true);
      }
    } else {
      const createdEvent = await createEvent(eventData);
      if (createdEvent) {
        setSnackbarMessage(t("text5"));
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
      <h1>
        {t("create")} {t("event")}
      </h1>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="dense"
          name="title"
          label={t("name")}
          type="text"
          fullWidth
          value={eventData.title}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="date"
          label={`${t("date")} ${t("event")}`}
          type="date"
          fullWidth
          value={eventData.date}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          name="location"
          label={`${t("location")} ${t("event")}`}
          type="text"
          fullWidth
          value={eventData.location}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="isPrivate"
          label={t("isPrivate")}
          type="text"
          fullWidth
          value={eventData.isPrivate}
          onChange={handleInputChange}
        />
        <Button type="submit" color="primary" variant="contained">
          {t(editMode ? "edit" : "create")}
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
                {t("goto")} {t("events")}
              </Button>
              <Button color="inherit" size="small" onClick={handleGoToHome}>
                {t("goto")} {t("home")}
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
