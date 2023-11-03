import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import "./index.css";
import { useMutation } from "@apollo/client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  InputAdornment,
  IconButton,
  OutlinedInput,
  Alert,
  Stack,
} from "@mui/material";
import Auth from "../../utils/auth";
import { LOGIN_USER } from "../../utils/mutations";

const Login = () => {
  // Create state to hold form data, validation alert popup status
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });

  const [showAlert, setShowAlert] = useState(false);

  // Mutation to Login
  const [login] = useMutation(LOGIN_USER);

  // Set the state to hold the user input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
    // console.log(JSON.stringify(userFormData));
  };

  // handle the data once login is selected
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
        onError: (error) => {
          // If error, show this popup
          setShowAlert(true);
        },
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

  // Hide password with dots functionality
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
        {showAlert ? (
          <Stack>
            <Alert
              severity="error"
              // show={showAlert}
              onClose={() => setShowAlert(false)}
            >
              Incorrect login information
            </Alert>
          </Stack>
        ) : (
          <></>
        )}

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
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
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
          onClick={handleFormSubmit}
          disabled={!(userFormData.password && userFormData.email)}
        >
          Login
        </Button>
      </Box>
    </div>
  );
};

export default Login;
