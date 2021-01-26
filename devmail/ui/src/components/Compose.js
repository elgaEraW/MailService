// React Module Imports
import React, { useState, useEffect } from "react";

// Material UI Imports
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";

// Component Imports
import Header from "./Header";
import composeStyles from "../styles/composeStyles";
import checkIfLoggedIn from "../utils/checkIfLoggedIn";
import getCookie from "../utils/getCookie";

const Compose = (props) => {
  const classes = composeStyles();

  useEffect(
    () =>
      checkIfLoggedIn().then((res) => (!res ? props.history.push("/") : null)),
    []
  );

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [collapseFlag, setCollapseFlag] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    var csrftoken = getCookie("csrftoken");

    var flag = false;

    const checkEmpty = () => {
      if (to.trim() === "") {
        setError("Receiver is a required Field");
        setCollapseFlag(true);
        return true;
      }
    };

    if (checkEmpty()) return;

    const request_options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        to: to.trim(),
        subject: subject.trim(),
        message: message,
      }),
    };

    await fetch("/api/send-mail/", request_options).then((res) => {
      if (res.status === 406) {
        setError("Wrong Data");
        setCollapseFlag(true);
      } else {
        props.history.push("/mail/");
      }
    });
  };

  const handleSearch = (string) => {
    props.history.push({
      pathname: "/mail/",
      state: string,
    });
  };

  return (
    <div className={classes.root}>
      <Header
        history={props.history}
        search={handleSearch}
        resetReceived={() => props.history.push("/mail/")}
        resetSent={() => {}}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container fixed>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Compose Mail
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
                id="to"
                label="To"
                name="to"
                autoComplete="to"
                autoFocus
                onChange={(event) => setTo(event.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="subject"
                label="Subject"
                type="subject"
                id="subject"
                autoComplete="subject"
                onChange={(event) => setSubject(event.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
                rows={22}
                name="message"
                label="Message"
                type="message"
                id="message"
                autoComplete="Message"
                onChange={(event) => setMessage(event.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Send
              </Button>
            </form>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default Compose;
