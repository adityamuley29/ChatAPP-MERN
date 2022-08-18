import React from "react";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Chat } from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        
        <Routes>
          <Route path={"/register"} element={<Register />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/setAvatar"} element={<SetAvatar />} />
          <Route path={"/"} element={<Chat />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
