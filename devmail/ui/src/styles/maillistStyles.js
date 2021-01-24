import { makeStyles } from "@material-ui/core/styles";

const maillistStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  sender: {
    width: "10%",
    fontSize: "1.1em",
  },
  subject: {
    position: "absolute",
    float: "left",
    left: "20ch",
    width: "60%",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: "1.1em",
  },
  created_at: {
    position: "absolute",
    float: "right",
    right: "2%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    fontSize: "1.1em",
  },
  listItem: {
    // borderTop: "1px ridge grey",
    // borderBottom: "1px ridge grey",
    "&:hover": {
      outline: "none",
      border: "none",
      borderColor: "#8f949c",
      boxShadow: "0 0 25px #8f949c",
      // borderRadius: "10px",
    },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  rule: {
    display: "block",
    width: "100%",
  },
}));

export default maillistStyles;
