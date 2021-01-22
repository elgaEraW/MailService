// React Module Imports
import React from "react";
import { Link } from "react-router-dom";

// Material UI Imports
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";

// Component Imports
import homeStyles from "../styles/homeStyles";
import checkIfLoggedIn from "../utils/checkIfLoggedIn";

const Home = (props) => {
  const classes = homeStyles();

  checkIfLoggedIn().then((res) => (res ? props.history.push("/mail") : null));

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
            {...props}
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
