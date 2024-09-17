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
  TextField,
  FormControl,
  Button,
} from "@mui/material";

const EventosPrivados = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    // Aquí deberías cargar los datos de tus eventos
    const fetchData = async () => {
      // Simulación de datos
      const data = [
        {
          id: 1,
          tipo: "Conferencia",
          nombre: "Evento 1",
          valor: 1000,
          fecha: "2023-10-01",
          estado: "Pendiente",
        },
        {
          id: 2,
          tipo: "Seminario",
          nombre: "Evento 2",
          valor: 2000,
          fecha: "2023-10-02",
          estado: "Aprobado",
        },
        // Agrega más eventos según sea necesario
      ];
      setEvents(data);
      setFilteredEvents(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredEvents(
      events.filter((event) =>
        event.nombre.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, events]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <h1>Eventos</h1>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Filtrar por nombre"
          variant="outlined"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </FormControl>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tipo de evento</TableCell>
              <TableCell>Nombre del evento</TableCell>
              <TableCell>Valor cotización</TableCell>
              <TableCell>Fecha solicitud</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEvents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.id}</TableCell>
                  <TableCell>{event.tipo}</TableCell>
                  <TableCell>{event.nombre}</TableCell>
                  <TableCell>{event.valor}</TableCell>
                  <TableCell>{event.fecha}</TableCell>
                  <TableCell>{event.estado}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">
                      Acción
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
        count={filteredEvents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default EventosPrivados;
