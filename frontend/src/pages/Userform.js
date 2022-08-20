import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./login";

const Userform = () => {
  const [register, setRegister] = useState(true);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-200 p-4 rounded-xl drop-shadow-lg border-2 border-gray-400">
        {register ? <Signup /> : <Login />}
        <p className="text-center mt-4">
          {register ? "Already have an account? " : "Don't have any account? "}
          <span>
            <button
              className="text-blue-600 cursor-pointer font-bold underline"
              onClick={() => setRegister(!register)}
            >
              {register ? "Sign in" : "Sign up"}
            </button>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Userform;
