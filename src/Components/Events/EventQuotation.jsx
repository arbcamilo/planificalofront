import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Grid, Paper, Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { getEventById } from './EventsServices';

const EventQuotation = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await getEventById(id);
        if (event && typeof event === 'object') {
          setEventData(event);
        } else {
          setEventData(null);
        }
      } catch (error) {
        console.error('Error fetching event data:', error);
        setEventData(null);
      }
    };
    fetchEvent();
  }, [id]);

  if (!eventData) {
    return <Typography>Loading...</Typography>;
  }

  const serviceEvent = eventData?.serviceEvent || [];
  const productEvent = eventData?.productEvent || [];

  return (
    <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" p={2}>
      <Typography variant="h3" align="center" gutterBottom>Cotización</Typography>
      <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', width: '100%' }}>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Nombre del evento:</strong> {eventData.title}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Evento Privado:</strong> {eventData.isPrivate}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Fecha del evento:</strong> {eventData.date}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Ubicación:</strong> {eventData.location}</Typography>
          </Grid>
          <Grid item xs={12}>
            {eventData.imageEvent && (
              <img src={URL.createObjectURL(eventData.imageEvent)} alt="Event" style={{ maxWidth: '100%', height: 'auto' }} />
            )}
          </Grid>
        </Grid>

        <Divider style={{ margin: '20px 0', opacity: 0.5 }} />

        <Typography variant="h6" style={{ marginTop: '20px' }}>Servicios Solicitados</Typography>
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Tipo de servicio</strong></TableCell>
                <TableCell><strong>Proveedor</strong></TableCell>
                <TableCell><strong>Precio</strong></TableCell>
                <TableCell><strong>Cantidad</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(serviceEvent || []).map((service, index) => (
                <TableRow key={index}>
                  <TableCell>{service.serviceType}</TableCell>
                  <TableCell>{service.provider}</TableCell>
                  <TableCell>{service.price}</TableCell>
                  <TableCell>{service.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider style={{ margin: '20px 0', opacity: 0.5 }} />

        <Typography variant="h6" style={{ marginTop: '20px' }}>Productos Solicitados</Typography>
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Tipo de producto</strong></TableCell>
                <TableCell><strong>Proveedor</strong></TableCell>
                <TableCell><strong>Precio</strong></TableCell>
                <TableCell><strong>Cantidad</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(productEvent || []).map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.productType}</TableCell>
                  <TableCell>{product.provider}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider style={{ margin: '20px 0', opacity: 0.5 }} />

        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button variant="contained" to="/events-list">Ir a Eventos</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">Realizar Pago</Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default EventQuotation;
