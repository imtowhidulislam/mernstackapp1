import React, { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { userDB: action.payload };
    case "LOGOUT":
      return { userDB: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { userDB: null });

  useEffect(() => {
    const userExist = JSON.parse(localStorage.getItem("userDB"));
    if (userExist) {
      dispatch({ type: "LOGIN", payload: userExist });
    }
  }, []);

  // console.log(`Authcontext state ${state}`);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// export default AuthContextProvider;
