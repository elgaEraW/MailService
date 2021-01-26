// React Module Imports
import React from "react";

//Material UI Imports
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";

// Component Imports
import maillistStyles from "../styles/maillistStyles";

const MailList = (props) => {
  const classes = maillistStyles();

  const handleForward = (link) => {
    props.history.push(link);
  };

  const generateListItem = (data) => {
    const link =
      "/mail/" +
      btoa(
        data.sender +
          "<===>" +
          data.id +
          "<===>" +
          new Date(data.created_at).toLocaleString()
      ) +
      "/";
    return (
      <>
        <ListItem className={classes.listItem}>
          <ListItemAvatar>
            <Checkbox edge="start" tabIndex={-1} disableRipple />
          </ListItemAvatar>
          <div className={classes.sender} onClick={() => handleForward(link)}>
            {props.sender ? data.sender : data.receiver}
          </div>
          <div className={classes.subject} onClick={() => handleForward(link)}>
            {data.subject}
          </div>
          <div
            className={classes.created_at}
            onClick={() => handleForward(link)}
          >
            {new Date(data.created_at).toDateString()}
          </div>
        </ListItem>
        <hr />
      </>
    );
  };

  const generate = (data) => {
    const final = [];
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

  return <>{generate(props.data ? props.data : null)}</>;
};

export default MailList;
