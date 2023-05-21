import React from "react";
import logo from "/logo.png";
import { Link } from "react-router-dom";
import profileico from "../../assets/profile.png";

const Navbar = () => {
  const logoutHandler = () => {
    localStorage.removeItem("token");
    location.reload();
  };
  return (
    <>
      <div className="w-full text-center py-4 bg-[#3E363F] flex flex-row justify-between px-8">
        <Link className="text-white text-3xl" to="/">
          <img src={logo} alt="logo" width={100} height={80} />
        </Link>

        <div className="flex flex-row">
          <div className="dropdown dropdown-end ">
            <label tabIndex={0} className="  text-white hover:bg-black">
              <img
                src={profileico}
                alt="profile"
                width={45}
                className="mt-2 "
              />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li onClick={logoutHandler}>
                <p className="hover:bg-red-600">→ Logout</p>
              </li>
              <li>
                <Link to="/profile">⚙️ Setting</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
