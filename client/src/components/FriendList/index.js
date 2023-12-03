import React, { useState } from "react";
import { List, ListItem, ListItemText, ListItemAvatar } from "@mui/material";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
const FriendList = (item) => {
  const { first_name, last_name, username } = item;
  return (
    <div>
      <ListItem>
        <ListItemAvatar>
          <AccountCircleSharpIcon />
        </ListItemAvatar>
        <ListItemText
          primary={`${first_name} ${last_name}`}
          secondary={`@${username}`}
        />
      </ListItem>
    </div>
  );
};

export default FriendList;
