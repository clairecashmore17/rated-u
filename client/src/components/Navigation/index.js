import React, { useState } from "react";
import {
  Toolbar,
  Box,
  AppBar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Modal,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";

import SchoolIcon from "@mui/icons-material/School";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import Login from "../Login";
import Signup from "../Signup";
const Navigation = () => {
  const pages = ["Rated-Filter", "About", "Contact"];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    // console.log(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    console.log(setting);
    if (setting == "Logout") {
      Auth.logout();
    }
  };

  // MODAL CODE
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState("1");
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar style={{ background: "#1f6150" }} position="static">
        <Container maxWidth="x2">
          <Toolbar disableGutters>
            <SchoolIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                color: "#8ee5f5",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                m: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: "5mm",
                letterSpacing: ".3rem",
                color: "inherit",
                backgroundColor: "#4ba7b8",
                padding: 0.75,
                paddingRight: 2,
                paddingLeft: 2,
                borderRadius: 2,
                textDecoration: "none",
              }}
            >
              Rated-U
            </Typography>

            <Box
              sx={{
                flexGrow: 1,

                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <Link to={`/${page}`} style={{ textDecoration: "none" }}>
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
            <SchoolIcon
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
                color: "#8ee5f5",
              }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 24,
                display: { xs: "flex", md: "none" },
                flexGrow: 0,
                minWidth: "130px",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                backgroundColor: "#4ba7b8",
                padding: 0.75,

                borderRadius: 2,
                textDecoration: "none",
              }}
            >
              Rated-U
            </Typography>
            {/* Pages in hamburger tool for smaller views */}
            <Box
              sx={{
                // flexGrow: 1,
                marginLeft: "auto",
                display: { xs: "none", md: "flex" },
              }}
            >
              {pages.map((page) => (
                <Link style={{ textDecoration: "none" }} to={`/${page}`}>
                  <Button
                    key={page}
                    variant="contained"
                    onClick={() => {
                      handleCloseNavMenu();
                      console.log("clicked " + page);
                    }}
                    sx={{
                      m: 1,
                      mx: 3,
                      fontSize: "3mm",
                      backgroundColor: "#1f6150",
                      color: "white",
                      display: "block",
                      ":hover": {
                        bgcolor: "#8ee5f5",
                        color: "black",
                      },
                    }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>

            {/* This is the account icon */}
            {Auth.loggedIn() ? (
              <Box sx={{ flexGrow: 0, padding: 2 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu(setting);
                        console.log("You clicked on " + setting);
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <>
                <Button
                  key={"login"}
                  variant="contained"
                  onClick={handleOpen}
                  sx={{
                    m: 1,
                    mx: 3,
                    fontSize: "3mm",
                    backgroundColor: "#1f6150",
                    color: "white",
                    display: "block",
                    ":hover": {
                      bgcolor: "#8ee5f5",
                      color: "black",
                    },
                  }}
                >
                  Signup/Login
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {" "}
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab label="Login" {...a11yProps(0)} />
              <Tab label="Signup" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Login />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Signup />
          </CustomTabPanel>
        </Box>
      </Modal>
    </>
  );
};

export default Navigation;
