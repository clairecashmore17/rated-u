import { Container } from "@mui/material";
import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
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

const Contact = () => {

  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(null);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const submitForm = () => {
    // Show the popup after successful submission
    setShowPopup(true);
    // Clear form data
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    setRating(null);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    // Update form data as user types
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  

  const closePopup = () => {
    // Close the popup
    setShowPopup(false);
  };

  return (
    <div>
      <Container
        sx={{ maxWidth: "1500px", backgroundColor: "#f2f5f5", mb: "40px" }}
        maxWidth={false}
      >
        <div className="contact-row white">
          {/*Text content on the left*/}
          <div className="flex-row-contact full-width left-content">
            <h1 className="text-primary title m5">
              We won't bite. 
              Give us your feedback!
            </h1>
            <p className="m5 subtext">
            Have a bug you want to note?
             How about a complaint?
              Here at Rated-U, we appreciate your feedback.
            </p>
          </div>
          {/* Contact Box on the right*/}
          <div className="contact-box white">
            <Box
              marginBottom={5}
              direction="column"
              alignItems="center"
              justifyContent="center" 
              maxWidth={2000}
            >
              <Card
                sx={{
                  maxWidth: "100%",
                  m: 8,
                  borderRadius: "15%",
                  backgroundColor: "#daf5ee"

                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                    m: 3
                  }}
                >
                  <form>
                    <Grid container spacing={0} alignContent={"center"}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        color={"#000000"}
                        p={2}
                        pl={5}
                        fontSize={30}
                      >
                        Your Name
                      </Typography>
                      <Grid item xs={12} pb={2}>
                        <TextField 
                          placeholder="Enter your name here. ex: John Doe" 
                          variant="outlined" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          fullWidth 
                          required
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#000000",
                                borderWidth: 2
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#000000",
                                borderWidth: 3
                              }
                            },
                            "& .MuiInputBase-root": {
                              height: 80,
                              background: "#FFFFFF",
                              borderRadius: 8,
                              fontSize: 22
                            },
                            "& .MuiInputBase-input": {
                              textAlign: 'center', // Center the text
                            }
                          }} 
                        />
                      </Grid>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        color={"#000000"}
                        p={2}
                        pt={4}
                        pl={5}
                        fontSize={30}
                      >
                        Your Email
                      </Typography>
                      <Grid item xs={12} pb={2}>
                        <TextField 
                          placeholder="Enter your email here. ex: johndoe@gmail.com"
                          variant="outlined" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          fullWidth 
                          required
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#000000",
                                borderWidth: 2
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#000000",
                                borderWidth: 3
                              }
                            },
                            "& .MuiInputBase-root": {
                              height: 80,
                              background: "#FFFFFF",
                              borderRadius: 8,
                              fontSize: 22
                            },
                            "& .MuiInputBase-input": {
                              textAlign: 'center', // Center the text
                            }
                          }} 
                        />
                      </Grid>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        color={"#000000"}
                        p={2}
                        pt={4}
                        pl={5}
                        fontSize={30}
                      >
                        Your Message
                      </Typography>
                      <Grid item xs={12} pb={2}>
                        <TextField 
                            placeholder="Type your message here"
                            variant="outlined" 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            fullWidth 
                            required
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor: "#000000",
                                  borderWidth: 2
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#000000",
                                  borderWidth: 3
                                }
                              },
                              "& .MuiInputBase-root": {
                                height: 150,
                                background: "#FFFFFF",
                                borderRadius: 10,
                                fontSize: 22
                              },
                              "& .MuiInputBase-input": {
                                textAlign: 'center', // Center the text
                              }
                            }} 
                          />
                      </Grid>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        color={"#000000"}
                        p={2}
                        pt={5}
                        pl={4}
                        fontSize={30}
                      >
                        How satisfied are you with our service?
                      </Typography>
                      <Grid item xs={12} pb={2} pl={0}>
                        <FormControl component="fieldset">
                          <RadioGroup 
                            row
                            value={rating}
                            onChange={handleRatingChange}
                          >
                            {[1, 2, 3, 4, 5].map((value) => (
                              <FormControlLabel
                                key={value}
                                value={value.toString()}
                                control={<Radio sx={{
                                  color: 'white', 
                                  '&.Mui-checked': { color: 'black' }, 
                                  '& .MuiSvgIcon-root': {
                                    fontSize: 35,
                                    backgroundColor: "white",
                                    borderRadius: '50%'
                                  },
                                  paddingLeft: '50px' 
                                  }} />
                                }
                                label={<span style={{ fontSize: '25px' }}>{value.toString()}</span>}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} pt={2}>
                        <Button
                          variant="contained"
                          type="button"
                          onClick={submitForm}
                          sx={{
                            m: "5%",
                            mb: 5,
                            ml: 32,
                            backgroundColor: "#1f6150",
                            borderRadius: 2,
                            color: "white",
                            maxWidth: "60%",
                            minWidth: "120px",
                            minHeight: "50px",
                            fontSize: 16
                          }}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              <CardActions
                sx={{ mt: 2, display: "flex", justifyContent: "center" }}
              ></CardActions>
              </Card>
            </Box>
          </div>
        </div>

        {showPopup && (
        <div className="overlay">
          <div id="popup" className="popup">
            <p className="m5 subtext">Thank you for your feedback. Kindly await our response!</p>
            <Button
             onClick={closePopup}
             variant="contained"
             type="button"
             sx={{
              margin: 'auto',
             backgroundColor: "#1f6150",
             borderRadius: 2,
             color: "white",
             maxWidth: "60%",
             minWidth: "120px",
             minHeight: "60px",
             fontSize: 20
             }}
            >
            Close
            </Button>
          </div>
        </div>
      )}
      </Container>
    </div>
  );
};

export default Contact;
