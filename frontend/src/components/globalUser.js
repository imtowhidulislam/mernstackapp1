import { createContext } from "react";

export const globalContext = createContext();
const GlobalUser = () => {
  const user = JSON.parse(localStorage.getItem("userDB"));
  return { user };
};

export default GlobalUser;
