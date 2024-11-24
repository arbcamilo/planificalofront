import React, { useState } from 'react';
import { TextField, Button, MenuItem, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper, Box, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CreateEvents = () => {
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [service, setService] = useState({ type: '', provider: '', price: '', quantity: '' });
  const [product, setProduct] = useState({ type: '', provider: '', price: '', quantity: '' });

  const handleAddService = () => {
    setServices([...services, service]);
    setService({ type: '', provider: '', price: '', quantity: '' });
  };

  const handleAddProduct = () => {
    setProducts([...products, product]);
    setProduct({ type: '', provider: '', price: '', quantity: '' });
  };

  const handleDeleteService = (index) => {
    const newServices = services.filter((_, i) => i !== index);
    setServices(newServices);
  };

  const handleDeleteProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" p={2}>
      <Typography variant="h3" align="center" gutterBottom>Creación de evento</Typography>
      <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Nombre del evento" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField select fullWidth label="Evento Privado?" variant="outlined">
              <MenuItem value="si">Si</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth type="date" label="Fecha del evento" InputLabelProps={{ shrink: true }} variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Ubicación" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component="label">
              Cargar Fotografía
              <input type="file" hidden />
            </Button>
          </Grid>
        </Grid>

        <Divider style={{ margin: '20px 0', opacity: 0.5 }} />

        <Typography variant="h5">Servicios para el evento</Typography>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField select fullWidth label="Tipo de servicio" variant="outlined" value={service.type} onChange={(e) => setService({ ...service, type: e.target.value })}>
              <MenuItem value="Catering">Catering</MenuItem>
              <MenuItem value="Audio">Audio</MenuItem>
              <MenuItem value="Iluminación">Iluminación</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField select fullWidth label="Proveedor" variant="outlined" value={service.provider} onChange={(e) => setService({ ...service, provider: e.target.value })}>
              <MenuItem value="Proveedor 1">Proveedor 1</MenuItem>
              <MenuItem value="Proveedor 2">Proveedor 2</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth label="Precio" variant="outlined" value={service.price} onChange={(e) => setService({ ...service, price: e.target.value })} />
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth label="Cantidad" variant="outlined" value={service.quantity} onChange={(e) => setService({ ...service, quantity: e.target.value })} />
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'right' }}>
            <Button variant="contained" size="small" onClick={handleAddService}>Añadir Servicio</Button>
          </Grid>
        </Grid>

        {services.length > 0 && (
          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Tipo de servicio</strong></TableCell>
                  <TableCell><strong>Proveedor</strong></TableCell>
                  <TableCell><strong>Precio</strong></TableCell>
                  <TableCell><strong>Cantidad</strong></TableCell>
                  <TableCell><strong>Acciones</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {services.map((service, index) => (
                  <TableRow key={index}>
                    <TableCell>{service.type}</TableCell>
                    <TableCell>{service.provider}</TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell>{service.quantity}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteService(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Divider style={{ margin: '20px 0', opacity: 0.5 }} />

        <Typography variant="h5">Productos para el evento</Typography>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField select fullWidth label="Tipo de producto" variant="outlined" value={product.type} onChange={(e) => setProduct({ ...product, type: e.target.value })}>
              <MenuItem value="Producto 1">Producto 1</MenuItem>
              <MenuItem value="Producto 2">Producto 2</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField select fullWidth label="Proveedor" variant="outlined" value={product.provider} onChange={(e) => setProduct({ ...product, provider: e.target.value })}>
              <MenuItem value="Proveedor 1">Proveedor 1</MenuItem>
              <MenuItem value="Proveedor 2">Proveedor 2</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth label="Precio" variant="outlined" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth label="Cantidad" variant="outlined" value={product.quantity} onChange={(e) => setProduct({ ...product, quantity: e.target.value })} />
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'right' }}>
            <Button variant="contained" size="small" onClick={handleAddProduct}>Añadir Producto</Button>
          </Grid>
        </Grid>

        {products.length > 0 && (
          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Tipo de producto</strong></TableCell>
                  <TableCell><strong>Proveedor</strong></TableCell>
                  <TableCell><strong>Precio</strong></TableCell>
                  <TableCell><strong>Cantidad</strong></TableCell>
                  <TableCell><strong>Acciones</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.type}</TableCell>
                    <TableCell>{product.provider}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteProduct(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Divider style={{ margin: '20px 0', opacity: 0.5 }} />

        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button variant="contained">Regresar</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">Crear Cotización</Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default CreateEvents;