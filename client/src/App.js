import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Start from "./pages/Start";
import GetTaskPage from "./pages/GetTaskPage";
import PostTaskPage from "./pages/PostTaskPage";
import "./App.css";
import { useGlobalContext } from "./context/GlobalState";
import AuthenticatedApp from "./components/AuthenticatedApp";
import UnauthenticatedApp from "./components/UnauthenticatedApp";

function App() {
  // <Router>
  //   <Switch>
  //     <Route exact path="/" component={Start} />
  //     <Route exact path="/gettask" component={GetTaskPage} />
  //     <Route exact path="/addtask" component={PostTaskPage} />
  //   </Switch>
  // </Router>

  const [state, dispatch] = useGlobalContext();
  return state.userToken ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
