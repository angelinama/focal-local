import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

function NavTabs() {
  const location = useLocation();
  const [show, setShow] = React.useState(false);

  return (
    <nav
      className="navbar navbar-expand-md navbar-dark justify-content-between"
    >
      <Link className="navbar-brand nav-text" to="/tasks">
        Focal Local
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
              to="/tasks"
              className={
                location.pathname === "/tasks" ? "nav-link active" : "nav-link"
              }
            >
              Get A Task
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavTabs;
