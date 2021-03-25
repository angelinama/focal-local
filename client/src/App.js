import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Start from "./pages/Start";
import PostTaskPage from "./pages/PostTaskPage"

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Start} />
      <Route exact path="/tasks" component={Welcome} />
      <Route exact path="/addtask" component={PostTaskPage} />
    </Switch>
  </Router>
);

export default App;
