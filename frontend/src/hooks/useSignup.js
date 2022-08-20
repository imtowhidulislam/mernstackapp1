import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
const signupUrl = "http://localhost:3001/api/user/signupuser/";
export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (userName, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(signupUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userName, email, password }),
    });

    const jsonData = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(jsonData.error);
      // throw Error("Something wrong with the url");
    }
    if (response.ok) {
      // ? Saving the user to local storage:::
      localStorage.setItem("userDB", JSON.stringify(jsonData));

      // ? Update the auth Context:::
      dispatch({ type: "LOGIN", payload: jsonData });
      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
};
