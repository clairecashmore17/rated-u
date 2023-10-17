import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import "./index.css";
const Signup = () => {
  return (
    <div className="flex-column">
      <p className="head">Please provide your information below:</p>
      <div className="flex-row">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 0, width: "25ch", height: "70px" },
            display: "flex",
            flexDirection: "column",
            p: "10px",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="firstName"
            label="First Name"
            variant="outlined"
            size="small"
          />
          <TextField
            id="lastName"
            label="Last Name"
            variant="outlined"
            size="small"
          />
          <TextField id="email" label="Email" variant="outlined" size="small" />
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 0, width: "25ch", height: "70px" },
            display: "flex",
            flexDirection: "column",
            p: "10px",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            size="small"
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            size="small"
          />
        </Box>
      </div>{" "}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#1f6150",
          color: "white",
          // maxWidth: "45%",
          maxHeight: "50px",
        }}
      >
        Create Account
      </Button>
    </div>
  );
};

export default Signup;
