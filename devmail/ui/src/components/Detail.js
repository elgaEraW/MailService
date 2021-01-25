// React Module Imports
import React, { useState, useEffect } from "react";

// Material UI Imports
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

// Component Imports
import Header from "./Header";
import detailStyles from "../styles/detailStyles";
import checkIfLoggedIn from "../utils/checkIfLoggedIn";

const Detail = (props) => {
  const classes = detailStyles();

  const [effectFlag, setEffectFlag] = useState(false);
  const [mailData, setMailData] = useState();

  useEffect(
    () =>
      checkIfLoggedIn().then((res) => (!res ? props.history.push("/") : null)),
    []
  );

  useEffect(async () => {
    await fetch("/api/mail/" + props.match.params.slug + "/")
      .then((res) => {
        if (res.status === 400) props.history.push("/mail/");
        return res.json();
      })
      .then((data) => setMailData(data.Success));
  }, [effectFlag]);

  return (
    <div className={classes.root}>
      <Header history={props.history} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {mailData ? (
          <>
            <h1>{mailData.subject}</h1>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <AccountCircleIcon className={classes.userIcon} />
              </Grid>
              <Grid item className={classes.sender}>
                <h2>{mailData.sender}</h2>
              </Grid>
              <Grid item className={classes.time}>
                <h2>
                  {new Date(mailData.created_at).toDateString()} -{" "}
                  {new Date(mailData.created_at).toLocaleTimeString()}
                </h2>
              </Grid>
            </Grid>
            <pre className={classes.message}>{mailData.message}</pre>
          </>
        ) : null}
      </main>
    </div>
  );
};

export default Detail;
