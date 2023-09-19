const express = require("express");
//apollo for graphQL?
const path = require("path");

// typedef and resolvers for schema
// authentication w/ middleware
// database

const PORT = process.env.PORT || 3001;
const app = express();

//create apollo server

app.use(express.urlencoded({ exxtended: false }));
app.use(express.json());

//for any static images
app.use("/images", express.static(path.join(__dirname, "../client/images")));

//if in production
if (process.env.NODE.ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build/index.html")));
}

// server receives homepage
app,
  get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

//create a new instance of apollo server with graphql schema here

//call the async function to start new server.
