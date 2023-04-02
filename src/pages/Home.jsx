import React from "react";
import HomeStyles from "./HomeStyle.module.css";
import { Link, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "../components/Card";
import PublicIcon from '@mui/icons-material/Public';
import Diversity3Icon from '@mui/icons-material/Diversity3';

const Home = () => {
  return (
    <div className={HomeStyles.container}>
      <div className={HomeStyles.welcome}>
        Welcome to the Global Studies Home Page. Plz explore.
        <div className={HomeStyles.about}>
          <p>
            {" "}
            Hello there - This is a little bit about the Global studies
            department and its goals / intentions There are a couple of ways to
            see what UNCA has to offer - the interactive world map tool, as well
            as a standard text based page of resources too. Have fun!
          </p>
        </div>
      </div>
      <div className={HomeStyles.details}>
        <Card />
        <div className={HomeStyles.tools}>
          <Stack direction="row">
            
            <Button variant="contained">
              <Link to="/map">
                <div className={HomeStyles.mapping}>Interactive Map <PublicIcon/></div>
              </Link>
            </Button>
            
            <Button variant="contained">
              <Link to="/resources">
                <div className={HomeStyles.resources}>Resource Page <Diversity3Icon/> </div>
              </Link>
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Home;
