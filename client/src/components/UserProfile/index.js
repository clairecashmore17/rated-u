import React, { useEffect, useState } from "react";
import {
  QUERY_USER,
  QUERY_OTHER_USER,
  QUERY_MAJORS,
} from "../../utils/queries";
import { ADD_FRIEND, UPDATE_MAJOR } from "../../utils/mutations";
import { Navigate, useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  Button,
  Container,
  Card,
  CardContent,
  Typography,
  CardActions,
  CardMedia,
  Alert,
  Stack,
  Modal,
  Box,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import "./index.css";
import FriendList from "../FriendList";
import AddIcon from '@mui/icons-material/Add';

const UserProfile = () => {
  //getting url parameter
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
  }

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
    <Container
      sx={{ maxWidth: "1500px", backgroundColor: "#f2f5f5", mb: "30px", minHeight: "100vh", display: "flex" }}
      maxWidth={false}
    >
      <div>
        <div className="home-box background-mint flex-row-user">
          <Card
            sx={{
              maxWidth: 1000,
              minWidth: 400,
              m: 5,
              borderRadius: "20%",
              boxShadow: "-20px 20px #1f6150 ",
              height: 400,
              mt: -30
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
                  pt: "10px",
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
                color={"#000000"}
                mt={-2}
              >
                {`${user.first_name} ${user.last_name}`}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontSize={"10mm"}
                mt={-3}
              >
                {`@${user.username}`}
              </Typography>
            </CardContent>
            <CardActions
              sx={{ mt: 2, display: "flex", justifyContent: "center" }}
            ></CardActions>
          </Card>
          <Card
            sx={{
              minWidth: 850,
              height: 650,
              m: 5,
              mt: -5,
              borderRadius: "20%",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                pt: 5,
                pl: 10
              }}
            >
              <LocationCityIcon
                sx={{
                  fontSize: "50px",
                  color: "var(--primary)",
                  pt: "10px",
                  backgroundColor: "#d1d4d4",
                  borderRadius: "30px",
                }}
              />
              <h5 className="text-primary title m5">University</h5>
            </CardContent>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                pl: 8
              }}
            >
              <Typography
                  variant="h4"
                  component="div"
                  color={"#000000"}
                  mt={-5}
                  ml={13}
                >
                  The George Washington University
                </Typography>
            </CardContent>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                pt: 5,
                pl: 10
              }}
            >
              <AccountBalanceIcon
                sx={{
                  fontSize: "50px",
                  color: "var(--primary)",
                  pt: "10px",
                  backgroundColor: "#d1d4d4",
                  borderRadius: "30px",
                }}
              />
              <h5 className="text-primary title m5">Major</h5>
            </CardContent>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                pl: 8
              }}
            >
              <Typography
                  variant="h4"
                  component="div"
                  color={"#000000"}
                  mt={-5}
                  ml={13}
                >
                  Computer Engineering
                </Typography>
            </CardContent>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                pt: 5,
                pl: 10
              }}
            >
              <PeopleIcon
                sx={{
                  fontSize: "50px",
                  color: "var(--primary)",
                  pt: "10px",
                  backgroundColor: "#d1d4d4",
                  borderRadius: "30px",
                }}
              />
              <h5 className="text-primary title m5">Friends</h5>
            </CardContent>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                pl: 8
              }}
            >
              <Button
                onClick={toggleFriendsList}
                variant="text"
                type="button"
                sx={{
                  mt: -5,
                  ml: 13,
                  borderRadius: 100,
                  color: "var(--primary)",
                  maxWidth: "60%",
                  minWidth: "120px",
                  minHeight: "60px",
                  fontSize: 35,
                  textTransform: 'none'
                }}
              >
              View Friends
              </Button>
            </CardContent>
            <CardActions
              sx={{ mt: 2, display: "flex", justifyContent: "center" }}
            >

            </CardActions>
          </Card>
        </div>
        <div className="friends-section white flex-column-user">
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            color={"#000000"}
            m={4}
          >
          Friends (count)
          </Typography>  

        </div>
      </div>
    </Container>
  );
};

export default UserProfile;
