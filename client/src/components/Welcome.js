import React, { useEffect, useState } from "react";
import Robot from "../assets/robot.gif";

function Welcome() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      setUsername(
        await JSON.parse(localStorage.getItem("chat-app-user")).username
      );
    };
    fetchUsername();
  }, []);

  return (
    <div className="welcome-container">
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{username}!</span>
      </h1>
      <h3>Please select a chat to Start Messaging.</h3>
    </div>
  );
}

export default Welcome;
