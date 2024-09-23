// src/Components/Proveedores/Proveedores.jsx
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Button,
} from "@mui/material";
import axios from "../../axiosConfig";

const Proveedores = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataProveedores, setDataProveedores] = useState([]);

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await axios.get("/admin/Proveedores");
        if (response.data.success) {
          setDataProveedores(response.data.entity);
        } else {
          console.error("Error fetching proveedores:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching proveedores:", error);
      }
    };

    fetchProveedores();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Proveedores</h1>
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: 16 }}
        >
          Crear Proveedor
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Ciudad</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataProveedores
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((proveedor) => (
                <TableRow key={proveedor.id}>
                  <TableCell>{proveedor.nombre}</TableCell>
                  <TableCell>{proveedor.ciudad}</TableCell>
                  <TableCell>{proveedor.direccion}</TableCell>
                  <TableCell>{proveedor.email}</TableCell>
                  <TableCell>{proveedor.telefonoContacto}</TableCell>
                  <TableCell>{proveedor.estado}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginRight: 8 }}
                    >
                      Editar
                    </Button>
                    <Button variant="contained" color="error">
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={dataProveedores.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Proveedores;
