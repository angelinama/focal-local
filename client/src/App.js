import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Welcome from "./pages/Welcome";
import Start from "./pages/Start";
import PostTaskPage from "./pages/PostTaskPage"

const App = () => (
  <Router>
    <Wrapper>
      <Route exact path="/" component={Start} />
      <Route exact path="/tasks" component={Welcome} />
      <Route exact path="/addtask" component={PostTaskPage} />
    </Wrapper>
  </Router>
);

export default App;
