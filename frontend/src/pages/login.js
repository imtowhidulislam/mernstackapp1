import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const { login, isLoading, error } = useLogin();

  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user.email, user.password);
    await login(user.email, user.password);
    setUser({ email: "", password: "" });
  };
  return (
    <form action="" onSubmit={handleSubmit}>
      <h2 className="text-center mb-4 uppercase font-extrabold text-2xl first-letter:text-yellow-500 first-letter:text-4xl">
        Sign in
      </h2>

      <div className="flex  items-center justify-between gap-2 mb-2">
        <lable>Email:</lable>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          value={user.email}
          onChange={handleUser}
          className="placeholder:capitalize p-1"
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <lable>Password:</lable>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          value={user.password}
          onChange={handleUser}
          className="placeholder:capitalize p-1"
        />
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="border-none oultine-none bg-yellow-500 rounded-lg font-bold uppercase px-4 py-2"
          type="submit"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
