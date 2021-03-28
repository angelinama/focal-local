import React, { useState } from "react";
import LoginEl from "./LogIn";
import Start from "../pages/Start";
import NavBar from "./NavBar";
import Background from "../components/Background";
import Container from "react-bootstrap/Container";
import "../styles/UnauthenticatedApp.css";
function UnauthenticatedApp() {
  const [isStartPage, setIsStartPage] = useState(true);

  return (
    <div>
      <NavBar />
      <Background />
      <Container>
        <div className="text-center">
          <img
            className="startlogo"
            src="FocalLocal-logo.png"
            alt="Local Focal Your Community Hub"
          />
        </div>
        {isStartPage ? (
          <Start switchToLogin={() => setIsStartPage(false)} />
        ) : (
          <LoginEl />
        )}
      </Container>
    </div>
  );
}

export default UnauthenticatedApp;
