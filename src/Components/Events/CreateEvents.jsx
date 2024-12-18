import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper, Box, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { createEvent, getServices, getProducts, getProductsProvider, getServicesProvider } from './EventsServices'; // Import the necessary methods

const CreateEvents = () => {
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [service, setService] = useState({ type: '', provider: '', price: '', quantity: '' });
  const [product, setProduct] = useState({ type: '', provider: '', price: '', quantity: '' });
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    userId: 2, // Assuming userId is 2 for this example
    location: '',
    eventTypeId: 0,
    isPrivate: '',
    eventStatus: 'Creado',
    imageEvent: '',
    productEvent: [],
    serviceEvent: []
  });
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [filteredServiceProviders, setFilteredServiceProviders] = useState([]);
  const [filteredProductProviders, setFilteredProductProviders] = useState([]);
  const [isQuotation, setIsQuotation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const servicesData = await getServices();
      const productsData = await getProducts();
      setServiceTypes(servicesData);
      setProductTypes(productsData);
    };
    fetchData();
  }, []);

  const handleServiceTypeChange = async (e) => {
    const type = e.target.value;
    setService({ ...service, type });
    const serviceProviders = await getServicesProvider(type);
    setFilteredServiceProviders(serviceProviders);
  };

  const handleProductTypeChange = async (e) => {
    const type = e.target.value;
    setProduct({ ...product, type });
    const productProviders = await getProductsProvider(type);
    setFilteredProductProviders(productProviders);
  };

  const handleServiceProviderChange = (e) => {
    const providerId = e.target.value;
    const selectedProvider = filteredServiceProviders.find(p => p.providerId === providerId);
    setService({ ...service, provider: providerId, price: selectedProvider.price });
  };

  const handleProductProviderChange = (e) => {
    const providerId = e.target.value;
    const selectedProvider = filteredProductProviders.find(p => p.providerId === providerId);
    setProduct({ ...product, provider: providerId, price: selectedProvider.price });
  };

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

  const handleCreateEvent = async () => {
    const formattedEvent = {
      ...eventData,
      productEvent: products.map(p => ({
        providerId: p.provider,
        productId: p.type,
        price: p.price,
        amount: p.quantity,
        eventId: 0
      })),
      serviceEvent: services.map(s => ({
        providerId: s.provider,
        serviceId: s.type,
        price: s.price,
        quantity: s.quantity,
        eventId: 0,
        event: ''
      }))
    };

    try {
      await createEvent(formattedEvent);
      setIsReadOnly(true);
      setIsQuotation(true);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" p={2}>
      <Typography variant="h3" align="center" gutterBottom>{isQuotation ? 'Cotización' : 'Creación de evento'}</Typography>
      <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', width: '100%' }}>
        <Grid container spacing={2} direction="column">
          {isQuotation ? (
            <>
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
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre del evento"
                  variant="outlined"
                  value={eventData.title}
                  onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                  slotProps={{ input: { readOnly: isReadOnly } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Evento Privado?"
                  variant="outlined"
                  value={eventData.isPrivate}
                  onChange={(e) => setEventData({ ...eventData, isPrivate: e.target.value })}
                  slotProps={{ input: { readOnly: isReadOnly } }}
                >
                  <MenuItem value="si">Si</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  label="Fecha del evento"
                  slotProps={{ inputLabel: { shrink: true } }}
                  variant="outlined"
                  value={eventData.date}
                  onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                  InputProps={{ readOnly: isReadOnly }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Ubicación"
                  variant="outlined"
                  value={eventData.location}
                  onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                  InputProps={{ readOnly: isReadOnly }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label" disabled={isReadOnly}>
                  Cargar Fotografía
                  <input type="file" hidden onChange={(e) => setEventData({ ...eventData, imageEvent: e.target.files[0] })} />
                </Button>
              </Grid>
            </>
          )}
        </Grid>

        <Divider style={{ margin: '20px 0', opacity: 0.5 }} />

        {!isReadOnly && (
          <>
            <Typography variant="h5">Servicios para el evento</Typography>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  select
                  fullWidth
                  label="Tipo de servicio"
                  variant="outlined"
                  value={service.type}
                  onChange={handleServiceTypeChange}
                >
                  {serviceTypes.map((serviceType) => (
                    <MenuItem key={serviceType.id} value={serviceType.id}>{serviceType.serviceType}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={3}>
              <TextField
                select
                fullWidth
                label="Proveedor"
                variant="outlined"
                value={service.provider}
                onChange={handleServiceProviderChange}
              >
                {filteredServiceProviders.map((provider) => (
                  <MenuItem key={provider.providerId} value={provider.providerId}>
                    {provider.providerId}
                  </MenuItem>
                ))}
              </TextField>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Precio"
                  variant="outlined"
                  value={service.price}
                  slotProps={{ input: { readOnly: true } }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Cantidad"
                  variant="outlined"
                  value={service.quantity}
                  onChange={(e) => setService({ ...service, quantity: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'left' }}>
                <Button variant="contained" size="small" onClick={handleAddService}>Añadir Servicio</Button>
              </Grid>
            </Grid>
          </>
        )}

        {services.length > 0 && (
          <>
            {isQuotation && <Typography variant="h6" style={{ marginTop: '20px' }}>Servicios Solicitados</Typography>}
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
                      <TableCell>{serviceTypes.find(s => s.id === service.type)?.serviceType}</TableCell>
                      <TableCell>{service.provider}</TableCell>
                      <TableCell>{service.price}</TableCell>
                      <TableCell>{service.quantity}</TableCell>
                      <TableCell>
                        {!isReadOnly && (
                          <IconButton onClick={() => handleDeleteService(index)}>
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        <Divider style={{ margin: '20px 0', opacity: 0.5 }} />

        {!isReadOnly && (
          <>
            <Typography variant="h5">Productos para el evento</Typography>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  select
                  fullWidth
                  label="Tipo de producto"
                  variant="outlined"
                  value={product.type}
                  onChange={handleProductTypeChange}
                >
                  {productTypes.map((productType) => (
                    <MenuItem key={productType.id} value={productType.id}>{productType.productType}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={3}>
              <TextField
                select
                fullWidth
                label="Proveedor"
                variant="outlined"
                value={product.provider}
                onChange={handleProductProviderChange}
              >
                {filteredProductProviders.map((provider) => (
                  <MenuItem key={provider.providerId} value={provider.providerId}>
                    {provider.providerId}
                  </MenuItem>
                ))}
              </TextField>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Precio"
                  variant="outlined"
                  value={product.price}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Cantidad"
                  variant="outlined"
                  value={product.quantity}
                  onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'left' }}>
                <Button variant="contained" size="small" onClick={handleAddProduct}>Añadir Producto</Button>
              </Grid>
            </Grid>
          </>
        )}

        {products.length > 0 && (
          <>
            {isQuotation && <Typography variant="h6" style={{ marginTop: '20px' }}>Productos Solicitados</Typography>}
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
                      <TableCell>{productTypes.find(p => p.id === product.type)?.productType}</TableCell>
                      <TableCell>{product.provider}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>
                        {!isReadOnly && (
                          <IconButton onClick={() => handleDeleteProduct(index)}>
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        <Divider style={{ margin: '20px 0', opacity: 0.5 }} />

        <Grid container spacing={2} justifyContent="flex-end">
          {isQuotation ? (
            <>
              <Grid item>
                <Button variant="contained">Ir a Eventos</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary">Realizar Pago</Button>
              </Grid>
            </>
          ) : (
            <>
              <Grid item>
                <Button variant="contained">Regresar</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleCreateEvent} disabled={isReadOnly}>Crear Cotización</Button>
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default CreateEvents;
