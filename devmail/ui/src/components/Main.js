import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./Header";
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
            <Route path="/mail" component={Header} />
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
