// React Module Imports
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Material UI Imports
import { useTheme } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
      <ListItem>
        <ListItemAvatar>
          <Checkbox edge="start" tabIndex={-1} disableRipple />
        </ListItemAvatar>
        <ListItemText
          primary={data.sender}
          secondary={false ? "Secondary text" : null}
        />
        <ListItemText
          primary={data.subject}
          secondary={false ? "Secondary text" : null}
        />
      </ListItem>
    );
  };

  const generate = () => {
    const final = [];
    return (
      <List dense={false}>
        {mailData.data
          ? mailData.data.forEach((element) => {
              final.push(generateListItem(element));
            })
          : null}
        {final}
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
