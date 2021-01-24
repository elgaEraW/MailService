// React Module Imports
import React, { useState, useEffect } from "react";

// Material UI Imports

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
            <h1>id: {mailData.id}</h1>
            <h1>S: {mailData.subject}</h1>
            <h1>Send: {mailData.sender}</h1>
            <h1>Rec: {mailData.receiver}</h1>
            <h1>T: {mailData.created_at}</h1>
          </>
        ) : null}
      </main>
    </div>
  );
};

export default Detail;
