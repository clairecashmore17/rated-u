import React, { useState, setState } from "react";
import { SwipeableDrawer, Button } from "@mui/material";
import "./index.css";
const Footer = () => {
  const [state, setState] = React.useState({
    bottom: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div className="footer">
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            sx={{ color: "white", fontWeight: "bold" }}
            onClick={toggleDrawer(anchor, true)}
          >
            Rated-U
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <div className="footer">
              <h1 className="footer-text">Rated-U</h1>

              <p1 className="footer footer-text">
                @2023 by Rated-U. <br />
                <br /> Proudly created by: <br />
                Claire Cashmore, Natalie Jordan, and Satish Sarma
              </p1>
            </div>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Footer;
