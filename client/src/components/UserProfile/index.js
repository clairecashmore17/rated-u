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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
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
  const [showPopup, setShowPopup] = useState(false);

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
      setShowPopup(true);
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

  const closePopup = () => {
    // Close the popup
    setShowPopup(false);
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
                  maxWidth: 1000,
                  minWidth: 400,
                  m: 5,
                  borderRadius: "20%",
                  boxShadow: "-20px 20px #1f6150 ",
                  height: 400,
                  // mt: "7%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
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
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h3"
                    component="div"
                    pb={"10px"}
                    mt={-2}
                    color={"#000000"}
                  >
                    {`${user.first_name} ${user.last_name}`}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={"8mm"}
                    mt={-2}
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
                    onClick={handleAddFriend}
                    variant="contained"
                    type="button"
                    startIcon={<AddIcon />}
                    disabled={showAlert}
                    sx={{
                    m: "5%",
                    mb: 2,
                    backgroundColor: "#1f6150",
                    borderRadius: 2,
                    color: "white",
                    maxWidth: "60%",
                    minWidth: "120px",
                    minHeight: "60px",
                    fontSize: 20
                    }}
                  >
                    Add Friend
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
                  m: 5,
                  pl: 6,
                  pt: 2,
                  pr: 0,
                  borderRadius: "20%",
                  boxShadow: "-20px 20px #1f6150 ",
                  height: 525,
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
                          m: "15px",
                          backgroundColor: "var(--secondary)",
                          p: 1,
                          borderRadius: 8,
                        }}
                      />
                      <h2>University</h2>
                    </div>
                    <Typography
                      variant="h5"
                      component="div"
                      color={"#000000"}
                      ml={13}
                    >
                      {user.university.university_name}
                    </Typography>
                  </div>
                  <div className="profile-item">
                    <div className="profile-title">
                      <AccountBalanceIcon
                        sx={{
                          fontSize: "30px",
                          color: "var(--primary)",
                          m: "15px",
                          backgroundColor: "var(--secondary)",
                          p: 1,
                          borderRadius: 8,
                        }}
                      />
                      <h2>Major</h2>
                    </div>
                    <p style={{ marginLeft: "90px", fontStyle: "bold", marginTop: "-20px", marginBottom: "-10px" }}>
                      {user.major ? (
                        user.major.major_name
                      ) : (
                        <>
                          {" "}
                          {userParam ? (
                            <>{<Typography
                              variant="h5"
                              component="div"
                              color={"text.secondary"}
                              mt={"20px"}
                            >
                              User has not chosen a major
                            </Typography>}</>
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
                                    primaryTypographyProps={{ style: { color: 'black', fontSize: '25px' } }}
                                    secondary="Click to select major"
                                    secondaryTypographyProps={{ style: { color: 'var(--primary)', fontSize :'25px', textDecoration: 'underline' } }}
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
                          m: "15px",
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
                        color: 'var(--primary)',
                        fontSize :'24px',
                        textDecoration: 'underline',
                        textTransform: 'none'
                      }}
                      onClick={handleOpen}
                    >
                      Show Friends
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <p>Loading</p>
            )}
          </div>
          {user.upvotes ? (
            <div className="lower-profile dets">
              <div className="likes-title">
                <Typography
                    gutterBottom
                    variant="h3"
                    component="div"
                    mt={5}
                    color={"#000000"}
                  >
                    {`${user.first_name}'s Liked Universities`}
                  </Typography>
                {user.upvotes.length != 1 ? (
                  <Typography
                      fontSize="28px" 
                      marginLeft="20px"
                      marginTop="25px"
                      component="div"
                      color="text.secondary"
                    >
                      {`(${user.upvotes.length} likes)`}
                    </Typography>
                ) : (
                  <Typography
                      fontSize="28px" 
                      marginLeft="20px"
                      marginTop="25px"
                      component="div"
                      color="text.secondary"
                    >
                      {`(${user.upvotes.length} like)`}
                    </Typography>
                )}
              </div>
              {user.upvotes.map((university, index) => (
                <>
                  <div className="upvoted-uni">
                    <Card
                      sx={{
                        width: "35%",
                        m: 1,
                        borderRadius: "5%",
                        boxShadow: "-12px 12px #1f6150 ",
                        height: "300px",
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
                        width: "35%",
                        m: 5,
                        borderRadius: "5%",
                        borderColor: "black",
                        border: "1px solid var(--primary)",
                        boxShadow: "-10px 10px #1f6150 ",
                        height: "200px",
                        // mt: "7%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Link
                        style={{ textDecoration: "none", color: "white", fontSize: "18px" }}
                        to={`/university-profile/${university.university_name}`}
                      >
                        <h1 className="upvoted-uni-title">
                          {university.university_name}
                        </h1>
                      </Link>
                    </Card>
                  </div>
                </>
              ))}
            </div>
          ) : (
            <h1>No liked universities yet.</h1>
          )}
        </div>

        {showPopup && (
        <div className="overlay">
          <div id="popup" className="popup">
            <p className="m5 subtext"> {user.first_name} has been successfully added to your friends list!</p>
            <Button
             onClick={closePopup}
             variant="contained"
             type="button"
             sx={{
              margin: "auto",
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
