// src/Components/Proveedores/Proveedores.jsx
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
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Edit, Delete, FilterList } from "@mui/icons-material";
import {
  fetchProveedores,
  createProveedor,
  updateProveedor,
  deleteProveedor,
} from "./ProveedoresServices";
import { useTranslation } from "react-i18next";

// El componente utiliza varios estados para manejar la paginación, los datos de los proveedores, el filtro de búsqueda, el estado del diálogo (abierto o cerrado),
// el modo de edición, el proveedor seleccionado y los datos del nuevo proveedor.

const Proveedores = () => {
  const [page, setPage] = useState(0);
  const { t } = useTranslation();
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

  //Este efecto se ejecuta una vez cuando el componente se monta y llama a la función fetchProveedores para obtener la lista de proveedores desde la API.
  // Luego, actualiza el estado dataProveedores con los datos obtenidos.

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

  // Estas funciones manejan los cambios de página y el número de filas por página en la tabla de proveedores.

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Estas funciones manejan la apertura y cierre del diálogo de creación/edición de proveedores, así como la creación y actualización de proveedores.

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

  // Esta función maneja los cambios en los campos del formulario de creación/edición de proveedores.

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProveedor({ ...newProveedor, [name]: value });
  };

  // Esta función maneja el envío del formulario para crear o actualizar un proveedor. Dependiendo del modo (editMode),
  // llama a updateProveedor o createProveedor y actualiza el estado dataProveedores en consecuencia.

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
        handleClose();
      }
    } else {
      const createdProveedor = await createProveedor(newProveedor);
      if (createdProveedor) {
        setDataProveedores([...dataProveedores, createdProveedor]);
        handleClose();
      }
    }
  };

  // Estas funciones manejan la edición y eliminación de proveedores. handleEdit abre el diálogo en modo de edición
  // y handleDelete elimina un proveedor llamando a la API y actualizando el estado dataProveedores.

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
    }
  };

  // Esta función maneja el cambio en el filtro de búsqueda.

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Finalmente, el componente renderiza una tabla con los datos de los proveedores, un botón para crear un nuevo proveedor y un diálogo para crear/editar proveedores.
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
                      <IconButton onClick={() => handleDelete(proveedor.id)}>
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
    </Container>
  );
};

export default Proveedores;
