// React Module Imports
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Material UI Imports
import { useTheme } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";

// Component Imports
import Header from "./Header";
import maillistStyles from "../styles/maillistStyles";
import checkIfLoggedIn from "../utils/checkIfLoggedIn";

const MailList = (props) => {
  const classes = maillistStyles();
  const theme = useTheme();

  const [effectFlag, setEffectFlag] = useState(false);
  const [mailData, setMailData] = useState({});

  checkIfLoggedIn().then((res) => (!res ? props.history.push("/") : null));

  useEffect(async () => {
    await fetch("/api/mail/")
      .then((res) => res.json())
      .then((data) => setMailData(data));
  }, [effectFlag]);

  const generateListItem = (data) => {
    return (
      <>
        <Link
          to={
            "/mail/" +
            btoa(
              data.sender +
                "<===>" +
                data.id +
                "<===>" +
                new Date(data.created_at).toLocaleString()
            )
          }
          className={classes.link}
        >
          <ListItem className={classes.listItem}>
            <ListItemAvatar>
              <Checkbox edge="start" tabIndex={-1} disableRipple />
            </ListItemAvatar>
            <div className={classes.sender}>{data.sender}</div>
            <div className={classes.subject}>{data.subject}</div>
            <div className={classes.created_at}>
              {new Date(data.created_at).toDateString()}
            </div>
          </ListItem>
        </Link>
        <hr />
      </>
    );
  };

  const generate = () => {
    const final = [];
    let data = mailData.data ? mailData.data.slice() : null;
    data ? data.reverse() : null;
    return (
      <List dense={false}>
        <hr />
        {data
          ? data.map((element) => {
              final.push(generateListItem(element));
            })
          : null}
        {final}
        {(data = null)}
      </List>
    );
  };

  return (
    <div className={classes.root}>
      <Header history={props.history} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {generate()}
      </main>
    </div>
  );
};

export default MailList;
