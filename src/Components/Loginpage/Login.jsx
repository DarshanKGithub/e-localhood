import "./Login.css";
import { MdOutlineEmail } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [customerId, setCustomerId] = useState(""); // State to hold customer ID

  const navigate = useNavigate();

  const handleUsername = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleToggle = () => {
    setShowPassword(!showPassword);
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailError || passwordError) {
      alert("Please fix the errors before submitting.");
      return;
    }

    axios
      // .post("http://10.42.0.158:3000/v1/login", {
      .post("/v1/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        const customerId = response.data.user.id;
        console.log("l-cid :: " + customerId);
        setCustomerId(customerId); // Store customer ID in component state
        Cookies.set("customer_id", customerId, { expires: 1 }); // Set cookie with customer ID
        alert("Successfully Signed In");
        navigate("/homepage");
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        if (
          err.response &&
          err.response.data &&
          err.response.data.error &&
          err.response.data.error.message
        ) {
          alert(err.response.data.error.message);
        } else {
          alert("Incorrect email or password");
        }
      });
  };

  return (
    <div className="header">
      <h1 className="lgn-up">Login/Signin</h1>
      <form onSubmit={handleSubmit}>
        <div className="lgn-form">
          <div className="email">
            <input
              type="text"
              spellCheck="false"
              placeholder="Enter your email"
              value={email}
              onChange={handleUsername}
              required
            />
            <label className="email-wrd">Email</label>
            <MdOutlineEmail className="email-icon" />
            {emailError && <p className="error-msg1">{emailError}</p>}
          </div>
        </div>
        <div className="pwd">
          <input
            type={passwordType}
            placeholder="Enter your password"
            value={password}
            onChange={handlePassword}
            required
          />
          <span className="visible" onClick={handleToggle}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          <label className="pwd-wrd">Password</label>
          <TbPasswordUser className="pwd-icon" />
          {passwordError && <p className="error-msg2">{passwordError}</p>}
        </div>
        <div className="not-acc">
          <h6>Not Having Account?</h6>
        </div>
        <div>
          <button type="submit" className="signin-btn">
            Signin
          </button>
        </div>
        <div>
          <Link className="sign-btn" to="/Register">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
