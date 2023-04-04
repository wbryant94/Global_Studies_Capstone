import React from "react";
import HomeStyles from "./HomeStyle.module.css";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/HomeCard";
import PublicIcon from "@mui/icons-material/Public";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { Button } from "@mui/material";

const Home = () => {
  return (
    <div className={HomeStyles.container}>
      <div className={HomeStyles.welcome}>
        Welcome to the Global Studies Landing page - a place where you can learn
        a little about who we are and our role at UNCA alongside a few tools to
        show what resources we have available.
      </div>
      <div className={HomeStyles.details}>
        <Card />
        <div className={HomeStyles.tools}>
          <Link to="/map">
            <div className={HomeStyles.mapping}>
              Interactive Map <PublicIcon />
            </div>
          </Link>

          <Link to="/resources">
            <div className={HomeStyles.resources}>
              Resource Page <Diversity3Icon />{" "}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
