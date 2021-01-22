// React Module Imports
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Component Imports
import MailList from "./MailList";
import Compose from "./Compose";
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";

const Main = (props) => {
  return (
    <>
      <div className="container">
        <Router>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/mail" component={MailList} />
            <Route path="/compose" component={Compose} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    </>
  );
};

const appDiv = document.getElementById("app");
render(<Main />, appDiv);

export default Main;
