import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const CreateEvents = () => {
  const [eventType, setEventType] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [service, setService] = useState({
    provider: "",
    service: "",
    quantity: "",
  });
  const [product, setProduct] = useState({
    provider: "",
    product: "",
    quantity: "",
  });

  const handleAddService = () => {
    setServices([...services, service]);
    setService({ provider: "", service: "", quantity: "" });
    setServiceDialogOpen(false);
  };

  const handleAddProduct = () => {
    setProducts([...products, product]);
    setProduct({ provider: "", product: "", quantity: "" });
    setProductDialogOpen(false);
  };

  return (
    <Container>
      <h1>Crear Evento</h1>
      <FormControl fullWidth margin="normal">
        <InputLabel>Tipo de Evento</InputLabel>
        <Select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          <MenuItem value="conferencia">Conferencia</MenuItem>
          <MenuItem value="taller">Taller</MenuItem>
          <MenuItem value="seminario">Seminario</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        margin="normal"
        label="Título del Evento"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        type="date"
        label="Fecha"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Lugar"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <FormControl component="fieldset" margin="normal">
        <RadioGroup
          row
          value={privacy}
          onChange={(e) => setPrivacy(e.target.value)}
        >
          <FormControlLabel
            value="public"
            control={<Radio />}
            label="Público"
          />
          <FormControlLabel
            value="private"
            control={<Radio />}
            label="Privado"
          />
        </RadioGroup>
      </FormControl>
      <Button variant="contained" component="label">
        Subir Imagen
        <input type="file" hidden />
      </Button>
      <h2>Servicios</h2>
      <Button variant="contained" onClick={() => setServiceDialogOpen(true)}>
        Añadir Servicio
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Proveedor</TableCell>
            <TableCell>Servicio</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((s, index) => (
            <TableRow key={index}>
              <TableCell>{s.provider}</TableCell>
              <TableCell>{s.service}</TableCell>
              <TableCell>{s.quantity}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    const newServices = services.filter((_, i) => i !== index);
                    setServices(newServices);
                  }}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={serviceDialogOpen}
        onClose={() => setServiceDialogOpen(false)}
      >
        <DialogTitle>Añadir Servicio</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Proveedor"
            value={service.provider}
            onChange={(e) =>
              setService({ ...service, provider: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Servicio"
            value={service.service}
            onChange={(e) =>
              setService({ ...service, service: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Cantidad"
            value={service.quantity}
            onChange={(e) =>
              setService({ ...service, quantity: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setServiceDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleAddService}>Añadir</Button>
        </DialogActions>
      </Dialog>
      <h2>Productos</h2>
      <Button variant="contained" onClick={() => setProductDialogOpen(true)}>
        Añadir Producto
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Proveedor</TableCell>
            <TableCell>Producto</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((p, index) => (
            <TableRow key={index}>
              <TableCell>{p.provider}</TableCell>
              <TableCell>{p.product}</TableCell>
              <TableCell>{p.quantity}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    const newProducts = products.filter((_, i) => i !== index);
                    setProducts(newProducts);
                  }}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={productDialogOpen}
        onClose={() => setProductDialogOpen(false)}
      >
        <DialogTitle>Añadir Producto</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Proveedor"
            value={product.provider}
            onChange={(e) =>
              setProduct({ ...product, provider: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Producto"
            value={product.product}
            onChange={(e) =>
              setProduct({ ...product, product: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Cantidad"
            value={product.quantity}
            onChange={(e) =>
              setProduct({ ...product, quantity: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProductDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleAddProduct}>Añadir</Button>
        </DialogActions>
      </Dialog>
      <Button variant="contained" color="primary" style={{ marginTop: "20px" }}>
        Crear
      </Button>
    </Container>
  );
};

export default CreateEvents;
