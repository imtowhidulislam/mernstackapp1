import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [user, setUser] = useState({ userName: "", email: "", password: "" });
  const { signup, isLoading, error } = useSignup();

  const handleUser = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(user.userName, user.email, user.password);

    setUser({ userName: "", email: "", password: "" });
  };
  return (
    <form action="" onSubmit={handleSubmit}>
      <h2 className="text-center mb-4 uppercase font-extrabold text-2xl first-letter:text-yellow-500 first-letter:text-4xl">
        Sign Up
      </h2>
      <div className="flex items-center justify-between gap-2 mb-2">
        <lable>Name:</lable>
        <input
          type="text"
          id="name"
          name="userName"
          placeholder="Enter user name"
          value={user.userName}
          onChange={handleUser}
          className="placeholder:capitalize p-1"
        />
      </div>
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
          Sign Up
        </button>
      </div>
      {/* {err or && (
        <h2 className="border-2 border-red-500 rounded-sm capitalize text-red-400 p-2">
          {error}
        </h2>
      )} */}
    </form>
  );
};

export default Signup;
