import React from "react";
import Wrapper from "../components/Wrapper"
import { Link } from "react-router-dom";
import "../styles/Start.css";

const Start = () => (
  <div className="text-center">
    <Wrapper>
      <h3 className="hello">Easiest way to engage your local community,</h3>
      <h5 className="start">Help others in your neighborhood</h5>
      <h5 className="start">Ask local help when you need</h5>
      <h5 className="start">Support small businesses</h5>
      <h5 className="start">Follow up local events</h5>
      <Link to="/sign">
        <button type="button" className="btn btn-primary startbtn">LOGIN</button>
      </Link>
    </Wrapper>
  </div>
);
export default Start;