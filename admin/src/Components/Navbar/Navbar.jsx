import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import logo from "../Navbar/BiteBurst.png"; // BiteBurst logo ko import kiya hai
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>

      {/* Profile Image (as it was) */}
      <img className="profile" src={assets.profile_image} alt="Admin Profile" />
    </div>
  );
};

export default Navbar;
