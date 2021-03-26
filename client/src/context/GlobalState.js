import { createContext, useReducer, useContext } from "react";

const GlobalContext = createContext();

const { Provider } = GlobalContext;

//reducer function
const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// custom provider to connect state with the context
const GlobalProvider = ({ value = [], ...props }) => {
  // setup some state with useReducer
  const [state, dispatch] = useReducer(reducer, {
    userToken: "",
    email: "",
  });
  // pass the state to the provider
  return <Provider value={[state, dispatch]} {...props} />;
};

// custom hook
const useGlobalContext = () => {
  return useContext(GlobalContext);
};

// export the hook and the provider
export { GlobalProvider, useGlobalContext };
