import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import globe_picture from "../img/static/little_globe.jpg"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";

const ResourceDisplay = styled(Card)(() => ({
  margin: 10,
  variant: "outlined",
  backgroundColor: "white",
  padding: 8,
  textAlign: "center",
  color: "black",
  boxShadow: "0 3px 5px 2px",
  justifyContent: "center",
  width: "auto",

  ":hover": {
    color: "teal",
    backgroundColor: "white",
  },
}));

/* In order to populate both the resource and professor tables, the professor is created so that the 
professor_id PK may then be used as the FK in the resource table - 
TODO: Implement duplicate checks on the backend for professors 
 */

// Initial form adds professor, resource entry requires prof id (FK )
const EditResource = (props) => {
  const location = useLocation();
  const propsData = location.state;
  const professor_id = propsData.professor_id;

  const [inputs, setInputs] = useState({ ...propsData });
  const [country, setCountry] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/resources/professor/" + professor_id
        );
        console.log("res: ",res)
        setCountry(
          res.data.map((item) => {
            return item.name;
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  console.log("professor inputs : ", inputs);
  console.log("professor countries :", country);

  return (
    <>
      <ResourceDisplay>
      <Link to="/resources"> 
      <ArrowBackIcon sx={{fontSize: "40px"}}/>
      </Link>
        <CardContent>
          <Typography gutterBottom variant="h2">
            {`${inputs.fname} ${inputs.lname}`}
          </Typography>
          <Typography variant="h3" color="text.primary">
            {`${inputs.department}`}
          </Typography>
          <CardMedia></CardMedia>
        </CardContent>
      </ResourceDisplay>
      <Card>
        <Typography variant="h6" color="text.secondary" gutterBottom sx={{
            margin: "10px",
            padding: "10px"
            
        }}>
          {`${inputs.description}`}
        </Typography>
      </Card>
      <Card>
      <CardMedia
            style={{
              width: 'auto',
              height: 'auto',
              justifyContent: "center",
              paddingTop: "60%",
            }}
            image={inputs.image}
          />  
      </Card>
      <Grid container spacing={10} sx={{ justifyContent: "center", flexDirection: "row" }}>
        <Grid xs={3} s={6}>
          <Typography
            sx={{
              mt: 4,
              mb: 2,
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
            variant="h4"
            component="div"
          >
            <ResourceDisplay sx={{display: "flex", mt: 10}}>Countries & Connections </ResourceDisplay>
          </Typography>
          {country.length >= 1 ? (  
          <List
            sx={{
              backgroundColor: "white",
              boxShadow: "0 3px 5px 2px",
              width: "auto",
            }}
          >
            <ListItem>
              <ListItemAvatar>
                {country.map((country) => {
                  return (
                    <ResourceDisplay>
                      {country}
                      <PublicIcon />
                    </ResourceDisplay>
                  );
                })}
              </ListItemAvatar>
            </ListItem>
          </List>
          ) : (
          
           <ResourceDisplay>
            No Countries / Connections To Display
           </ResourceDisplay>
          
          )
          }
        </Grid>
      </Grid>
    </>
  );
};

export default EditResource;
