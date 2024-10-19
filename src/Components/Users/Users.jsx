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
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./UsersServices";
import { useTranslation } from "react-i18next";

const Users = () => {
  const [page, setPage] = useState(0);
  const { t } = useTranslation();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataUsers, setDataUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    documentType: "CC",
    email: "",
    phone: "",
    userStatus: "Activo",
    birthDate: "27/09/2024",
    accountCreationDate: "27/09/2024",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const users = await fetchUsers();
      setDataUsers(users);
      setFilteredUsers(users);
    };

    getUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      dataUsers.filter((prov) =>
        prov.firstName.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, dataUsers]);

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
    setSelectedUser(null);
    setNewUser({
      firstName: "",
      lastName: "",
      documentType: "CC",
      email: "",
      phone: "",
      userStatus: "Active",
      birthDate: "27/09/2024",
      accountCreationDate: "27/09/2024",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      const updatedUser = await updateUser(selectedUser.id, newUser);
      if (updatedUser) {
        setDataUsers(
          dataUsers.map((prov) =>
            prov.id === selectedUser.id ? updatedUser : prov
          )
        );
        setSnackbarMessage(t("text4"));
        setSnackbarOpen(true);
        handleClose();
      }
    } else {
      const createdUser = await createUser(newUser);
      if (createdUser) {
        setDataUsers([...dataUsers, createdUser]);
        setSnackbarMessage(t("text5"));
        setSnackbarOpen(true);
        handleClose();
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setNewUser(user);
    setEditMode(true);
    handleClickOpen();
  };

  const handleDelete = async (id) => {
    const success = await deleteUser(id);
    if (success) {
      setDataUsers(dataUsers.filter((prov) => prov.id !== id));
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
    setDeleteUserId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeleteUserId(null);
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
          {t("users")}
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
          {t("create")} {t("user")}
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? t("edit") : t("createNew")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("text1")} {t(editMode ? "edit" : "create")}
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              name="documentType"
              label={t("documentType")}
              type="text"
              fullWidth
              value={newUser.firstName}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
              SelectProps={{
                native: true,
              }}
            >
              <option value="CC">CC</option>
              <option value="CE">CE</option>
              <option value="NIT">NIT</option>
              <option value="PP">PP</option>
            </TextField>
            <TextField
              autoFocus
              margin="dense"
              name="lastName"
              label={t("lastName")}
              type="text"
              fullWidth
              value={newUser.lastName}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="documentType"
              label={t("documentType")}
              type="text"
              fullWidth
              value={newUser.documentType}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="email"
              label={t("email")}
              type="email"
              fullWidth
              value={newUser.email}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              select
              margin="dense"
              name="userStatus"
              label={t("userStatus")}
              fullWidth
              value={newUser.userStatus}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="birthDate"
              label={t("birthDate")}
              type="date"
              fullWidth
              value={newUser.birthDate}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontWeight: "bold" } }}
            />
            <TextField
              margin="dense"
              name="accountCreationDate"
              label={t("accountCreationDate")}
              type="date"
              fullWidth
              value={newUser.accountCreationDate}
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
            onClick={() => handleDelete(deleteUserId)}
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
                <strong>{t("firstName")}</strong>
              </TableCell>
              <TableCell>
                <strong>{t("lastName")}</strong>
              </TableCell>
              <TableCell>
                <strong>{t("documentType")}</strong>
              </TableCell>
              <TableCell>
                <strong>{t("email")}</strong>
              </TableCell>
              <TableCell>
                <strong>{t("userStatus")}</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div style={{ display: "flex", gap: "2px" }}>
                      <IconButton onClick={() => handleEdit(user)}>
                        <Edit color="primary" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteDialogOpen(user.id)}
                      >
                        <Delete color="error" />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.documentType}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.userStatus}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredUsers.length}
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

export default Users;
