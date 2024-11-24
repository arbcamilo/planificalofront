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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Edit, Delete, FilterList } from "@mui/icons-material";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} from "./ProductsServices";
import { useTranslation } from "react-i18next";

const Products = ({ documentNumber }) => {
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
    productId: "",
    price: 0,
    amount: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [productOptions, setProductOptions] = useState([]);

  useEffect(() => {
    const getProductsData = async () => {
      const products = await fetchProducts();
      setDataProducts(products);
      setFilteredProducts(products);
    };

    getProductsData();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      dataProducts.filter((prov) =>
        prov.productType?.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, dataProducts]);

  useEffect(() => {
    const fetchProductOptions = async () => {
      const products = await getProducts();
      setProductOptions(products);
    };

    fetchProductOptions();
  }, []);

  const handleChangePage = (newPage) => {
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
      productId: "",
      price: 0,
      amount: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...newProduct,
      providerId: documentNumber,
    };

    if (editMode) {
      const updatedProduct = await updateProduct(selectedProduct.id, productData);
      if (updatedProduct) {
        setDataProducts(
          dataProducts.map((prov) =>
            prov.id === selectedProduct.id ? updatedProduct : prov
          )
        );
        setSnackbarMessage(t("text4"));
        setSnackbarOpen(true);
        handleClose();
      }
    } else {
      const createdProduct = await createProduct(productData);
      if (createdProduct) {
        setDataProducts([...dataProducts, createdProduct]);
        setSnackbarMessage(t("text5"));
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
      setSnackbarMessage(t("text3"));
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
          label={t("filter")}
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
          {t("create")} {t("product")}
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? t("edit") : t("createNew")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("text1")} {t(editMode ? "edit" : "create")}
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="dense">
              <InputLabel>{t("productType")}</InputLabel>
              <Select
                name="productId"
                value={newProduct.productId}
                onChange={handleInputChange}
                label={t("productType")}
              >
                {productOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.productType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="price"
              label={t("price")}
              type="number"
              fullWidth
              value={newProduct.price}
              onChange={handleInputChange}
              slotProps={{
                inputLabel: { style: { fontWeight: "bold" } }
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              name="amount"
              label={t("amount")}
              type="number"
              fullWidth
              value={newProduct.amount}
              onChange={handleInputChange}
              slotProps={{
                inputLabel: { style: { fontWeight: "bold" } }
              }}
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
                {t("cancel")}
              </Button>
              <Button type="submit" color="primary" variant="contained">
                {t(editMode ? "edit" : "create")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>{t("confirmDelete")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("text2")} {t("user")}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="secondary">
            {t("cancel")}
          </Button>
          <Button
            onClick={() => handleDelete(deleteProductId)}
            color="primary"
            variant="contained"
          >
            {t("delete")}
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <strong>{t("productType")}</strong>
              </TableCell>
              <TableCell>
                <strong>{t("price")}</strong>
              </TableCell>
              <TableCell>
                <strong>{t("amount")}</strong>
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
