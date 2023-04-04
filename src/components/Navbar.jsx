import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../img/static/UNCA-logo.png";
import NavbarStyle from "./Navbar.module.css";
import { AuthContext } from "../context/AuthContext";
import { Button, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className={NavbarStyle.container}>
      <div className={NavbarStyle.logo}>
        <Link to="/">
          <img src={Logo} />
        </Link>
      </div>
      <div className={NavbarStyle.title}>
        <Typography gutterBottom> Global Studies Department</Typography>
      </div>
      {currentUser ? (
        <Link className={NavbarStyle.link} to="/add">
          <h2>
            {" "}
            Add Resources <PersonAddIcon />
          </h2>
        </Link>
      ) : (
        <></>
      )}
      <span>{currentUser?.fname}</span>
      {currentUser ? (
        <Link to="/">
          <Button variant="contained" onClick={logout}>
            Logout
          </Button>
        </Link>
      ) : (
        <Button variant="contained">
          <Link to="/login">Login</Link>
        </Button>
      )}
    </div>
  );
};

export default Navbar;
