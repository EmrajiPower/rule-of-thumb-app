import { createContext, useReducer, useContext } from "react";
import { AppContext } from "./config";
import { componentReducer } from "../reducers";
import initialState from "../reducers/initialState";

const CounterContext = createContext(AppContext);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(componentReducer, initialState);
  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(CounterContext);
};
