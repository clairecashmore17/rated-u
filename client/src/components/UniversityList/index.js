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
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import { Link } from "react-router-dom";
import "./index.css";
function UniversityList(item) {
  // Break up the passed information in item into the university parts
  const {
    _id,
    university_name,
    university_img,
    upvotes,
    description,
    profile,
  } = item;
  var height = 500;
  var margin = 5;

  return (
    <div className="uni-container ">
      <Card
        sx={{
          width: "50%",
          m: margin,
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
          m: margin,
          borderRadius: "5%",
          boxShadow: "-15px 15px #1f6150 ",
          height: { height },
          // mt: "7%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className="uni-title">
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`/university-profile/${university_name}`}
          >
            {university_name}
          </Link>
        </h1>

        <p className="uni-description">{description}</p>
        <div className="likes">
          <FavoriteSharpIcon
            sx={{
              p: 2,
              fontSize: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "red",
            }}
          />
          <p className="numbers">{`( ${upvotes} )`}</p>
        </div>
      </Card>
    </div>
  );
}

export default UniversityList;
