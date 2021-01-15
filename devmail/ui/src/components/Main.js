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
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
};

const appDiv = document.getElementById("app");
render(<Main />, appDiv);

export default Main;
