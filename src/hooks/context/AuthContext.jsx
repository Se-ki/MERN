import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducer/authReducer";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    author: null,
  });

  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      dispatch({ type: "LOGIN", payload: JSON.parse(token) });
    }
  },[]);

  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
