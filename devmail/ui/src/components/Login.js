// React Module Imports
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Material UI Imports
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";

// Component Imports
import Copyright from "./Copyright";
import loginStyles from "../styles/loginStyles";
import checkIfLoggedIn from "../utils/checkIfLoggedIn";
import getCookie from "../utils/getCookie";

const Login = (props) => {
  const classes = loginStyles();

  useEffect(
    () =>
      checkIfLoggedIn().then((res) =>
        res ? props.history.push("/mail") : null
      ),
    []
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [collapseFlag, setCollapseFlag] = useState(false);
  const [error, setError] = useState("");

  const checkEmpty = () => {
    if (username.trim() === "") {
      setError("Username is a required Field");
      setCollapseFlag(true);
      return true;
    }

    if (password.trim() === "") {
      setError("Password is a required Field");
      setCollapseFlag(true);
      return true;
    }
  };

  const handleSubmit = async (event) => {
    var csrftoken = getCookie("csrftoken");

    var flag = false;

    if (checkEmpty()) return;

    const request_options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        username: username.trim(),
        password: password.trim(),
        remember: remember,
      }),
    };

    await fetch("/api/login/", request_options).then((res) => {
      if (res.status === 401) {
        setError("Username Not Found");
        setCollapseFlag(true);
        flag = true;
      } else if (res.status === 400) {
        setError("Wrong Credentials");
        setCollapseFlag(true);
        flag = true;
      }
    });
    if (flag) return;
    props.history.push("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Collapse in={collapseFlag}>
          <Alert severity="error">{error}</Alert>
        </Collapse>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            onChange={(event) => setRemember(event.target.checked)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;
