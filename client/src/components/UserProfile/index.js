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
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import "./index.css";
import FriendList from "../FriendList";

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
    <>
      <Container
        sx={{ maxWidth: "1500px", backgroundColor: "#f2f5f5", mb: "40px" }}
        maxWidth={false}
      >
        <div className="dets-reverse">
          <div className="upper-profile">
            <div
              style={{
                width: "40%",
                m: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  m: 3,
                  borderRadius: "5%",
                  boxShadow: "-15px 15px #1f6150 ",
                  height: 350,
                  // mt: "7%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <AccountCircleSharpIcon
                  sx={{ fontSize: "150px", color: "var(--primary)" }}
                />
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
              </Card>
              {userParam ? (
                <>
                  {showAlert ? (
                    <Stack>
                      <Alert
                        severity="error"
                        onClose={() => setShowAlert(false)}
                      >
                        {error.toString()}
                      </Alert>
                    </Stack>
                  ) : (
                    <></>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleAddFriend}
                    disabled={showAlert}
                  >
                    Add friend
                  </Button>
                </>
              ) : (
                <></>
              )}
            </div>
            {user.university ? (
              <Card
                sx={{
                  width: "50%",
                  m: 2,
                  p: 2,
                  borderRadius: "5%",
                  boxShadow: "-15px 15px #1f6150 ",
                  height: 400,
                  // mt: "7%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <div className="profile-items">
                  <div className="profile-item">
                    <div className="profile-title">
                      <SchoolIcon
                        sx={{
                          fontSize: "30px",
                          color: "var(--primary)",
                          m: "10px",
                          backgroundColor: "var(--secondary)",
                          p: 1,
                          borderRadius: 8,
                        }}
                      />
                      <h2>University</h2>
                    </div>
                    <p style={{ marginLeft: "100px", fontStyle: "bold" }}>
                      {user.university.university_name}
                    </p>
                  </div>
                  <div className="profile-item">
                    <div className="profile-title">
                      <AccountBalanceIcon
                        sx={{
                          fontSize: "30px",
                          color: "var(--primary)",
                          m: "10px",
                          backgroundColor: "var(--secondary)",
                          p: 1,
                          borderRadius: 8,
                        }}
                      />
                      <h2>Major</h2>
                    </div>
                    <p style={{ marginLeft: "100px", fontStyle: "bold" }}>
                      {user.major ? (
                        user.major.major_name
                      ) : (
                        <>
                          {" "}
                          {userParam ? (
                            <>{`Have not chosen a major.`}</>
                          ) : (
                            <>
                              <List
                                component="nav"
                                aria-label="Device settings"
                                sx={{ bgcolor: "background.paper" }}
                              >
                                <ListItem
                                  button
                                  id="lock-button"
                                  aria-haspopup="listbox"
                                  aria-controls="lock-menu"
                                  aria-label="when device is locked"
                                  aria-expanded={
                                    openMajorMenu ? "true" : undefined
                                  }
                                  onClick={handleClickListItem}
                                >
                                  <ListItemText
                                    primary={major_types[selectedIndex]}
                                    secondary="Click to select major"
                                  />
                                </ListItem>
                              </List>
                              <Menu
                                id="lock-menu"
                                anchorEl={anchorEl}
                                open={openMajorMenu}
                                onClose={handleMajorClose}
                                MenuListProps={{
                                  "aria-labelledby": "lock-button",
                                  role: "listbox",
                                }}
                              >
                                {major_types.map((option, index) => (
                                  <MenuItem
                                    key={option}
                                    disabled={index === 0}
                                    selected={index === selectedIndex}
                                    onClick={(event) =>
                                      handleMenuItemClick(event, index)
                                    }
                                  >
                                    {option}
                                  </MenuItem>
                                ))}
                              </Menu>
                            </>
                          )}
                        </>
                      )}
                    </p>
                  </div>
                  <div className="profile-item">
                    <div className="profile-title">
                      <PeopleIcon
                        sx={{
                          fontSize: "30px",
                          color: "var(--primary)",
                          m: "10px",
                          backgroundColor: "var(--secondary)",
                          p: 1,
                          borderRadius: 8,
                        }}
                      />
                      <h2>Friends List</h2>
                    </div>
                    <Button
                      sx={{
                        marginLeft: "35px",
                        fontStyle: "bold",
                        width: "300px",
                      }}
                      onClick={handleOpen}
                    >
                      Expand Friends List
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <p>Loading</p>
            )}
          </div>
          {user.upvotes ? (
            <div className="lower-profile">
              <div className="likes-title">
                <h1
                  style={{ fontSize: "6mm", color: "var(--primary)" }}
                >{`${user.username}'s upvoted Universities`}</h1>
                {user.upvotes.length > 1 ? (
                  <p
                    style={{ fontSize: "5mm", color: "var(--primary)" }}
                  >{`(${user.upvotes.length}) likes`}</p>
                ) : (
                  <p
                    style={{ fontSize: "5mm", color: "var(--primary)" }}
                  >{`(${user.upvotes.length}) like`}</p>
                )}
              </div>
              {user.upvotes.map((university, index) => (
                <>
                  <div className="upvoted-uni">
                    <Card
                      sx={{
                        width: "30%",
                        m: 1,
                        borderRadius: "5%",
                        boxShadow: "-15px 15px #1f6150 ",
                        height: "200px",
                        maxHeight: 500,
                        // mt: "7%",
                      }}
                    >
                      <CardMedia
                        sx={{ height: "100%" }}
                        image={`/images/${university.university_image}`}
                        title={`${university.university_name} image`}
                      />
                    </Card>
                    <Card
                      sx={{
                        width: "50%",
                        m: 1,
                        borderRadius: "5%",
                        boxShadow: "-15px 15px #1f6150 ",
                        height: "200px",
                        // mt: "7%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h1 className="upvoted-uni-title">
                        <Link
                          style={{ textDecoration: "none", color: "white" }}
                          to={`/university-profile/${university.university_name}`}
                        >
                          {university.university_name}
                        </Link>
                      </h1>
                    </Card>
                  </div>
                </>
              ))}
            </div>
          ) : (
            <h1>No upvoted universities yet.</h1>
          )}
        </div>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {user.friends != "" ? (
            <>
              {user.friends.map((friend) => (
                <div>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    {" "}
                    <FriendList
                      key={friend._id}
                      first_name={friend.first_name}
                      last_name={friend.last_name}
                      username={friend.username}
                    />
                  </List>
                </div>
              ))}
            </>
          ) : (
            <p>No friends...</p>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default UserProfile;
