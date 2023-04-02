import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthStyles from "./AuthStyle.module.css";

const Register = () => {
  const [inputs, setInputs] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null);
  const navigate = useNavigate();


   //Regex to verify email formatting,
  //was able to register with blank fields before.
  // TODO ** Need to add additional backend check //
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  //S.O RegEX credit: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a : User = Matt Timmermans
  function isValidPassword(password) {
    const passwordRegEx = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    return passwordRegEx.test(password);
  }

  const handleEmailChange = (e) => {
    if (!isValidEmail(e.target.value)) {
      setErr("Email is invalid");
    } else {
      setErr(null);
    }

    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);

    if (isValidEmail(inputs["email"])) {
      console.log("The email is valid");
    } else {
      setErr("Email is invalid");
    }

    if (isValidPassword(inputs["password"])) {
      console.log("The password is valid");
    } else {
      setErr(
        "Password is invalid, password must at least 8 characters in length and include at least one upper and lowercase character, at least one number, and at least one special characer"
      );
      console.log("failed password validation");
    }

    if (isValidPassword(inputs["password"]) && isValidEmail(inputs["email"])) {
      try {
        console.log("in handleSubmit try");
        await axios
          .post("http://localhost:8800/api/auth/register", inputs)
          .then(console.log("success"));
        navigate("/login");
        //console.log(res)
      } catch (err) {
        setErr(err.response.data);
      }
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className={AuthStyles.auth}>
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="first name"
          name="fname"
          onChange={handleChange}
        />
        <input
          required
          type="text"
          placeholder="last name"
          name="lname"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleEmailChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Register</button>
        {err && <p className={AuthStyles.error}>{err}</p>}

        <span>
          {" "}
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
