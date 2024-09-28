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
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./UsersServices";
import { useTranslation } from "react-i18next";

const Users = () => {
  const [page, setPage] = useState(0);
  const { t } = useTranslation();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataUsers, setDataUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    documentType: "CC",
    identityDocument: "",
    name: "",
    email: "",
    phone: "",
    userStatus: "Activo",
    birthDate: "27/09/2024",
    accountCreationDate: "27/09/2024",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const users = await fetchUsers();
      setDataUsers(users);
      setFilteredUsers(users);
    };

    getUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      dataUsers.filter((prov) =>
        prov.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, dataUsers]);

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
    setSelectedUser(null);
    setNewUser({
      documentType: "CC",
      identityDocument: "",
      name: "",
      email: "",
      phone: "",
      userStatus: "Activo",
      birthDate: "27/09/2024",
      accountCreationDate: "27/09/2024",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      const updatedUser = await updateUser(selectedUser.id, newUser);
      if (updatedUser) {
        setDataUsers(
          dataUsers.map((prov) =>
            prov.id === selectedUser.id ? updatedUser : prov
          )
        );
        setSnackbarMessage("User actualizado exitosamente");
        setSnackbarOpen(true);
        handleClose();
      }
    } else {
      const createdUser = await createUser(newUser);
      if (createdUser) {
        setDataUsers([...dataUsers, createdUser]);
        setSnackbarMessage("User creado exitosamente");
        setSnackbarOpen(true);
        handleClose();
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setNewUser(user);
    setEditMode(true);
    handleClickOpen();
  };

  const handleDelete = async (id) => {
    const success = await deleteUser(id);
    if (success) {
      setDataUsers(dataUsers.filter((prov) => prov.id !== id));
      setSnackbarMessage("User eliminado exitosamente");
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
    setDeleteUserId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeleteUserId(null);
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
          {t("users")}
        </Typography>
        <TextField
          label="Filtrar por name"
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
          Crear User
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editMode ? "Editar User" : "Crear Nuevo User"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, complete el siguiente formulario para{" "}
            {editMode ? "editar" : "crear"} un user.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              name="documentType"
              label="Tipo de Documento"
              type="text"
              fullWidth
              value={newUser.documentType}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="identityDocument"
              label="Numero de Documento"
              type="text"
              fullWidth
              value={newUser.identityDocument}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Nombre"
              type="text"
              fullWidth
              value={newUser.name}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={newUser.email}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="phone"
              label="Teléfono de Contacto"
              type="text"
              fullWidth
              value={newUser.phone}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="userStatus"
              label="Estado user"
              type="text"
              fullWidth
              value={newUser.userStatus}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="birthDate"
              label="Fecha nacimiento"
              type="date"
              fullWidth
              value={newUser.birthDate}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="accountCreationDate"
              label="Fecha creacion cuenta"
              type="date"
              fullWidth
              value={newUser.accountCreationDate}
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
                Cancelar
              </Button>
              <Button type="submit" color="primary" variant="contained">
                {editMode ? "Actualizar" : "Crear"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={() => handleDelete(deleteUserId)}
            color="primary"
            variant="contained"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <strong>Nombre</strong>
              </TableCell>
              <TableCell>
                <strong>TD</strong>
              </TableCell>
              <TableCell>
                <strong>Numero</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Teléfono</strong>
              </TableCell>
              <TableCell>
                <strong>Estado</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div style={{ display: "flex", gap: "2px" }}>
                      <IconButton onClick={() => handleEdit(user)}>
                        <Edit color="primary" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteDialogOpen(user.id)}
                      >
                        <Delete color="error" />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.documentType}</TableCell>
                  <TableCell>{user.identityDocument}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.userStatus}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredUsers.length}
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

export default Users;
