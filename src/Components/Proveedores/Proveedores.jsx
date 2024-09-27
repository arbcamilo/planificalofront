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
  fetchProveedores,
  createProveedor,
  updateProveedor,
  deleteProveedor,
} from "./ProveedoresServices";

const Proveedores = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataProveedores, setDataProveedores] = useState([]);
  const [filteredProveedores, setFilteredProveedores] = useState([]);
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [newProveedor, setNewProveedor] = useState({
    nombre: "",
    pais: "",
    departamento: "",
    ciudad: "",
    direccion: "",
    email: "",
    telefonoContacto: "",
    esPersonaNatural: true,
    estado: "Activo",
    calificacion: 0,
    tipoDocumento: "CC",
    documentoIdentidad: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteProveedorId, setDeleteProveedorId] = useState(null);

  useEffect(() => {
    const getProveedores = async () => {
      const proveedores = await fetchProveedores();
      setDataProveedores(proveedores);
      setFilteredProveedores(proveedores);
    };

    getProveedores();
  }, []);

  useEffect(() => {
    setFilteredProveedores(
      dataProveedores.filter((prov) =>
        prov.nombre.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, dataProveedores]);

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
    setSelectedProveedor(null);
    setNewProveedor({
      nombre: "",
      pais: "",
      departamento: "",
      ciudad: "",
      direccion: "",
      email: "",
      telefonoContacto: "",
      esPersonaNatural: true,
      estado: "Activo",
      calificacion: 0,
      tipoDocumento: "NIT",
      documentoIdentidad: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProveedor({ ...newProveedor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      const updatedProveedor = await updateProveedor(
        selectedProveedor.id,
        newProveedor
      );
      if (updatedProveedor) {
        setDataProveedores(
          dataProveedores.map((prov) =>
            prov.id === selectedProveedor.id ? updatedProveedor : prov
          )
        );
        setSnackbarMessage("Proveedor actualizado exitosamente");
        setSnackbarOpen(true);
        handleClose();
      }
    } else {
      const createdProveedor = await createProveedor(newProveedor);
      if (createdProveedor) {
        setDataProveedores([...dataProveedores, createdProveedor]);
        setSnackbarMessage("Proveedor creado exitosamente");
        setSnackbarOpen(true);
        handleClose();
      }
    }
  };

  const handleEdit = (proveedor) => {
    setSelectedProveedor(proveedor);
    setNewProveedor(proveedor);
    setEditMode(true);
    handleClickOpen();
  };

  const handleDelete = async (id) => {
    const success = await deleteProveedor(id);
    if (success) {
      setDataProveedores(dataProveedores.filter((prov) => prov.id !== id));
      setSnackbarMessage("Proveedor eliminado exitosamente");
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
    setDeleteProveedorId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeleteProveedorId(null);
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
          Proveedores
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
          Crear Proveedor
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editMode ? "Editar Proveedor" : "Crear Nuevo Proveedor"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, complete el siguiente formulario para{" "}
            {editMode ? "editar" : "crear"} un proveedor.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              name="tipoDocumento"
              label="Tipo de Documento"
              type="text"
              fullWidth
              value={newProveedor.tipoDocumento}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="documentoIdentidad"
              label="Numero de Documento"
              type="text"
              fullWidth
              value={newProveedor.documentoIdentidad}
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
              value={newProveedor.nombre}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="pais"
              label="País"
              type="text"
              fullWidth
              value={newProveedor.pais}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="departamento"
              label="Departamento"
              type="text"
              fullWidth
              value={newProveedor.departamento}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="ciudad"
              label="Ciudad"
              type="text"
              fullWidth
              value={newProveedor.ciudad}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="direccion"
              label="Dirección"
              type="text"
              fullWidth
              value={newProveedor.direccion}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={newProveedor.email}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="telefonoContacto"
              label="Teléfono de Contacto"
              type="text"
              fullWidth
              value={newProveedor.telefonoContacto}
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
            ¿Estás seguro de que deseas eliminar este proveedor?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={() => handleDelete(deleteProveedorId)}
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
                <strong>Ciudad</strong>
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
            {filteredProveedores
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((proveedor) => (
                <TableRow key={proveedor.id}>
                  <TableCell>
                    <div style={{ display: "flex", gap: "2px" }}>
                      <IconButton onClick={() => handleEdit(proveedor)}>
                        <Edit color="primary" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteDialogOpen(proveedor.id)}
                      >
                        <Delete color="error" />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell>{proveedor.nombre}</TableCell>
                  <TableCell>{proveedor.tipoDocumento}</TableCell>
                  <TableCell>{proveedor.documentoIdentidad}</TableCell>
                  <TableCell>{proveedor.ciudad}</TableCell>
                  <TableCell>{proveedor.email}</TableCell>
                  <TableCell>{proveedor.telefonoContacto}</TableCell>
                  <TableCell>{proveedor.estado}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredProveedores.length}
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

export default Proveedores;