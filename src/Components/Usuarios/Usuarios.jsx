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
  fetchUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "./UsuariosServices";
import { useTranslation } from "react-i18next";

const Usuarios = () => {
  const [page, setPage] = useState(0);
  const { t } = useTranslation();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataUsuarios, setDataUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [newUsuario, setNewUsuario] = useState({
    tipoDocumento: "CC",
    documentoIdentidad: "",
    nombre: "",
    email: "",
    telefono: "",
    estadoUsuario: "Activo",
    fechaNacimiento: "27/09/2024",
    fechaCreacionCuenta: "27/09/2024",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteUsuarioId, setDeleteUsuarioId] = useState(null);

  useEffect(() => {
    const getUsuarios = async () => {
      const usuarios = await fetchUsuarios();
      setDataUsuarios(usuarios);
      setFilteredUsuarios(usuarios);
    };

    getUsuarios();
  }, []);

  useEffect(() => {
    setFilteredUsuarios(
      dataUsuarios.filter((prov) =>
        prov.nombre.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, dataUsuarios]);

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
    setSelectedUsuario(null);
    setNewUsuario({
      tipoDocumento: "CC",
      documentoIdentidad: "",
      nombre: "",
      email: "",
      telefono: "",
      estadoUsuario: "Activo",
      fechaNacimiento: "27/09/2024",
      fechaCreacionCuenta: "27/09/2024",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUsuario({ ...newUsuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      const updatedUsuario = await updateUsuario(
        selectedUsuario.id,
        newUsuario
      );
      if (updatedUsuario) {
        setDataUsuarios(
          dataUsuarios.map((prov) =>
            prov.id === selectedUsuario.id ? updatedUsuario : prov
          )
        );
        setSnackbarMessage("Usuario actualizado exitosamente");
        setSnackbarOpen(true);
        handleClose();
      }
    } else {
      const createdUsuario = await createUsuario(newUsuario);
      if (createdUsuario) {
        setDataUsuarios([...dataUsuarios, createdUsuario]);
        setSnackbarMessage("Usuario creado exitosamente");
        setSnackbarOpen(true);
        handleClose();
      }
    }
  };

  const handleEdit = (usuario) => {
    setSelectedUsuario(usuario);
    setNewUsuario(usuario);
    setEditMode(true);
    handleClickOpen();
  };

  const handleDelete = async (id) => {
    const success = await deleteUsuario(id);
    if (success) {
      setDataUsuarios(dataUsuarios.filter((prov) => prov.id !== id));
      setSnackbarMessage("Usuario eliminado exitosamente");
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
    setDeleteUsuarioId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeleteUsuarioId(null);
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
          label="Filtrar por nombre"
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
          Crear Usuario
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editMode ? "Editar Usuario" : "Crear Nuevo Usuario"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, complete el siguiente formulario para{" "}
            {editMode ? "editar" : "crear"} un usuario.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              name="tipoDocumento"
              label="Tipo de Documento"
              type="text"
              fullWidth
              value={newUsuario.tipoDocumento}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="documentoIdentidad"
              label="Numero de Documento"
              type="text"
              fullWidth
              value={newUsuario.documentoIdentidad}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              autoFocus
              margin="dense"
              name="nombre"
              label="Nombre"
              type="text"
              fullWidth
              value={newUsuario.nombre}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={newUsuario.email}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="telefono"
              label="Teléfono de Contacto"
              type="text"
              fullWidth
              value={newUsuario.telefono}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="estadoUsuario"
              label="Estado usuario"
              type="text"
              fullWidth
              value={newUsuario.estadoUsuario}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="fechaNacimiento"
              label="Fecha nacimiento"
              type="date"
              fullWidth
              value={newUsuario.fechaNacimiento}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="fechaCreacionCuenta"
              label="Fecha creacion cuenta"
              type="date"
              fullWidth
              value={newUsuario.fechaCreacionCuenta}
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
            ¿Estás seguro de que deseas eliminar este usuario?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={() => handleDelete(deleteUsuarioId)}
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
            {filteredUsuarios
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>
                    <div style={{ display: "flex", gap: "2px" }}>
                      <IconButton onClick={() => handleEdit(usuario)}>
                        <Edit color="primary" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteDialogOpen(usuario.id)}
                      >
                        <Delete color="error" />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell>{usuario.nombre}</TableCell>
                  <TableCell>{usuario.tipoDocumento}</TableCell>
                  <TableCell>{usuario.documentoIdentidad}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.telefono}</TableCell>
                  <TableCell>{usuario.estadoUsuario}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredUsuarios.length}
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

export default Usuarios;
