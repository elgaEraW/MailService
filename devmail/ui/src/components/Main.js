// React Module Imports
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Component Imports
import Detail from "./Detail";
// import MailList from "./MailList";
import Compose from "./Compose";
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";
import Received from "./Received";
import Sent from "./Sent";

const Main = (props) => {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/mail/:slug" component={Detail} />
          <Route path="/mail" component={Received} />
          <Route path="/sent" component={Sent} />
          <Route path="/compose" component={Compose} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
};

const appDiv = document.getElementById("app");
render(<Main />, appDiv);

export default Main;
