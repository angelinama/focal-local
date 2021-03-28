import React, { useState } from "react";
import LoginEl from "./LogIn";
import Start from "../pages/Start";
import NavBar from "./NavBar";
import Background from "../components/Background";
import "../styles/UnauthenticatedApp.css";
function UnauthenticatedApp() {
  const [isStartPage, setIsStartPage] = useState(true);

  return (
    <div>
      <NavBar />
      <Background />;
      <Wrapper>
        <div className="text-center">
          <img src="FocalLocal-logo.png" alt="Local Focal Your Community Hub" />
        </div>
        {isStartPage ? (
          <Start switchToLogin={() => setIsStartPage(false)} />
        ) : (
          <LoginEl />
        )}
      </Wrapper>
    </div>
  );
}

export default UnauthenticatedApp;
