import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import {Grid} from "@mui/material";
import Butera from "../img/static/butera.jpg";
import Ligo from "../img/static/Ligo.jpg";

export default function AdminCards() {
  return (
    <Grid container sx={{direction: "row"}}>
      <Card sx={{ maxWidth: 400, margin: 2 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="auto"
            width="auto"
            image={Butera}
            alt="prof Butera"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Professor Butera - Ancient Meditteranean Studies 
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Professor Butera worked to spearhead the Global Studies Department
              back in 2022 blah blah blah
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ maxWidth: 400, margin: 2 , '@media (min-width: 780px)': {
      width: 800 } }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="auto"
            width="auto"
            image={Ligo}
            alt="Professor Seth Ligo"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Professor Ligo - Religious Studies
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Professor Ligo worked to spearhead the Global Studies Department
              back in 2022 blah blah blah
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
