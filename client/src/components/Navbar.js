import React from "react";
import Logo from "../assets/logo.svg";


function Navbar() {
  return (
    <div className="container-navbar">
      <div className="brand-NavbarContainer" onClick={() => window.location.reload()}>
        <img src={Logo} alt="logo" />
        <h3>snappy</h3>
      </div>
      <div className="navbar-links">
          <span className="navbar-link">Add Chats</span>
          <span className="navbar-link">Add Rooms</span>

      </div>
    </div>
  );
}

export default Navbar;
