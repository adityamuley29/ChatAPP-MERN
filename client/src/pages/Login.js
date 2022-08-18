import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

const LoginPage = () => {
  const [values, setValues] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handelFormSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          "chat-app-user",
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="loginForm-container">
        
        <form onSubmit={handelFormSubmit} className="loginForm">
          <div className="brand">
            <h1>Login</h1>
          </div>
          <input
            type="text"
            name="username"
            className="loginInput"
            placeholder="Enter Username "
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            className="loginInput"
            placeholder="Enter password "
            onChange={(e) => handleChange(e)}
          />
          <button className="loginInput" id="login-btn" type="submit">
            Login
          </button>
        </form>
        <span>
          Don't have an account?<Link to={"/register"}> Register</Link>
        </span>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginPage;
