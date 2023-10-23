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
  const { _id, university_name, university_img, upvotes } = item;
  return (
    <div className="uni-container">
      <Card
        sx={{
          minWidth: 500,
          maxWidth: 500,
          m: 5,
          borderRadius: "5%",
          boxShadow: "-15px 15px #1f6150 ",
          height: 400,
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
          minWidth: 500,
          m: 5,
          borderRadius: "5%",
          boxShadow: "-15px 15px #1f6150 ",
          height: 300,
          // mt: "7%",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {university_name}
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
