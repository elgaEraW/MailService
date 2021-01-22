// React Module Imports
import React from "react";
import { Link } from "react-router-dom";

// Material UI Imports
import Typography from "@material-ui/core/Typography";

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to={props.link ? props.link : "/"}>
        DevMail
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
