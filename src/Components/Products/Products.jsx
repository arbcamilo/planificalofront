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
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./ProductsServices";
import { useTranslation } from "react-i18next";

const Products = () => {
  const [page, setPage] = useState(0);
  const { t } = useTranslation();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataProducts, setDataProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    productType: "",
    price: 0,
    amount: "",
    description: "",
    productProvider: [],
    productQuote: [],
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setDataProducts(products);
      setFilteredProducts(products);
    };

    getProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      dataProducts.filter((prov) =>
        prov.productType.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, dataProducts]);

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
    setSelectedProduct(null);
    setNewProduct({
      productType: "",
      price: 0,
      amount: "",
      description: "",
      productProvider: [],
      productQuote: [],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      const updatedProduct = await updateProduct(
        selectedProduct.id,
        newProduct
      );
      if (updatedProduct) {
        setDataProducts(
          dataProducts.map((prov) =>
            prov.id === selectedProduct.id ? updatedProduct : prov
          )
        );
        setSnackbarMessage("Product actualizado exitosamente");
        setSnackbarOpen(true);
        handleClose();
      }
    } else {
      const createdProduct = await createProduct(newProduct);
      if (createdProduct) {
        setDataProducts([...dataProducts, createdProduct]);
        setSnackbarMessage("Product creado exitosamente");
        setSnackbarOpen(true);
        handleClose();
      }
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setNewProduct(product);
    setEditMode(true);
    handleClickOpen();
  };

  const handleDelete = async (id) => {
    const success = await deleteProduct(id);
    if (success) {
      setDataProducts(dataProducts.filter((prov) => prov.id !== id));
      setSnackbarMessage("Product eliminado exitosamente");
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
    setDeleteProductId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeleteProductId(null);
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
          {t("products")}
        </Typography>
        <TextField
          label="Filtrar por tipo de producto"
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
          Crear Product
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editMode ? "Editar Product" : "Crear Nuevo Product"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, complete el siguiente formulario para{" "}
            {editMode ? "editar" : "crear"} un product.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              name="productType"
              label="Tipo de Product"
              type="text"
              fullWidth
              value={newProduct.productType}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="price"
              label="Precio"
              type="number"
              fullWidth
              value={newProduct.price}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              autoFocus
              margin="dense"
              name="amount"
              label="Cantidad"
              type="number"
              fullWidth
              value={newProduct.amount}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="description"
              label="Descripción"
              type="text"
              fullWidth
              value={newProduct.description}
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
            ¿Estás seguro de que deseas eliminar este product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={() => handleDelete(deleteProductId)}
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
                <strong>Tipo de Product</strong>
              </TableCell>
              <TableCell>
                <strong>Precio</strong>
              </TableCell>
              <TableCell>
                <strong>Cantidad</strong>
              </TableCell>
              <TableCell>
                <strong>Descripción</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div style={{ display: "flex", gap: "2px" }}>
                      <IconButton onClick={() => handleEdit(product)}>
                        <Edit color="primary" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteDialogOpen(product.id)}
                      >
                        <Delete color="error" />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell>{product.productType}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.amount}</TableCell>
                  <TableCell>{product.description}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredProducts.length}
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

export default Products;
