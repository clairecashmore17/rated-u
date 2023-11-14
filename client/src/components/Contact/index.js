import { Container } from "@mui/material";
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

const Contact = () => {
  return (
    <div>
      <Container
        sx={{ maxWidth: "1500px", backgroundColor: "#f2f5f5", mb: "40px" }}
        maxWidth={false}
      >
        <div className="contact-row white">
          {/*Text content on the left*/}
          <div className="flex-row-contact half-width left-content">
            <h1 className="text-primary title m5">
              We won't bite. 
              Give us your feedback!
            </h1>
            <p className="m5 subtext">
            Have a bug you want to note?
             How about a complaint?
              Here at Rated-U we appreciate your feedback.
            </p>
          </div>
          {/* Contact Box on the right*/}
          <div className="contact-box white">
            <Card
              sx={{
                maxWidth: "100%",
                m: 5,
                borderRadius: "5%",
                backgroundColor: "#daf5ee",
                height: 400,
                // mt: "7%",
              }}
            ></Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
