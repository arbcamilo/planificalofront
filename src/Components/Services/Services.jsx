import React, { useState, useEffect, useContext } from "react";
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Edit, Delete, FilterList } from "@mui/icons-material";
import {
  createService,
  updateService,
  deleteService,
  getServices,
  getServiceProvider,
} from "./ServicesServices";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../Security/context/AuthContext";

const Services = () => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataServices, setDataServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [newService, setNewService] = useState({
    providerId: 0,
    serviceId: "",
    price: 0,
    quantity: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteServiceId, setDeleteServiceId] = useState(null);
  const [serviceOptions, setServiceOptions] = useState([]);

  useEffect(() => {
    const getServicesData = async () => {
      try {
        const services = await getServiceProvider(user.documentNumber);
        setDataServices(services || []);
        setFilteredServices(services || []);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setDataServices([]);
          setFilteredServices([]);
        } else {
          console.error("Error fetching services:", error);
        }
      }
    };
  
    if (user && user.documentNumber) {
      getServicesData();
    }
  }, [user, user?.documentNumber]);

  useEffect(() => {
    if (Array.isArray(dataServices)) {
      setFilteredServices(
        dataServices.filter((service) =>
          String(service.serviceId).toLowerCase().includes(filter.toLowerCase())
        )
      );
    } else {
      setFilteredServices([]);
    }
  }, [filter, dataServices]);

  useEffect(() => {
    const fetchServiceOptions = async () => {
      const services = await getServices();
      setServiceOptions(services);
    };

    fetchServiceOptions();
  }, []);

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
      providerId: 0,
      serviceId: "",
      price: 0,
      quantity: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceData = {
      ...newService,
      providerId: user.documentNumber,
    };

    if (editMode) {
      const updatedService = await updateService(selectedService.id, serviceData);
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
      const createdService = await createService(serviceData);
      if (createdService) {
        // Si el id retornado es 0 (o falsy), asignamos un id único
        const newServiceWithId = {
          ...createdService,
          id: createdService.id || Date.now(),
        };
        setDataServices([...dataServices, newServiceWithId]);
        setSnackbarMessage(t("text5"));
        setSnackbarOpen(true);
        handleClose();
      }
    }
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setNewService(service);
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
            <FormControl fullWidth margin="dense">
              <InputLabel>{t("serviceType")}</InputLabel>
              <Select
                name="serviceId"
                value={newService.serviceId}
                onChange={handleInputChange}
                label={t("serviceType")}
              >
                {serviceOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.serviceType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="price"
              label={t("price")}
              type="number"
              fullWidth
              value={newService.price}
              onChange={handleInputChange}
              slotProps={{
                inputLabel: { style: { fontWeight: "bold" } },
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              name="quantity"
              label={t("quantity")}
              type="number"
              fullWidth
              value={newService.quantity}
              onChange={handleInputChange}
              slotProps={{
                inputLabel: { style: { fontWeight: "bold" } },
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <Button onClick={handleClose} color="secondary" variant="outlined">
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
            {t("text2")} {t("user")}?
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
                <strong>{t("quantity")}</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredServices
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div style={{ display: "flex", gap: "2px" }}>
                      <IconButton onClick={() => handleEdit(service)}>
                        <Edit color="primary" />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteDialogOpen(service.id)}>
                        <Delete color="error" />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell>{service.serviceId}</TableCell>
                  <TableCell>{service.price}</TableCell>
                  <TableCell>{service.quantity}</TableCell>
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
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Services;
