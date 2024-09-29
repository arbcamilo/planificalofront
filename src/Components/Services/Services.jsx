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
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
} from "./ServicesServices";
import { useTranslation } from "react-i18next";

const Services = () => {
  const [page, setPage] = useState(0);
  const { t } = useTranslation();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataServices, setDataServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [newService, setNewService] = useState({
    serviceType: "",
    price: 0,
    quantity: "",
    description: "",
    serviceProviders: [],
    serviceQuotes: [],
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteServiceId, setDeleteServiceId] = useState(null);

  useEffect(() => {
    const getServices = async () => {
      const services = await fetchServices();
      setDataServices(services);
      setFilteredServices(services);
    };

    getServices();
  }, []);

  useEffect(() => {
    setFilteredServices(
      dataServices.filter((prov) =>
        prov.serviceType.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, dataServices]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setSelectedService(null);
    setNewService({
      serviceType: "",
      price: 0,
      quantity: "",
      description: "",
      serviceProviders: [],
      serviceQuotes: [],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      const updatedService = await updateService(
        selectedService.id,
        newService
      );
      if (updatedService) {
        setDataServices(
          dataServices.map((prov) =>
            prov.id === selectedService.id ? updatedService : prov
          )
        );
        setSnackbarMessage(t("text4"));
        setSnackbarOpen(true);
        handleClose();
      }
    } else {
      const createdService = await createService(newService);
      if (createdService) {
        setDataServices([...dataServices, createdService]);
        setSnackbarMessage(t("text5"));
        setSnackbarOpen(true);
        handleClose();
      }
    }
  };

  const handleEdit = (servicio) => {
    setSelectedService(servicio);
    setNewService(servicio);
    setEditMode(true);
    handleClickOpen();
  };

  const handleDelete = async (id) => {
    const success = await deleteService(id);
    if (success) {
      setDataServices(dataServices.filter((prov) => prov.id !== id));
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
    setDeleteServiceId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeleteServiceId(null);
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
          {t("services")}
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
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          {t("create")} {t("service")}
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? t("edit") : t("createNew")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("text1")} {t(editMode ? "edit" : "create")}
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              name="serviceType"
              label={t("serviceType")}
              type="text"
              fullWidth
              value={newService.serviceType}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="price"
              label={t("price")}
              type="number"
              fullWidth
              value={newService.price}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              autoFocus
              margin="dense"
              name="quantity"
              label={t("quantity")}
              type="text"
              fullWidth
              value={newService.quantity}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="description"
              label={t("description")}
              type="text"
              fullWidth
              value={newService.description}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <Button
                onClick={handleClose}
                color="secondary"
                variant="outlined"
              >
                {t("cancel")}
              </Button>
              <Button type="submit" color="primary" variant="contained">
                {t(editMode ? "edit" : "create")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>{t("confirmDelete")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("text2")} {t("service")}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="secondary">
            {t("cancel")}
          </Button>
          <Button
            onClick={() => handleDelete(deleteServiceId)}
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
                <strong>{t("serviceType")}</strong>
              </TableCell>
              <TableCell>
                <strong>{t("price")}</strong>
              </TableCell>
              <TableCell>
                <strong>{t("amount")}</strong>
              </TableCell>
              <TableCell>
                <strong>{t("description")}</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredServices
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((servicio) => (
                <TableRow key={servicio.id}>
                  <TableCell>
                    <div style={{ display: "flex", gap: "2px" }}>
                      <IconButton onClick={() => handleEdit(servicio)}>
                        <Edit color="primary" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteDialogOpen(servicio.id)}
                      >
                        <Delete color="error" />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell>{servicio.serviceType}</TableCell>
                  <TableCell>{servicio.price}</TableCell>
                  <TableCell>{servicio.quantity}</TableCell>
                  <TableCell>{servicio.description}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredServices.length}
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

export default Services;
