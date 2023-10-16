import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import "./index.css";

const Home = () => {
  return (
    <div>
      <Container maxWidth="x1">
        {/* Top box with search bar */}
        <div className="home-box white intro">
          {/* Left content */}
          <div className="left-content full-width flex-row">
            <h1 className="text-primary title m5">
              Find the best University for you with Rated-U
            </h1>
            <p className="m5 subtext">
              Covers technical majors throughout Universities in the DMV area.
            </p>
            <input
              className="m5 search"
              placeholder="Search for a university"
            ></input>
            <Button
              variant="contained"
              sx={{
                ml: "5%",
                backgroundColor: "#1f6150",
                color: "white",
                maxWidth: "45%",
              }}
            >
              Search
            </Button>
          </div>
          {/* Right Image (picture of students) */}
          <div className="full-width ">
            <img className="fit-content ar" src="/images/intro_img.png"></img>
          </div>
        </div>
        {/* Second box (info box) */}
        <div className="home-box background-mint flex-column">
          <Card
            sx={{
              maxWidth: 500,
              m: 5,
              borderRadius: "5%",
              boxShadow: "-10px 10px #1f6150 ",
            }}
          >
            <CardMedia
              sx={{
                height: 150,
                backgroundPosition: "center",
                backgroundSize: "40%",
                backgroundColor: "#4ba7b8",
              }}
              image="/images/Graduation_cap.png"
              title="grad cap"
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                pb={"30px"}
                color={"#1f6150"}
              >
                Our goal is to help incoming students choose the school best for
                them
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontSize={"2vh"}
              >
                View comments from real students attending university. No paid
                promotions!
              </Typography>
            </CardContent>
            <CardActions
              sx={{ mt: 2, display: "flex", justifyContent: "center" }}
            >
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
          <Card
            sx={{
              maxWidth: 500,
              m: 5,
              borderRadius: "5%",
              boxShadow: "-10px 10px #1f6150 ",
            }}
          >
            <CardMedia
              sx={{
                height: 150,
                backgroundPosition: "center",
                backgroundSize: "30%",
                backgroundColor: "#4ba7b8",
              }}
              image="/images/chat_bubbles.png"
              title="grad cap"
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                pb={"65px"}
                color={"#1f6150"}
              >
                Keep it real.
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontSize={"2vh"}
              >
                View comments from real students attending university. No paid
                promotions!
              </Typography>
            </CardContent>
            <CardActions
              sx={{ mt: 2, display: "flex", justifyContent: "center" }}
            >
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
        {/* Third box Rated-Filter access/info */}
        <div className="home-box white">Box 3</div>
        {/* Fourth Box (more info) */}
        <div className="home-box background-mint">Box 4</div>
      </Container>
    </div>
  );
};
export default Home;
