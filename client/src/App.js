import React, { useEffect } from "react";
import "./App.css";
import { useGlobalContext } from "./context/GlobalState";
import AuthenticatedApp from "./components/AuthenticatedApp";
import UnauthenticatedApp from "./components/UnauthenticatedApp";

function App() {
  const [state, dispatch] = useGlobalContext();

  useEffect(() => {
    //this function will make sure user refresh page still logged in unless they clicked the log out
    const checkLogin = () => {
      if (localStorage.getItem("userInfo")) {
        const { email, token } = JSON.parse(localStorage.getItem("userInfo"));
        dispatch({
          type: "LOGIN",
          email,
          token,
        });
      }
    };

    checkLogin();
  }, [dispatch]);

  return state.userToken ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
