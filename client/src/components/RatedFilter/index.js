import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Button, Container } from "@mui/material";
import "./index.css";
const RatedFilter = () => {
  const buttons = [
    "filter 1",
    "filter 2",
    "filter 3",
    "filter 4",
    "filter 5",
    "filter 6",
  ];
  const filters = [
    "chosen 1",
    "chosen 2",
    "chosen 3",
    "chosen 4",
    "chosen 5",
    "chosen 6",
  ];
  return (
    <Container
      sx={{ maxWidth: "1500px", backgroundColor: "#f2f5f5" }}
      maxWidth={false}
    >
      {" "}
      <div className="dets">
        <div className="home-box filter">
          <h1 className="filter-title">
            What are you looking for from a University?
          </h1>
          <p className="filter-sub-text">Select your filters here</p>
          <div className="filters">
            {buttons.map((button) => (
              <Button
                variant="contained"
                key={button}
                sx={{
                  backgroundColor: "var(--secondary)",
                  color: "var(--primary)",
                  fontWeight: "bold",
                  height: "40px",
                  width: "20%",
                  p: "10px",
                  m: "15px",
                  ":hover": {
                    bgcolor: "#8ee5f5",
                    color: "black",
                  },
                }}
              >
                {button}
              </Button>
            ))}
          </div>
          <div className="search-filter">
            <div className="chosen-filters">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant="contained"
                  sx={{
                    backgroundColor: "var(--secondary)",
                    color: "var(--primary)",
                    height: "40px",
                    width: "15%",
                    fontSize: "3mm",
                    m: 1,
                    boxShadow: "-5px 5px var(--primary)",
                    ":hover": {
                      bgcolor: "#8ee5f5",
                      color: "black",
                    },
                  }}
                >
                  {filter}
                </Button>
              ))}
            </div>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "var(--primary)",
                color: "var(--secondary)",
                height: "40px",
                width: "20%",
              }}
            >
              Search
            </Button>
          </div>
        </div>
        <div className="home-box ">This will be a result</div>
        <div className="home-box ">
          This will be a result - need to create another component
        </div>
      </div>
    </Container>
  );
};

export default RatedFilter;
