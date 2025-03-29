// updateEventForm.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Typography, Grid, Paper, Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateEvent, getServices, getProducts, getProductsProvider, getServicesProvider } from './EventsServices';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventById } from './EventsServices';

const EditEventForm = () => {
    const { id } = useParams();
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
    const [services, setServices] = useState([]);
    const [products, setProducts] = useState([]);
    const [service, setService] = useState({ type: '', typeName: '', provider: '', providerName: '', price: '', quantity: '' });
    const [product, setProduct] = useState({ type: '', typeName: '', provider: '', providerName: '', price: '', quantity: '' });
    const [serviceTypes, setServiceTypes] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [filteredServiceProviders, setFilteredServiceProviders] = useState([]);
    const [filteredProductProviders, setFilteredProductProviders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
        try {
            const event = await getEventById(id);
            if (event && typeof event === 'object') {
            setEventData(event);
            setServices((event.serviceEvent || []).map(service => {
                const serviceType = serviceTypes.find(type => type.id === service.serviceId);
                return ({ type: service.serviceId, typeName: serviceType.serviceType, provider: service.providerId, providerName: service.providerId, price: service.price, quantity: service.quantity });
            }));
            setProducts((event.productEvent || []).map(product => {
                const productType = productTypes.find(type => type.id === product.productId);
                return ({ type: product.productId, typeName: productType.productType, provider: product.providerId, providerName: product.providerId, price: product.price, quantity: product.amount });
            }));
            } else {
            setEventData({
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
            }
        } catch (error) {
            console.error('Error fetching event data:', error);
            setEventData({
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
        }
        };
        if(serviceTypes&& productTypes){
            fetchEvent();
        }
    }, [id, serviceTypes, productTypes]);

    useEffect(() => {
        const fetchData = async () => {
            const servicesData = await getServices();
            const productsData = await getProducts();
            setServiceTypes(servicesData);
            setProductTypes(productsData);
        };

        const fetchUserId = async () => {
            try {
                const token = localStorage.getItem("token");
                const decodedToken = parseJwt(token);
                const userId = decodedToken["id"];
                setEventData(prevData => ({ ...prevData, userId }));
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };

        fetchData();
        fetchUserId();
    }, []);
    const [totalSummary, setTotalSummary] = useState({productTotal: 0, serviceTotal: 0, total: 0});
    useEffect(() => {
            const productTotal = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
            const serviceTotal = services.reduce((acc, service) => acc + (service.price * service.quantity), 0);
            const total = productTotal + serviceTotal;
            setTotalSummary({productTotal, serviceTotal, total});
    },[services, products]);
    const formatToCOP = (value) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value).slice(0, -3);
    };

    const parseJwt = (token) => {
        try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map(function (c) {
                        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join("")
            );
            return JSON.parse(jsonPayload);
        } catch (e) {
            return null;
        }
    };

    const handleServiceTypeChange = async (e) => {
        const type = e.target.value;
        const typeName = serviceTypes.find(serviceType => serviceType.id === type).serviceType;
        setService({ ...service, type, typeName });
        const serviceProviders = await getServicesProvider(type);
        setFilteredServiceProviders(serviceProviders);
    };

    const handleProductTypeChange = async (e) => {
        const type = e.target.value;
        const typeName = productTypes.find(productType => productType.id === type).productType;
        setProduct({ ...product, type, typeName });
        const productProviders = await getProductsProvider(type);
        setFilteredProductProviders(productProviders);
    };

    const handleServiceProviderChange = (e) => {
        const providerId = e.target.value;
        const selectedProvider = filteredServiceProviders.find(p => p.providerId === providerId);
        setService({ ...service, provider: providerId, providerName: `${providerId}`, price: selectedProvider.price });
    };

    const handleProductProviderChange = (e) => {
        const providerId = e.target.value;
        const selectedProvider = filteredProductProviders.find(p => p.providerId === providerId);
        setProduct({ ...product, provider: providerId, providerName: `${providerId}`, price: selectedProvider.price });
    };

    const handleAddService = () => {
        setServices([...services, service]);
        setService({ type: '', typeName: '', provider: '', providerName: '', price: '', quantity: '' });
    };

    const handleAddProduct = () => {
        setProducts([...products, product]);
        setProduct({ type: '', typeName: '', provider: '', providerName: '', price: '', quantity: '' });
    };

    const handleDeleteService = (index) => {
        const newServices = [...services];
        newServices.splice(index, 1);
        setServices(newServices);
    };

    const handleDeleteProduct = (index) => {
        const newProducts = [...products];
        newProducts.splice(index, 1);
        setProducts(newProducts);
    };

    const handleEditEvent = async () => {
        const formattedEvent = {
            ...eventData,
            productEvent: products.map(p => ({
                providerId: p.provider,
                productId: p.type,
                price: p.price,
                amount: p.quantity,
                eventId: parseInt(id)
            })),
            serviceEvent: services.map(s => ({
                providerId: s.provider,
                serviceId: s.type,
                price: s.price,
                quantity: s.quantity,
                eventId: parseInt(id),
                event: parseInt(id)
            }))
        };

        try {
            const editedEvent = await updateEvent(id, formattedEvent);
            navigate(`/create-events/${editedEvent.id}`);
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" p={2}>
            <Typography variant="h3" align="center" gutterBottom>Creación de evento</Typography>
            <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', width: '100%' }}>
                <Grid container spacing={2} direction="column">
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Nombre del evento"
                            variant="outlined"
                            value={eventData.title}
                            onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
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
                            variant="outlined"
                            value={eventData.date}
                            onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Ubicación"
                            variant="outlined"
                            value={eventData.location}
                            onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" component="label">
                            Cargar Fotografía
                            <input type="file" hidden onChange={(e) => {
                                const file = e.target.files[0];
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setEventData({ ...eventData, imageEvent: reader.result });
                                };
                                if (file) {
                                    reader.readAsDataURL(file);
                                }
                            }} />
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                    {eventData.imageEvent && (
                            <img src={eventData.imageEvent} alt="Event" style={{ maxWidth: '100%', height: 'auto', maxHeight: '250px' }} />
                    )}
                    </Grid>
                    
                </Grid>

                <Divider style={{ margin: '20px 0', opacity: 0.5 }} />

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
                            {filteredServiceProviders.filter((provider)=>provider.serviceId ===(service||{}).type).map((provider) => (
                                <MenuItem key={provider.providerId} value={provider.providerId}>
                                    {provider.providerName || "Nombre Proverdor no disponible"}
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
                            InputProps={{ readOnly: true }}
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

                {services.length > 0 && (
                    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Tipo de Servicio</strong></TableCell>
                                    <TableCell><strong>Proveedor</strong></TableCell>
                                    <TableCell><strong>Precio</strong></TableCell>
                                    <TableCell><strong>Cantidad</strong></TableCell>
                                    <TableCell><strong>Total</strong></TableCell>
                                    <TableCell><strong>Acciones</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {services.map((service, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{service.typeName}</TableCell>
                                        <TableCell>{service.providerName}</TableCell>
                                        <TableCell>{formatToCOP(service.price)}</TableCell>
                                        <TableCell>{(service.quantity)}</TableCell>
                                        <TableCell>{formatToCOP(service.quantity * service.price)}</TableCell>
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
                <div style={{  textAlign: "right", width: "100%",fontWeight: "bold"}}> <Typography  variant="h12">Valor total por servicios: {formatToCOP(totalSummary.serviceTotal)}</Typography></div>
                <Divider style={{ margin: '20px 0', opacity: 0.5 }} />

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
                            {filteredProductProviders.filter((provider)=>(product || {}).type === provider.productId).map((provider) => (
                                <MenuItem key={provider.providerId} value={provider.providerId}>
                                    {provider.providerName || "Nombre Proverdor no disponible"}
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

                {products.length > 0 && (
                    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Tipo de Producto</strong></TableCell>
                                    <TableCell><strong>Proveedor</strong></TableCell>
                                    <TableCell><strong>Precio</strong></TableCell>
                                    <TableCell><strong>Cantidad</strong></TableCell>
                                    <TableCell><strong>Total</strong></TableCell>
                                    <TableCell><strong>Acciones</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((product, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{product.typeName}</TableCell>
                                        <TableCell>{product.providerName}</TableCell>
                                        <TableCell>{formatToCOP(product.price)}</TableCell>
                                        <TableCell>{product.quantity}</TableCell>
                                        <TableCell>{formatToCOP(product.quantity * product.price)}</TableCell>
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
                <div style={{  textAlign: "right", width: "100%",fontWeight: "bold"}}> <Typography  variant="h12">Valor total por productos: {formatToCOP(totalSummary.productTotal)}</Typography></div>
                <Divider style={{ margin: '20px 0', opacity: 0.5 }} />
                <div style={{  textAlign: "right", width: "100%",fontWeight: "bold"}}> <Typography  variant="h12">Valor total Cotización: {formatToCOP(totalSummary.total)}</Typography></div>
                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item>
                        <Button variant="contained">Regresar</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={handleEditEvent}>Editar Cotización</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default EditEventForm;