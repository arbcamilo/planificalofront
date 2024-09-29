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
  fetchProviders,
  createProvider,
  updateProvider,
  deleteProvider,
} from "./ProvidersServices";
import { useTranslation } from "react-i18next";

const Providers = () => {
  const [page, setPage] = useState(0);
  const { t } = useTranslation();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataProviders, setDataProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [newProvider, setNewProvider] = useState({
    name: "",
    country: "",
    department: "",
    city: "",
    address: "",
    email: "",
    contactPhone: "",
    isNaturalPerson: true,
    status: "Active",
    documentType: "CC",
    identityDocument: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteProviderId, setDeleteProviderId] = useState(null);

  useEffect(() => {
    const getProviders = async () => {
      const providers = await fetchProviders();
      setDataProviders(providers);
      setFilteredProviders(providers);
    };

    getProviders();
  }, []);

  useEffect(() => {
    setFilteredProviders(
      dataProviders.filter((prov) =>
        prov.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, dataProviders]);

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
    setSelectedProvider(null);
    setNewProvider({
      name: "",
      country: "",
      department: "",
      city: "",
      address: "",
      email: "",
      contactPhone: "",
      isNaturalPerson: true,
      status: "Active",
      documentType: "NIT",
      identityDocument: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProvider({ ...newProvider, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      const updatedProvider = await updateProvider(
        selectedProvider.id,
        newProvider
      );
      if (updatedProvider) {
        setDataProviders(
          dataProviders.map((prov) =>
            prov.id === selectedProvider.id ? updatedProvider : prov
          )
        );
        setSnackbarMessage(t("text4"));
        setSnackbarOpen(true);
        handleClose();
      }
    } else {
      const createdProvider = await createProvider(newProvider);
      if (createdProvider) {
        setDataProviders([...dataProviders, createdProvider]);
        setSnackbarMessage(t("text5"));
        setSnackbarOpen(true);
        handleClose();
      }
    }
  };

  const handleEdit = (provider) => {
    setSelectedProvider(provider);
    setNewProvider(provider);
    setEditMode(true);
    handleClickOpen();
  };

  const handleDelete = async (id) => {
    const success = await deleteProvider(id);
    if (success) {
      setDataProviders(dataProviders.filter((prov) => prov.id !== id));
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
    setDeleteProviderId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeleteProviderId(null);
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
          {t("provider")}
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
          {t("create")} {t("provider")}
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
              name="documentType"
              label={t("documentType")}
              type="text"
              fullWidth
              value={newProvider.documentType}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="identityDocument"
              label={t("number")}
              type="text"
              fullWidth
              value={newProvider.identityDocument}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label={t("name")}
              type="text"
              fullWidth
              value={newProvider.name}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="country"
              label={t("country")}
              type="text"
              fullWidth
              value={newProvider.country}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="department"
              label={t("department")}
              type="text"
              fullWidth
              value={newProvider.department}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="city"
              label={t("city")}
              type="text"
              fullWidth
              value={newProvider.city}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="address"
              label={t("address")}
              type="text"
              fullWidth
              value={newProvider.address}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="email"
              label={t("email")}
              type="email"
              fullWidth
              value={newProvider.email}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="contactPhone"
              label={t("telephone")}
              type="text"
              fullWidth
              value={newProvider.contactPhone}
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
            {t("text2")} {t("provider")}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="secondary">
            {t("cancel")}
          </Button>
          <Button
            onClick={() => handleDelete(deleteProviderId)}
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
                <strong>{t("documentType")}</strong>
              </TableCell>
              <TableCell>
                <strong>{t("number")}</strong>
              </TableCell>
              <TableCell>
                <strong>{t("city")}</strong>
              </TableCell>
              <TableCell>
                <strong>{t("email")}</strong>
              </TableCell>
              <TableCell>
                <strong>{t("telephone")}</strong>
              </TableCell>
              <TableCell>
                <strong>{t("status")}</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProviders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell>
                    <div style={{ display: "flex", gap: "2px" }}>
                      <IconButton onClick={() => handleEdit(provider)}>
                        <Edit color="primary" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteDialogOpen(provider.id)}
                      >
                        <Delete color="error" />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell>{provider.name}</TableCell>
                  <TableCell>{provider.documentType}</TableCell>
                  <TableCell>{provider.identityDocument}</TableCell>
                  <TableCell>{provider.city}</TableCell>
                  <TableCell>{provider.email}</TableCell>
                  <TableCell>{provider.contactPhone}</TableCell>
                  <TableCell>{provider.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredProviders.length}
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

export default Providers;
