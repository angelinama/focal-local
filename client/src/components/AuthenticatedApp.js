import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Start from "../pages/Start";
import GetTaskPage from "../pages/GetTaskPage";
import PostTaskPage from "../pages/PostTaskPage";

const AuthenticatedApp = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PostTaskPage} />
        <Route exact path="/gettask" component={GetTaskPage} />
        <Route exact path="/addtask" component={PostTaskPage} />
        <Route exact path="/start" component={Start} />
      </Switch>
    </Router>
    //     <p>You are logged in</p>
  );
};

export default AuthenticatedApp;
