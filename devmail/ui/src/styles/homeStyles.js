import { makeStyles } from "@material-ui/core/styles";

const homeStyles = makeStyles((theme) => ({
  content: {
    margin: 0,
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  signupButton: {
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
  },
}));

export default homeStyles;
