import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Person2Icon from "@mui/icons-material/Person2";
import { Avatar, ButtonGroup } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const handleDelete = async (id)=>{
  try {
    await axios.delete('/resources/'+id);
  } catch (err) {
    console.log(err);
  }
  
}

const Resource = styled(Card)(() => ({
  margin: 10,
  variant: "outlined",
  backgroundColor: "white",
  padding: 8,
  textAlign: "center",
  color: "black",
  boxShadow: "0 3px 5px 2px",

  ":hover": {
    color: "teal",
    backgroundColor: "white",
  },
}));

export default function ResourceCard(props) {
  return (
    <Resource>
      <CardContent>
        <Avatar
          default={<Person2Icon />}
          sx={{ width: 80, height: 80, padding: 2 }}
          src={props.data.image}
        />

        <Typography variant="h2" sx={{ fontSize: 24 }} gutterBottom>
          {props.data.fname}
        </Typography>
        <Typography variant="h5" component="div">
          {props.data.department}
        </Typography>
        <Typography variant="body2">{props.data.description}</Typography>
        <Typography variant="h5" sx={{ fontSize: 24 }} gutterBottom>
          {props.data.email}
        </Typography>
      </CardContent>
      <ButtonGroup>
        <Link to="./edit">
          Edit
          <EditIcon />
        </Link>
        <Link onClick={handleDelete}>
          Delete
          <DeleteIcon />
        </Link>
      </ButtonGroup>
    </Resource>
  );
}
