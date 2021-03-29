import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import GetTaskPage from "../pages/GetTaskPage";
import PostTaskPage from "../pages/PostTaskPage";
import TaskDetailsPage from "../pages/TaskDetailsPage";
import MyBoardPage from "../pages/MyBoardPage";
import NavTabs from "../components/NavTabs";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/AuthenticatedApp.css";
import EventCalendar from "../pages/EventCalendar";

const AuthenticatedApp = () => {
  return (
    <>
      <Router basename="/">
        <div className="flex-wrapper">
          <NavBar>
            <NavTabs />
          </NavBar>

          {/* TODO change path "/" to welcome page once we build that */}
          <Route exact path="/" component={PostTaskPage} />
          <Route exact path="/gettask" component={GetTaskPage} />
          <Route exact path="/addtask" component={PostTaskPage} />
          <Route exact path="/details/:id" component={TaskDetailsPage} />
          <Route exact path="/myboard" component={MyBoardPage} />
          <Route exact path="/events" component={EventCalendar} />
          <Footer />
        </div>
      </Router>
    </>
  );
};

export default AuthenticatedApp;
