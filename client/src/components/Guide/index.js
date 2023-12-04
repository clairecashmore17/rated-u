import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  TextArea,
  Button,
  TextareaAutosize,
} from "@mui/material";

const Guide = () => {
  return (
    <>
      <Container
        sx={{ maxWidth: "1500px", backgroundColor: "#f2f5f5", mb: "40px" }}
        maxWidth={false}
      >
        <h1 style={{ color: "var(--primary)", textAlign: "center" }}>
          How to use Rated_U Filter
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: "20px",
            borderBottom: "dotted var(--primary) 5px",
          }}
        >
          <img
            src="/images/Select_Major.gif"
            style={{ height: "400px", width: "600px" }}
          />
          <div
            style={{
              padding: "20px",
              backgroundColor: "var(--secondary)",
              alignContent: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "300px",
              width: "300px",
              borderRadius: "15px",
              boxShadow: "10px 10px var(--primary)",
            }}
          >
            <h1 style={{ color: "var(--primary)" }}>Step 1</h1>
            <p>
              After navigating to the Rated-U filter page from the top bar,
              select which major you would like to see.
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: "20px",
            borderBottom: "dotted var(--primary) 5px",
          }}
        >
          <div
            style={{
              marginBottom: "20px",
              padding: "20px",
              alignContent: "center",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "var(--secondary)",
              alignItems: "center",
              justifyContent: "center",
              height: "300px",
              width: "300px",
              borderRadius: "15px",
              boxShadow: "-10px 10px var(--primary)",
            }}
          >
            <h1 style={{ color: "var(--primary)" }}>Step 2</h1>
            <p>
              To view the returned universities by likes, click that "Highest
              Likes" or "Lowest Likes". You can switch between the two by
              clicking your chosen filter to remove it and reselecting a new
              one.
            </p>
          </div>
          <img
            src="/images/Select_Likes.gif"
            style={{ height: "400px", width: "600px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: "20px",
            borderBottom: "dotted var(--primary) 5px",
          }}
        >
          <img
            src="/images/Reset_Results.gif"
            style={{ height: "400px", width: "600px" }}
          />
          <div
            style={{
              padding: "20px",
              backgroundColor: "var(--secondary)",
              alignContent: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "300px",
              width: "300px",
              borderRadius: "15px",
              boxShadow: "10px 10px var(--primary)",
            }}
          >
            <h1 style={{ color: "var(--primary)" }}>Step 3</h1>
            <p>
              To choose different majors from the filters section, refresh your
              chosen filters by clicking "Refresh".
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Guide;
