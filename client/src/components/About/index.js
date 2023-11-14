import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {Container} from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import "./index.css"

const About = () => {
  return (
    <div>
      <Container
        sx={{ maxWidth: "1500px", backgroundColor: "#f2f5f5", mb: "40px" }}
        maxWidth={false}
        >
          {/* Top box */}
        <div className="Top-Box"> 
          <div className="Left-Info">
            <div>
              <h1 className="Center-Text Title-Text">Nice to meet you!</h1>
              <p className="Center-Text Left-Info-Text">We're glad to have you here at Rated-U.</p>
            </div>
            <div className="Info-Text">
              <h1 className="Title-Text">Why Rated-U?</h1>
              <p className="Center-Text Left-Info-Text">We are a group of college students who are strong believers in a student community. Rated-U allows students to come together to help future students make an informed decision on where they  want to go!</p>
            </div>
          </div>
          <img className="about-image" src="/images/about-image.png" />
        </div>
        {/* Lower box */}
        <div className="Lower-Box">
            <h1 className="Title-Text ">Meet the team</h1>
          <div className="Profiles">
            <div className="Profile">
              <AccountCircleOutlinedIcon sx={{
                      p: 2,
                      fontSize: "100px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}/>
              <p className="Name">Claire Cashmore</p>
              <p className="Role">Software Developer</p>
            </div>
            <div className="Profile">
              <AccountCircleOutlinedIcon sx={{
                      p: 2,
                      fontSize: "100px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}/>
              <p className="Name">Satish Sarma</p>
              <p className="Role">Software Developer</p>
            </div>
            <div className="Profile">
              <AccountCircleOutlinedIcon sx={{
                      p: 2,
                      fontSize: "100px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}/>
              <p className="Name">Natalie Jordan</p>
              <p className="Role">Software Developer</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
