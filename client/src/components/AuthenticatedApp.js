import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GetTaskPage from "../pages/GetTaskPage";
import PostTaskPage from "../pages/PostTaskPage";
import TaskDetailsPage from "../pages/TaskDetailsPage";
import MyBoardPage from "../pages/MyBoardPage";
import NavTabs from "../components/NavTabs";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const AuthenticatedApp = () => {
  return (
    <>
      <Router>
        <NavBar>
          <NavTabs />
        </NavBar>
        <Switch>
          {/* TODO change path "/" to welcome page once we build that */}
          <Route exact path="/" component={PostTaskPage} />
          <Route path="/gettask" component={GetTaskPage} />
          <Route path="/addtask" component={PostTaskPage} />
          <Route exact path="/details/:id" component={TaskDetailsPage} />
          <Route exact path="/myboard" component={MyBoardPage} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default AuthenticatedApp;
