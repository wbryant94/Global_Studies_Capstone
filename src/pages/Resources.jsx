import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import ResourceCard from "../components/Resource/ResourceCard";
import { Button, Card, Grid } from "@mui/material";






const Resources = () => {
  const [resources, setResources] = useState([]);

  /* const cat = useLocation().search;

  const location = useLocation();
  console.log(location) */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/resources/");
        setResources(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);



  return (
    <>
      <Grid container spacing={3}>
        <Grid>
          {resources.map((resource) => (
            <ResourceCard
              elevation={3}
              data={resource}
              key={resource.professor_id}
            />
          ))}
        </Grid>
      </Grid>
               <Link to="/">
        <Card
          variant="outlined"
          sx={{
            color: "purple",
            background: "white",
            alignContent: "center",
            display: "flex",
            justifyContent: "center",
            zIndex: 400
          }}
        >
          HOME
        </Card>
      </Link>
    </>
  );
};

export default Resources;
