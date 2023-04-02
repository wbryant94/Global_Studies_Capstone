import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const card = (
  <React.Fragment>
    <CardContent
      sx={{ position: "fixed", bottom: "10%", left: "20%", zIndex: 9999 }}
    >
      <Typography variant="h6" component="div">
        UNCA Global Studies - Resource Visualization Application
      </Typography>
      <Typography
        variant="h2"
        sx={{ fontSize: 16 }}
        color="text.primary"
        gutterBottom
      >
        Fostering a sense of awareness of UNCA's connections across the globe.
      </Typography>
      <Typography variant="body2">
        Learn more about the department{" "}
        <a href="https://globalstudies.unca.edu/home/">click here </a>
        <Link to="/">
          <h1>Home</h1>
        </Link>
      </Typography>
    </CardContent>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
