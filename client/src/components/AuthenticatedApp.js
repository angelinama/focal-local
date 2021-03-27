import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GetTaskPage from "../pages/GetTaskPage";
import PostTaskPage from "../pages/PostTaskPage";
import { Button } from "react-bootstrap";
import { useGlobalContext } from "../context/GlobalState";

const AuthenticatedApp = () => {
  const [, dispatch] = useGlobalContext();

  //handle a logout
  const handleLogout = (event) => {
    event.preventDefault();
    dispatch({ type: "LOGOUT" });
    //remove userInfo from localStorage
    localStorage.removeItem("userInfo");
  };

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={PostTaskPage} />
          <Route exact path="/gettask" component={GetTaskPage} />
          <Route exact path="/addtask" component={PostTaskPage} />
        </Switch>
      </Router>
      {/* TODO move this button in navbar or footer */}
      <Button variant="primary" type="submit" onClick={handleLogout}>
        LogOut
      </Button>
    </>
  );
};

export default AuthenticatedApp;
