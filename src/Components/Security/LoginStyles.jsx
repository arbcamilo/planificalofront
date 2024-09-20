// src/Components/Security/LoginStyles.js
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "80vh",
    backgroundColor: theme.palette.background.default,
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
}));

export default useStyles;
