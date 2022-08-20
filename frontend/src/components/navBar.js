import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLogout } from "../hooks/useLogout";
// import { faPen } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { userDB } = useAuthContext();
  const { Logout } = useLogout();
  const handleClick = (e) => {
    Logout();
    console.log("hi");
  };
  return (
    <div className="py-4 px-16 bg-[#888888] text-gray-200">
      <nav className="flex items-center justify-between ">
        <div>
          {/* <FontAwesomeIcon icon={faPen} /> */}
          <h2 className="first-letter:text-blue-700 uppercase first-letter:text-3xl font-extrabold">
            MernStact
          </h2>
        </div>
        <ul className="flex items-center justify-center gap-4 capitalize">
          <li>
            <Link className="bg-" to="/">
              Home Page
            </Link>
          </li>
          <li>
            <Link to="/form">Add Excersize</Link>
          </li>
          <nav>
            {userDB && (
              <div>
                <button onClick={handleClick}>Log out</button>
              </div>
            )}
            {!userDB && (
              <div>
                <Link to="/userform">Login</Link>
              </div>
            )}
          </nav>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
