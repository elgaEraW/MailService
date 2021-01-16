import React, { useState, useEffect } from "react";
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
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { Collapse } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        DevMail
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = (props) => {
  const classes = useStyles();

  const checkIfLoggedIn = async () => {
    let loginFlag = false;

    await fetch("/api/get-login/").then((res) => {
      if (res.status === 202) loginFlag = true;
    });

    if (loginFlag) props.history.push("/mail");
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptPromotions, setAcceptPromotions] = useState(false);
  const [collapseFlag, setCollapseFlag] = useState(false);
  const [error, setError] = useState("");

  const getCookie = (name) => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const checkEmpty = () => {
    if (firstName.trim() === "") {
      setError("First Name is a required Field");
      setCollapseFlag(true);
      return true;
    }

    if (lastName.trim() === "") {
      setError("Last Name is a required Field");
      setCollapseFlag(true);
      return true;
    }

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

    if (confirmPassword.trim() === "") {
      setError("Confirm Password is a required Field");
      setCollapseFlag(true);
      return true;
    }
  };

  const handleSubmit = async (event) => {
    var csrftoken = getCookie("csrftoken");
    let flag = false;

    if (checkEmpty()) return;

    if (password.trim() !== confirmPassword.trim()) {
      setError("Passwords do not match!!!");
      setCollapseFlag(true);
      return;
    }
    const request_options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        username: username.trim(),
        password: password.trim(),
        accept_promotions: acceptPromotions,
      }),
    };

    await fetch("/api/create-user/", request_options).then((res) => {
      if (res.status !== 200) {
        setError("Username already taken!!!");
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
          Sign up
        </Typography>
        <Collapse in={collapseFlag}>
          <Alert severity="error">{error}</Alert>
        </Collapse>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(event) => setFirstName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                onChange={(event) => setLastName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm_password"
                label="Confirm Password"
                type="password"
                id="confirm_password"
                autoComplete="confirm_password"
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="true" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
                onChange={(event) => setAcceptPromotions(event.target.checked)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login">Already have an account? Log in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignUp;
