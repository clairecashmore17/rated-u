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
import "./index.css";
const Contact = () => {
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [show, setAlert] = useState(false);
  // Handle text inputs into the field boxes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target);
    // Set the data to the value in the text box
    setUserFormData({ ...userFormData, [name]: value });
    console.log(userFormData);
  };

  // Handle the form when a user selects submit
  const formHandler = async (event) => {
    if (
      userFormData.name === "" ||
      userFormData.email === "" ||
      userFormData.message === ""
    ) {
      setAlert(true);
    } else {
      // console.log(userFormData);
      event.preventDefault();

      const form = event.currentTarget;
      console.log("removing text");
      setUserFormData({ name: "", email: "", message: "" });
    }
  };
  return (
    <div>
      <Container
        sx={{ maxWidth: "1500px", backgroundColor: "#f2f5f5", mb: "40px" }}
        maxWidth={false}
      >
        <div className="contact">
          <div className="contact-section">
            <h1 style={{ color: "var(--primary)", fontSize: "45px" }}>
              We wont bite. Give us your feedback.
            </h1>
            <p style={{ fontSize: "20px" }}>
              Have a bug you want to note? How about a complaint? Here at
              Rated-U we appreciate your feedback.
            </p>
          </div>
          <div
            component="form"
            style={{
              margin: 55,
              width: "600px",
              height: "800px",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "space-evenly",
              padding: "20px",
              border: "var(--primary) 2px solid",
              borderRadius: "15px",
              backgroundColor: "var(--secondary)",
            }}
            noValidate
            autoComplete="off"
            onChange={handleInputChange}
          >
            <h1 style={{ color: "var(--primary)", textAlign: "center" }}>
              Enter your information here.
            </h1>
            <p style={{ color: "black", textAlign: "center" }}>
              Our team will reach out to you as soon as we can.
            </p>
            <TextField
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              value={userFormData.name}
              size="medium"
              sx={{ m: "10px", backgroundColor: "white" }}
              error={userFormData.name === "" && show}
              helperText={
                userFormData.name === "" && show
                  ? "Please provide your name."
                  : ""
              }
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              size="medium"
              value={userFormData.email}
              sx={{ m: "10px", backgroundColor: "white" }}
              error={userFormData.email === "" && show}
              helperText={
                userFormData.email === "" && show
                  ? "Please provide your email."
                  : ""
              }
            />
            <TextareaAutosize
              id="message"
              name="message"
              value={userFormData.message}
              placeholder="Message"
              variant="outlined"
              style={{
                margin: "10px",
                border:
                  userFormData.message === ""
                    ? "red 2px solid"
                    : "black 2px solid",
                height: "200px",
                padding: "10px",
              }}
              error={userFormData.message === ""}
              helperText={
                userFormData.message === "" && show
                  ? "Please provide your message."
                  : ""
              }
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1f6150",
                color: "white",
                // maxWidth: "45%",
                maxHeight: "50px",
              }}
              onClick={formHandler}
              disabled={
                !(
                  userFormData.email &&
                  userFormData.message &&
                  userFormData.name
                )
              }
            >
              Send Message
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
