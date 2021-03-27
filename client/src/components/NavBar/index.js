import React from "react";
import "./style.css";

function NavBar({ children }) {
  return (
    <nav className="navbar navbar-expand-md navbar-dark justify-content-between">
      {children}
    </nav>
  );
}

export default NavBar;
