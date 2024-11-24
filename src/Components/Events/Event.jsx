import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from "@mui/material";
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
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Corregido aquí
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
      <h1>{t(editMode ? "editEvent" : "createEvent")}</h1>
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
          select
          fullWidth
          value={eventData.isPrivate}
          onChange={handleInputChange}
          SelectProps={{
            native: true,
          }}
        >
          <option value=""></option>
          <option value="true">{t("yes")}</option>
          <option value="false">{t("no")}</option>
        </TextField>
        <Button type="submit" color="primary" variant="contained">
          {t(editMode ? "edit" : "create")}
        </Button>
      </form>
      <Dialog open={snackbarOpen} onClose={handleSnackbarClose}>
        <DialogTitle>{t("Notification")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{snackbarMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleGoToEvents}
            color="primary"
            variant="contained"
          >
            {t("goto")} {t("events")}
          </Button>
          <Button onClick={handleGoToHome} color="primary" variant="contained">
            {t("goto")} {t("home")}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CreateEvents;
