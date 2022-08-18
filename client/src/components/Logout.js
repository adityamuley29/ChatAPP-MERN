import React from "react";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="logoutButton" onClick={handleClick}>
      <BiPowerOff />
    </div>
  );
}

export default Logout;
