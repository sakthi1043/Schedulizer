import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import "./DashboardCards.css";

const Cards = () => {
  return (
    <Grid container spacing={3} justifyContent="center" >
      <Grid item xs={12} sm={6} md={4}>
        <Card className="animated-card card1">
          <CardContent>
            <Typography variant="h6" >Total TimeTables</Typography>
            <Typography variant="h4">30</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card className="animated-card card2">
          <CardContent>
            <Typography variant="h6">No. of Teachers</Typography>
            <Typography variant="h4">40</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card className="animated-card card3">
          <CardContent>
            <Typography variant="h6">No. of Students</Typography>
            <Typography variant="h4">300</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Cards;