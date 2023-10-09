import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./index.css";

const Home = () => {
  return (
    <div>
      <Container maxWidth="x1">
        {/* Top box with search bar */}
        <div className="home-box white intro">
          {/* Left content */}
          <div className="full-width flex-row">
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
          <div className="full-width">
            <img className="fit-content" src="/images/intro_img.png"></img>
          </div>
        </div>
        {/* Second box (info box) */}
        <div className="home-box background-mint">Box 2</div>
        {/* Third box Rated-Filter access/info */}
        <div className="home-box white">Box 3</div>
        {/* Fourth Box (more info) */}
        <div className="home-box background-mint">Box 4</div>
      </Container>
    </div>
  );
};
export default Home;
