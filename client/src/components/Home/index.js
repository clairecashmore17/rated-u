import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import SchoolIcon from "@mui/icons-material/School";
import SmsIcon from "@mui/icons-material/Sms";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import GroupsIcon from "@mui/icons-material/Groups";
import "./index.css";

const Home = () => {
  const [universityName, setUniName] = useState("");
  const handleChange = (event) => {
    // console.log(event.target.value);
    setUniName(event.target.value);
  };

  return (
    <div>
      <Container
        sx={{ maxWidth: "1500px", backgroundColor: "#f2f5f5", mb: "40px" }}
        maxWidth={false}
      >
        {/* Top box with search bar */}
        <div className="home-box white intro">
          {/* Left content */}
          <div className="left-content full-width flex-row-home">
            <h1 className="text-primary title m5">
              Find the best University for you with Rated-U
            </h1>
            <p className="m5 subtext">
              Covers technical majors throughout Universities in the DMV area.
            </p>
            <input
              className="m5 search"
              name="universityName"
              placeholder="Search for a university"
              onChange={handleChange}
            ></input>
            <Button
              variant="contained"
              sx={{
                m: "5%",
                backgroundColor: "#1f6150",
                color: "white",
                maxWidth: "45%",
                minWidth: "200px",
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/university-profile/${universityName}`}
              >
                Search
              </Link>
            </Button>
          </div>
          {/* Right Image (picture of students) */}
          {/* <div className="school-img"> */}
          <img className=" school-img ar" src="/images/intro_img.png"></img>
          {/* </div> */}
        </div>
        {/* Second box (info box) */}
        <div className="home-box background-mint flex-column-home">
          <Card
            sx={{
              maxWidth: 500,
              m: 5,
              borderRadius: "5%",
              boxShadow: "-10px 10px #1f6150 ",
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
              <Button sx={{ color: "var(--primary)" }} disabled>
                <SchoolIcon
                  sx={{
                    fontSize: "100px",
                    backgroundColor: "var(--secondary)",
                    p: "10px",
                    borderRadius: "50px",
                  }}
                />
              </Button>
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
                variant="h5"
                component="div"
                pb={"30px"}
                color={"#1f6150"}
              >
                Our goal is to help incoming students choose the school best for
                them
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontSize={"5mm"}
              >
                Search for a University and see it's rating
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
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button sx={{ color: "var(--primary)" }} disabled>
                <ForumIcon
                  sx={{
                    fontSize: "100px",
                    backgroundColor: "var(--secondary)",
                    p: "15px",
                    borderRadius: "50px",
                  }}
                />
              </Button>
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
                variant="h5"
                component="div"
                pb={"65px"}
                color={"#1f6150"}
              >
                Keep it real.
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontSize={"5mm"}
              >
                Don't trust us. Trust them! Real student feedback without fear
                of paid promotion
              </Typography>
            </CardContent>
            <CardActions
              sx={{ mt: 2, display: "flex", justifyContent: "center" }}
            ></CardActions>
          </Card>
        </div>
        {/* Third box Rated-Filter access/info */}
        <div className="home-box white intro">
          <img className="rated-img" src="/images/students-computer.png" />
          <div className="flex-row-home rated-info">
            <h1 className="text-primary title">Introducing Filtering</h1>
            <p className="info-text">
              Looking for the top rated Universities? What about the top
              Technical Major at a specific University? Go to our Rated Filter
              to narrow down your search!
            </p>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1f6150",

                maxWidth: "200px",
                maxHeight: "100px",
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "3.5mm",
                  fontWeight: "bold",
                  color: "white",
                }}
                to={`/rated-filter`}
              >
                Go To Rated-Fitler
              </Link>
            </Button>
          </div>
        </div>
        {/* Fourth Box (more info) */}
        <div className="home-box background-mint flex-column-home">
          <Card
            sx={{
              maxWidth: 300,
              m: 5,
              borderRadius: "5%",
              boxShadow: "-15px 15px #1f6150 ",
              height: 400,
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
              <Button sx={{ color: "var(--primary)" }}>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#1f6150",
                  }}
                  to={"/about"}
                >
                  <GroupsIcon
                    sx={{
                      fontSize: "120px",
                      backgroundColor: "var(--secondary)",
                      p: "25px",
                      borderRadius: "70px",
                    }}
                  />
                </Link>
              </Button>
            </CardContent>

            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                fontSize={"5mm"}
              >
                Who are we? Find out the who, why, and how we made this site!
              </Typography>
            </CardContent>
          </Card>
          {/* Guide for rated-filter */}
          <Card
            sx={{
              maxWidth: 300,
              m: 5,
              borderRadius: "5%",
              boxShadow: "-15px 15px #1f6150 ",
              height: 400,
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
              <Button sx={{ color: "var(--primary)" }}>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#1f6150",
                    // backgroundColor: "#1f6150",
                  }}
                  to={"/guide"}
                >
                  <ReadMoreIcon
                    sx={{
                      fontSize: "120px",
                      backgroundColor: "var(--secondary)",
                      p: "25px",
                      borderRadius: "70px",
                    }}
                  />{" "}
                </Link>
              </Button>
            </CardContent>

            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                fontSize={"5mm"}
              >
                Filtering made easy. Click here to view a guide on how to use
                our Rated Filter
              </Typography>
            </CardContent>
          </Card>
          {/* Contact us link */}
          <Card
            sx={{
              maxWidth: 300,
              m: 5,
              borderRadius: "5%",
              boxShadow: "-15px 15px #1f6150 ",
              height: 400,
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
              <Button sx={{ color: "var(--primary)" }}>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#1f6150",
                    // backgroundColor: "#1f6150",
                  }}
                  to={"/contact"}
                >
                  <ConnectWithoutContactIcon
                    sx={{
                      fontSize: "120px",
                      backgroundColor: "var(--secondary)",
                      p: "25px",
                      borderRadius: "70px",
                    }}
                  />
                </Link>
              </Button>
            </CardContent>

            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                fontSize={"5mm"}
              >
                Got a question? Contact us here. We would love to hear from you.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
};
export default Home;
