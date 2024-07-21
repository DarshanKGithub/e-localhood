import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [nameError, setNameError] = useState("");
  const [mobileNoError, setMobileNoError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate("");

  const handleUsername = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    validateConfirmPassword(password, e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
    validateName(e.target.value);
  };

  const handleMobileNo = (e) => {
    setMobileNo(e.target.value);
    validateMobileNo(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateName = (name) => {
    if (name.trim().length < 3) {
      setNameError("Name must be at least 3 characters long.");
    } else {
      setNameError("");
    }
  };

  const validateMobileNo = (mobileNo) => {
    const mobileNoRegex = /^[0-9]{10}$/;
    if (!mobileNoRegex.test(mobileNo)) {
      setMobileNoError("Please enter a valid 10-digit mobile number.");
    } else {
      setMobileNoError("");
    }
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
      setPasswordError(
        "Password must be at least 8 characters long, contain at least one uppercase letter and one number."
      );
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const validateForm = () => {
    return (
      !nameError &&
      !mobileNoError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Invalid form. Please check your inputs.");
      return;
    }

    axios
      .post("/v1/registration", {
        name: name,
        mobile_no: mobileNo,
        email: email,
        password: password,
        confirm_password: confirmPassword,
      })
      .then((response) => {
        console.log(response.data);
        alert("Successfully Registered");
        navigate("/login");
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
          alert("Registration failed. Please try again.");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="wrapper">
        <h6 className="sign-up">Signup</h6>

        <div className="customer-name">
          <label className="customerName">Full Name:</label>
          <div className="input-container">
            <FaUser className="icon1" />
            <input
              type="text"
              placeholder="Enter the Name"
              value={name}
              onChange={handleName}
              required
            />
          </div>
          {nameError && <span className="error-message4">{nameError}</span>}
        </div>

        <div className="phn-no">
          <label className="mobile_no">Phone no:</label>
          <div className="input-container">
            <FaPhone className="icon2" />
            <input
              type="tel"
              name="mobile"
              maxLength="10"
              placeholder="Enter your phone no.."
              pattern="[0-9]{10}"
              value={mobileNo}
              onChange={handleMobileNo}
              required
            />
          </div>
          {mobileNoError && (
            <span className="error-message5">{mobileNoError}</span>
          )}
        </div>

        <div className="email-name">
          <label className="email">Email:</label>
          <div className="input-container">
            <FaEnvelope className="icon3" />
            <input
              type="text"
              placeholder="Enter your email"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              value={email}
              onChange={handleUsername}
              required
            />
          </div>
          {emailError && <span className="error-message6">{emailError}</span>}
        </div>

        <div className="pwd-name">
          <label className="password">Password:</label>
          <div className="input-container">
            <FaLock className="icon4" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              minLength="8"
              value={password}
              onChange={handlePassword}
              required
            />
            <span
              className="password-toggle1"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          {passwordError && (
            <span className="error-message7">{passwordError}</span>
          )}
        </div>

        <div className="pwd-crfm">
          <label className="ConfirmPassword">Confirm Password:</label>
          <div className="input-container">
            <FaLock className="icon5" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter confirm password"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              required
            />
            <span
              className="password-toggle"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          {confirmPasswordError && (
            <span className="error-message8">{confirmPasswordError}</span>
          )}
        </div>

        <div>
          <button className="validate" type="submit">
            Signup
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
