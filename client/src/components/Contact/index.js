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
      <h1>Need to get ahold of us?</h1>
      <h1>Please leave us a message below and we'll get back to you as soon as we can!</h1>
      
      <div>
      <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Student Email"
        />
      </div>

      <div>
      <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="What would you like us to know?"
        />
       </div> 
      </Container>
    </div>
  );
};

export default Contact;
