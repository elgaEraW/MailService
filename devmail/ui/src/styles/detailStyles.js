import { makeStyles } from "@material-ui/core/styles";

const detailStyles = makeStyles((theme) => ({
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
  header: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  userIcon: {
    fontSize: "32px",
    display: "inline",
  },
  sender: {
    marginLeft: "2ch",
  },
  message: {
    fontSize: "1.2em",
    fontFamily: "inherit",
  },
  time: {
    position: "absolute",
    float: "right",
    right: "5ch",
  },
}));

export default detailStyles;
