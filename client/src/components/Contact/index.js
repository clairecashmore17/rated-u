import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {Container, box} from '@mui/material';
import TextField from '@mui/material/TextField';

const Contact = () => {
  return (
    <div>
      <Container
        sx={{ maxWidth: "1500px", backgroundColor: "#f2f5f5", mb: "40px" }}
        maxWidth={false}
        >
      <h1>Contact</h1>
      </Container>
    </div>
  );
};

export default Contact;
