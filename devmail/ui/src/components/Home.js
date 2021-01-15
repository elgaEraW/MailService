import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Button, ButtonGroup } from "@material-ui/core";
import { Grid } from "@material-ui/core";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  content: {
    margin: 0,
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  signupButton: {
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h2" compact="h2" className={classes.title}>
            Welcome to DevMail
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            to="/signup"
            component={Link}
            className={classes.signupButton}
          >
            SignUp
          </Button>
          <Button
            variant="contained"
            color="secondary"
            to="/login"
            component={Link}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </main>
  );
};

export default Home;
