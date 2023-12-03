import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import {QUERY_USER, QUERY_OTHER_USER, QUERY_MAJORS} from "../../utils/queries";
import { ADD_FRIEND, UPDATE_MAJOR } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserProfile = () => {

  const { username: userParam } = useParams();
  console.log(userParam);
  const { loading, data, refetch } = useQuery(
    userParam ? QUERY_OTHER_USER : QUERY_USER,
    {
      variables: { username: userParam },
    }
  );
  const { loading: majorLoading, data: majorData } = useQuery(QUERY_MAJORS);
  var major_types = [];
  if (majorData) {
    // console.log(majorData.majors);
    major_types = majorData.majors.map(({ major_name }) => major_name);
  }
  const [user, setUser] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState("Choose your major");
  const openMajorMenu = Boolean(anchorEl);
  // Toggle validation alerts
  const [showAlert, setShowAlert] = useState(false);

  const [addFriend, { error }] = useMutation(ADD_FRIEND);
  const [updateMjaor, { error: majorError }] = useMutation(UPDATE_MAJOR);
  
  useEffect(() => {
    setUser(data?.user || data?.otherUser || {});
    console.log(data);
  }, [data]);

  if (!data) {
    return <div>Loading...</div>;
  };

  const handleAddFriend = async () => {
    try {
      await addFriend({
        variables: { friendId: user._id },
      });
    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }
    // console.log("error" + error.toString());
  };

  //make sure you cant get to profile page without being logged in
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    console.log(event.currentTarget.value);
  };

  const handleMajorClose = () => {
    setAnchorEl(null);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Container
        sx={{ maxWidth: "1500px", backgroundColor: "#f2f5f5", mb: "40px" }}
        maxWidth={false}
      >
        <div className="home-box background-mint flex-column-home">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                maxWidth: 1000,
                m: 5,
                borderRadius: "10%",
                boxShadow: "-16px 16px #1f6150 ",
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
                <AccountCircleIcon
                  sx={{
                    fontSize: "200px",
                    color: "var(--primary)",
                    p: "10px",
                    borderRadius: "50px",
                  }}
                />
                
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
                  variant="h2"
                  component="div"
                  pb={"30px"}
                  color={"#000000"}
                >
                  {`${user.first_name} ${user.last_name}`}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontSize={"5mm"}
                >
                  {`@${user.username}`}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ mt: 2, display: "flex", justifyContent: "center" }}
              ></CardActions>
            </Card>
          </div>
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
                Program details to be entered here
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                pb={"65px"}
                color={"#1f6150"}
              >
                university details to be entered here
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                pb={"65px"}
                color={"#1f6150"}
              >
                friends details to be entered here
              </Typography>
            </CardContent>
            <CardActions
              sx={{ mt: 2, display: "flex", justifyContent: "center" }}
            ></CardActions>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default UserProfile;
