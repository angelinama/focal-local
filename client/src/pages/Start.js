import React from "react";
import NavBar from "../components/NavBar";
import Wrapper from "../components/Wrapper"
import "../styles/Start.css";

const Start = () => (
  <div className="text-center">
    <NavBar />
    <Wrapper>
      <img src="FocalLocal-logo.png" alt="Local Focal Your Community Hub" />
      <h3 className="hello">Easiest way to engage your local community,</h3>
      <h5 className="start">Help others in your neighborhood</h5>
      <h5 className="start">Ask local help when you need</h5>
      <h5 className="start">Support small businesses</h5>
      <h5 className="start">Follow up local events</h5>
      <button type="submit" className="btn btn-primary">
        SIGN UP
      </button>
    </Wrapper>
  </div>
);
export default Start;