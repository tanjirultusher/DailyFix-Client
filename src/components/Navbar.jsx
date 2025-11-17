import React, { use, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const NavBar = () => {
  const { user, signOutUser } = use(AuthContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() =>{
    const html = document.querySelector('html')
    html.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const handleTheme = (checked) =>{
    setTheme(checked? "dark" : "light")
  }

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
        <NavLink className="px-4 py-2 text-md font-semibold" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="px-4 py-2 text-md font-semibold" to="/services">
          Services
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              className="px-4 py-2 text-md font-semibold"
              to="/myservices"
            >
              My Services
            </NavLink>
          </li>
          <li>
            <NavLink
              className="px-4 py-2 text-md font-semibold"
              to="/addservice"
            >
              Add Service
            </NavLink>
          </li>
          <li>
            <NavLink className="px-4 py-2 text-md font-semibold" to="/bookings">
              My Bookings
            </NavLink>
          </li>
        </>
      )}
    </>
  );

const authLinks = user ? (
  <div className="relative group">
    <img
      src={user?.photoURL || "https://i.ibb.co.com/4pQ5tY0/default-user.png"}
      alt="User"
      className="w-10 h-10 rounded-full cursor-pointer border"
    />

    <div className="absolute right-0 mt-2 w-52 bg-white shadow-gray-lg rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
      <div className="border-b pb-2 mb-2">
        <p className="font-bold text-gray-600">
          {user?.displayName || "User Name"}
        </p>
        <p className="text-sm text-gray-500">
          {user?.email || "email@example.com"}
        </p>
      </div>
      <ul>
      
      <li>
        <NavLink
          to="/profile"
          className="block px-4 py-2 hover:bg-gray-100 rounded-md font-semibold text-gray-600"
        >
          Profile
        </NavLink>
      </li>

      <li>
        <button
          onClick={handleSignOut}
          className="w-full text-left block px-4 py-2 hover:bg-gray-100 rounded-md font-semibold text-gray-600"
        >
          Sign Out
        </button>
      </li>
      <li className="ml-4">
        <input 
        onChange = {(e)=> handleTheme(e.target.checked)}
        type="checkbox" 
        defaultChecked = {localStorage.getItem('theme') === "dark"}
        className="toggle"
        />
      </li>
    </ul>
    </div>
  </div>
  
) : (
    <div className="flex gap-4">
      <li>
        <NavLink className="px-4 py-2 text-md font-semibold" to="/login">
          Login
        </NavLink>
      </li>
      <li>
        <NavLink className="px-4 py-2 text-md font-semibold" to="/register">
          Register
        </NavLink>
      </li>
      <li className="p-2">
        <input 
        onChange = {(e)=> handleTheme(e.target.checked)}
        type="checkbox" 
        defaultChecked = {localStorage.getItem('theme') === "dark"}
        className="toggle"
        />
      </li>
    </div>
  );

  return (
    <div className="navbar bg-base-100 px-10 py-4 items-center sticky top-0 z-50 shadow">
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-2 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <h2 className="text-4xl font-bold text-center">
          daily<span className="text-primary">FIX</span>
        </h2>
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
