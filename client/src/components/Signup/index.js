import React, { useState } from "react";
import { Box, TextField, Button, Alert, Stack } from "@mui/material";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

import "./index.css";
const Signup = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target);
    console.log(`name is ${name} value is ${value}`);
    setUserFormData({ ...userFormData, [name]: value });
    console.log(userFormData);
  };

  const [addUser, { error }] = useMutation(ADD_USER);
  const formHandler = async (event) => {
    console.log(userFormData);
    event.preventDefault();

    const form = event.currentTarget;
    // validation add here

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      console.log(data);

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(+e);
      setShowAlert(true);
    }

    console.log("error" + error);
    // setUserFormData({
    //   username: "",
    //   email: "",
    //   password: "",
    //   first_name: "",
    //   last_name: "",
    // });
  };
  return (
    <div className="flex-column">
      <p className="head">Please provide your information below:</p>
      {showAlert ? (
        <Stack>
          <Alert severity="error" onClose={() => setShowAlert(false)}>
            {error.toString()}
          </Alert>
        </Stack>
      ) : (
        <></>
      )}{" "}
      <div className="flex-row" onChange={handleInputChange}>
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
            name="first_name"
            label="First Name"
            variant="outlined"
            size="small"
            error={userFormData.first_name === ""}
            helperText={
              userFormData.first_name === ""
                ? "Please provide your first name."
                : ""
            }
          />
          <TextField
            id="lastName"
            name="last_name"
            label="Last Name"
            variant="outlined"
            size="small"
            error={userFormData.last_name === ""}
            helperText={
              userFormData.last_name === ""
                ? "Please provide your last name."
                : ""
            }
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            size="small"
            error={userFormData.email === ""}
            helperText={
              userFormData.email === ""
                ? "Please provide your school email."
                : ""
            }
          />
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
            name="username"
            label="Username"
            variant="outlined"
            size="small"
            error={userFormData.username === ""}
            helperText={
              userFormData.username === ""
                ? "Please provide your username."
                : ""
            }
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            size="small"
            error={userFormData.password === ""}
            helperText={
              userFormData.password === "" ? "Please provide a password." : ""
            }
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
        onClick={formHandler}
        disabled={
          !(
            userFormData.password &&
            userFormData.email &&
            userFormData.username &&
            userFormData.first_name &&
            userFormData.last_name
          )
        }
      >
        Create Account
      </Button>
    </div>
  );
};

export default Signup;
