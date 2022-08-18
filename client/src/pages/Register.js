import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

const RegisterPage = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const validateForm = () => {
    const { password, confirmPassword, username, email } = values;

    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handelFormSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="loginForm-container">
        <form className="loginForm" onSubmit={handelFormSubmit}>
          <div className="brand">
            <h1>Register</h1>
          </div>
          <input
            type="text"
            name="username"
            className="loginInput"
            placeholder="Enter username "
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            name="email"
            className="loginInput"
            placeholder="Enter email "
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            className="loginInput"
            placeholder="Enter password "
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="confirmPassword"
            className="loginInput"
            placeholder="Enter password again "
            onChange={(e) => handleChange(e)}
          />
          <button className="loginInput" id="login-btn" type="submit">
            Register
          </button>
        </form>
        <span>
          Aldready have an account?<Link to={"/login"}> Login</Link>
        </span>
      </div>
      <ToastContainer />
    </>
  );
};

export default RegisterPage;
