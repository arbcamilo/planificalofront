import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit, Delete, FilterList } from "@mui/icons-material";
import { fetchEvents, deleteEvent } from "./EventsServices";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Events = (events) => {
  const [page, setPage] = useState(0);
  const { t } = useTranslation();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataEvents, setDataEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filter, setFilter] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState(null);
  const navigate = useNavigate();
  const handleEdit = (event) => {
    navigate(`/create-events/${event.id}`);
  };

  useEffect(() => {
    const getEvents = async () => {
      const events = await fetchEvents();
      setDataEvents(events);
      setFilteredEvents(events);
    };

    getEvents();
  }, []);

  useEffect(() => {
    setFilteredEvents(
      dataEvents.filter((prov) =>
        prov.title.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, dataEvents]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (id) => {
    const success = await deleteEvent(id);
    if (success) {
      setDataEvents(dataEvents.filter((prov) => prov.id !== id));
      setSnackbarMessage(t("text3"));
      setSnackbarOpen(true);
    }
    setDeleteDialogOpen(false);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDeleteDialogOpen = (id) => {
    setDeleteEventId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeleteEventId(null);
  };

  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {t("event")}
        </Typography>
        <TextField
          label={t("filter")}
          variant="outlined"
          value={filter}
          onChange={handleFilterChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <FilterList />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/create-events"
        >
          {t("create")} {t("event")}
        </Button>
      </div>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>{t("confirmDelete")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("text2")} {t("event")}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="secondary">
            {t("cancel")}
          </Button>
          <Button
            onClick={() => handleDelete(deleteEventId)}
            color="primary"
            variant="contained"
          >
            {t("delete")}
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <strong>{t("name")}</strong>
              </TableCell>
              <TableCell>
                <strong>{t("date")}</strong>
              </TableCell>
              <TableCell>
                <strong>{t("location")}</strong>
              </TableCell>
              <TableCell>
                <strong>{t("isPrivate")}</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEvents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div style={{ display: "flex", gap: "2px" }}>
                      <IconButton onClick={() => handleEdit(event)}>
                        <Edit color="primary" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteDialogOpen(event.id)}
                      >
                        <Delete color="error" />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.isPrivate ? "Sí" : "No"}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredEvents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Events;
