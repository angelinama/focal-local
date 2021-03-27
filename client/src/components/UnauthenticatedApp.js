import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/Container";
import LoginEl from "./LogIn";
import Start from "../pages/Start"
import NavBar from "./NavBar";
import Background from "../components/Background";
import "../styles/UnauthenticatedApp.css";
function UnauthenticatedApp() {
  return (
    <Router>
      <div>
        <NavBar />
        <Background />
        <Container>
          <img
            src="FocalLocal-logo.png"
            alt="Local Focal Your Community Hub"
            className="startlogo"
          />
          <Switch>
            <Route exact path="/" component={Start} />
            <Route path="/sign" component={LoginEl} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default UnauthenticatedApp;