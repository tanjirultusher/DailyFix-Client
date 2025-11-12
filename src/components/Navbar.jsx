import React, { use } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const NavBar = () => {

  const { user, signOutUser } = use(AuthContext);
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("User signed out successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  
    const links = (
    <>
      <li>
        <NavLink className="px-4 py-2 text-md font-semibold" to="/">Home</NavLink>
      </li>
      <li>
        <NavLink className="px-4 py-2 text-md font-semibold" to="/services">Services</NavLink>
      </li>
      {
        user && <>
          <li>
            <NavLink className="px-4 py-2 text-md font-semibold" to="/myservices">My Services</NavLink>
        </li>
        <li>
            <NavLink className="px-4 py-2 text-md font-semibold" to="/addservice">Add Service</NavLink>
        </li>
        <li>
          <NavLink className="px-4 py-2 text-md font-semibold" to="/bookings">My Bookings</NavLink>
        </li> 
        </>
      }
    </>
  );

  const authLinks = user ? (
    <div className="flex gap-4">
        <li>
            <NavLink className="px-4 py-2 text-md font-semibold" to="/profile">Profile</NavLink>
        </li>
        <li>
            <button onClick={handleSignOut} className="px-4 py-2 text-md font-semibold">Signout</button>
        </li>
    </div>
    ) : (
    <div className="flex gap-4">
        <li>
            <NavLink className="px-4 py-2 text-md font-semibold" to="/login">Login</NavLink>
        </li>
        <li>
            <NavLink className="px-4 py-2 text-md font-semibold" to="/register">Register</NavLink>
        </li>
    </div>
    );


  return (
    <div className="navbar bg-base-100 px-10 py-5 items-center sticky top-0 z-50 shadow">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">dailyFIX</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1 flex items-center gap-4">
          {authLinks}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
