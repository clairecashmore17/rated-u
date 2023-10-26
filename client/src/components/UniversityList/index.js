import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import "./index.css";
function UniversityList(item) {
  const {
    _id,
    university_name,
    university_img,
    upvotes,
    description,
    profile,
  } = item;
  var height = 300;
  if (profile) {
    height = 500;
  }
  // console.log(description);
  // console.log(university_name);
  return (
    <div className="uni-container dets">
      <Card
        sx={{
          width: "50%",
          m: 5,
          borderRadius: "5%",
          boxShadow: "-15px 15px #1f6150 ",
          height: { height },
          maxHeight: 500,
          // mt: "7%",
        }}
      >
        <CardMedia
          sx={{ height: "100%" }}
          image={`/images/${university_img}`}
          title={`${university_name} image`}
        />
      </Card>
      <Card
        sx={{
          width: "50%",
          m: 5,
          borderRadius: "5%",
          boxShadow: "-15px 15px #1f6150 ",
          height: { height },
          // mt: "7%",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {university_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Number of likes: ${upvotes}`}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default UniversityList;
