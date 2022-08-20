import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const Logout = () => {
    localStorage.removeItem("userDB");

    dispatch({ type: "LOGOUT" });
  };

  return { Logout };
};
