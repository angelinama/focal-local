import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

function NavTabs() {
  const location = useLocation();
  const [show, setShow] = React.useState(false);

  return (
    <>
      <Link className="navbar-brand nav-text" to="/">
          <img
            src="logo400.png"
            alt="Focal Local"
            width="181"
            height="50"
            className="d-inline-block align-text-top"
          />
      </Link>
      <button
        className="navbar-toggler ml-auto"
        type="button"
        data-toggle="collapse"
        data-target="#navbar-toggle"
        aria-controls="nav-content"
        aria-expanded="false"
        onClick={() => setShow(!show)}
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div
        style={show ? { display: "block" } : { display: "none" }}
        className="navbar-collapse collapse nav-group "
        id="navbar-toggle"
      >
        <ul className="navbar-nav nav-group ml-auto ">
          <li className="nav-item">
            <Link
              to="/addtask"
              className={
                location.pathname === "/addtask"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Add A Task
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/gettask"
              className={
                location.pathname === "/gettask"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Get A Task
            </Link>
          </li>
          {/* ----START MY BOARD PAGE---- */}
          <li className="nav-item">
            <Link
              to="/myboard"
              className={
                location.pathname === "/myboard"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              My Board
            </Link>
          </li>
          {/* ----END MY BOARD PAGE---- */}
          <li className="nav-item">
            <Link
              to="/events"
              className={
                location.pathname === "/events" ? "nav-link active" : "nav-link"
              }
            >
              Events
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default NavTabs;
