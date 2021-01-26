import { makeStyles } from "@material-ui/core/styles";

const maillistStyles = makeStyles((theme) => ({
  sender: {
    width: "10%",
    position: "absolute",
    fontSize: "1.1em",
    cursor: "pointer",
    height: "100%",
    top: "30%",
    left: "7ch",
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
    cursor: "pointer",
    height: "100%",
    top: "30%",
  },
  created_at: {
    position: "absolute",
    float: "right",
    right: "2ch",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    fontSize: "1.1em",
    cursor: "pointer",
    height: "100%",
    top: "30%",
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
    textDecorationLine: "none",
    color: "inherit",
  },
  rule: {
    display: "block",
    width: "100%",
  },
}));

export default maillistStyles;
