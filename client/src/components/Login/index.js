import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import "./index.css";
import { useMutation } from "@apollo/client";

import Auth from "../../utils/auth";
import { LOGIN_USER } from "../../utils/mutations";

const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [login] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
    // console.log(JSON.stringify(userFormData));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log(JSON.stringify(userFormData));
    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      console.log(data);

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setUserFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <p className="head">Please provide your login credentials below:</p>
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 0,
            width: "25ch",
            height: "100px",
            p: "1px",
            display: "flex",
            flexDirection: "column",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          size="small"
          value={userFormData.email}
          onChange={handleInputChange}
        />
        <TextField
          name="password"
          label="Password"
          variant="outlined"
          size="small"
          value={userFormData.password}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1f6150",
            color: "white",
            // maxWidth: "45%",
            maxHeight: "50px",
          }}
          onClick={handleFormSubmit}
        >
          Login
        </Button>
      </Box>
    </div>
  );
};

export default Login;