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
  Box,
  TextField,
  Grid
} from "@mui/material";
import "./index.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserProfile = () => {
  return (
    <div>
      <Container
        sx={{ maxWidth: "1500px", backgroundColor: "#f2f5f5", mb: "40px" }}
        maxWidth={false}
      >
        <div className="home-box background-mint flex-column-home">
          <Card
            sx={{
              maxWidth: 1000,
              m: 5,
              borderRadius: "10%",
              boxShadow: "-16px 16px #1f6150 ",
              height: 400,
              // mt: "7%",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AccountCircleIcon
                sx={{
                  fontSize: "200px",
                  color: "var(--primary)",
                  p: "10px",
                  borderRadius: "50px",
                }}
              />
              
            </CardContent>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Typography
                gutterBottom
                variant="h2"
                component="div"
                pb={"30px"}
                color={"#000000"}
              >
                John Doe
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontSize={"5mm"}
              >
                @john.doe
              </Typography>
            </CardContent>
            <CardActions
              sx={{ mt: 2, display: "flex", justifyContent: "center" }}
            ></CardActions>
          </Card>
          <Card
            sx={{
              maxWidth: 500,
              m: 5,
              borderRadius: "5%",
              boxShadow: "-10px 10px #1f6150 ",
              height: 400,
            }}
          >
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
                Program details to be entered here
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                pb={"65px"}
                color={"#1f6150"}
              >
                university details to be entered here
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                pb={"65px"}
                color={"#1f6150"}
              >
                friends details to be entered here
              </Typography>
            </CardContent>
            <CardActions
              sx={{ mt: 2, display: "flex", justifyContent: "center" }}
            ></CardActions>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default UserProfile;
