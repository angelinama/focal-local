import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginEl from "./LogIn";
import Start from "../pages/Start"
import NavBar from "./NavBar";
import Wrapper from "./Wrapper";
import Background from "../components/Background";
function UnauthenticatedApp() {
  return (
    <Router>
      <div>
        <NavBar />
        <Background />;
        <Wrapper>
          <div className="text-center">
            <img
              src="FocalLocal-logo.png"
              alt="Local Focal Your Community Hub"
            />
          </div>
          <Switch>
            <Route exact path="/" component={Start} />
            <Route path="/sign" component={LoginEl} />
          </Switch>
        </Wrapper>
      </div>
    </Router>
  );
}

export default UnauthenticatedApp;