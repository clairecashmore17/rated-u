import React, { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  Button,
  Container,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import UniversityList from "../UniversityList";
import { QUERY_UNIVERSITIES_BY_MAJOR } from "../../utils/queries";
import "./index.css";
import { useQuery } from "@apollo/client";

const RatedFilter = () => {
  const [major, setMajor] = useState("");
  const [chosenMajor, setChosen] = useState([]);
  const [chosenFilter, setChosenFilter] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [disabledRate, setDisabledRate] = useState(true);
  const [orderedData, setOrderedData] = useState();
  // console.log(chosenMajor);
  const { loading, data } = useQuery(QUERY_UNIVERSITIES_BY_MAJOR, {
    variables: { majorName: major },
  });

  if (data) {
    console.log(JSON.stringify(data.universityByMajor));
  }

  // Handle when a major is chosen
  const handleMajorChoice = (event) => {
    const { name, value } = event.target;
    // pass this into our query
    setMajor(name);
    // Add to chosen item array
    setChosen((oldArray) => [...oldArray, name]);
    // Disable this section (only want to choose one major to search by)
    setDisabled(true);
    // allow user to view by rating
    setDisabledRate(false);
  };

  // Handle the rating filters
  const handleFilterChoice = (event) => {
    const { name, value } = event.target;
    // adding filter to array of chosen items
    setChosenFilter((oldArray) => [...oldArray, name]);

    // Disable these filters (can only choose one at a time)
    setDisabledRate(true);

    // Creating an temp array of our requested universities by major data.
    const sortData = [...data.universityByMajor];

    // Go through all filter choices
    switch (name) {
      case "Highest Likes":
        // Sorting data on highest vote.
        const sortHighLow = sortData.sort((a, b) => {
          console.log(a);

          return b.upvoteCount - a.upvoteCount;
        });

        setOrderedData(sortHighLow);

        break;
      case "Lowest Likes":
        // Sorting data on lowest vote.
        const sortLowHigh = sortData.sort((a, b) => {
          console.log(a);

          return a.upvoteCount - b.upvoteCount;
        });

        setOrderedData(sortLowHigh);

        break;
      default:
        break;
    }
  };

  // Remove the chosen major items if a user clicks on them
  const handleChosenRemove = (event) => {
    setChosen(chosenMajor.splice(0, 0));

    setDisabled(false);
    setDisabledRate(true);
  };
  // Remove filter if user clicks
  const handleFilterRemove = (event) => {
    setChosenFilter(chosenMajor.splice(0, 0));

    setDisabledRate(false);
  };

  // Our db's majors types (can pull from query soon)
  const major_types = [
    "Electrical Engineering",
    "Computer Engineering",
    "Cyber Security",
    "Major A",
    "Major B",
    "Major C",
  ];

  // Filter types we provide
  const filter_types = ["Highest Likes", "Lowest Likes"];

  return (
    <Container
      sx={{ maxWidth: "1500px", backgroundColor: "#f2f5f5" }}
      maxWidth={false}
    >
      <div className="dets">
        <div className="home-box-filter filter">
          <h1 className="filter-title">
            What are you looking for from a University?
          </h1>
          <p className="filter-sub-text">Select your filters here</p>
          <div className="filters">
            <div className="sectioned-filters">
              {major_types.map((major) => (
                <Button
                  variant="contained"
                  key={major}
                  name={major}
                  disabled={disabled}
                  sx={{
                    backgroundColor: "var(--secondary)",
                    color: "var(--primary)",
                    fontWeight: "bold",
                    fontSize: "3mm",
                    height: "40px",
                    width: "auto",
                    p: "10px",
                    m: "15px",
                    ":hover": {
                      bgcolor: "#8ee5f5",
                      color: "black",
                    },
                  }}
                  onClick={handleMajorChoice}
                >
                  {major}
                </Button>
              ))}
            </div>
            <div className="sectioned-filters">
              {filter_types.map((filter) => (
                <Button
                  variant="contained"
                  key={filter}
                  name={filter}
                  disabled={disabledRate}
                  sx={{
                    backgroundColor: "var(--secondary)",
                    color: "var(--primary)",
                    fontWeight: "bold",
                    fontSize: "3mm",
                    height: "40px",
                    width: "auto",
                    p: "10px",
                    m: "15px",
                    ":hover": {
                      bgcolor: "#8ee5f5",
                      color: "black",
                    },
                  }}
                  onClick={handleFilterChoice}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
          <div className="search-filter">
            <div className="chosen-filters">
              {chosenMajor ? (
                <>
                  {chosenMajor.map((choice) => (
                    <Button
                      key={choice}
                      name={choice}
                      variant="contained"
                      sx={{
                        backgroundColor: "var(--secondary)",
                        color: "var(--primary)",
                        height: "40px",
                        width: "20%",
                        fontSize: "3mm",
                        m: 1,
                        boxShadow: "-5px 5px var(--primary)",
                        ":hover": {
                          bgcolor: "#8ee5f5",
                          color: "black",
                        },
                      }}
                      onClick={handleChosenRemove}
                    >
                      {choice}
                    </Button>
                  ))}
                </>
              ) : (
                <></>
              )}
              {chosenFilter ? (
                <>
                  {chosenFilter.map((choice) => (
                    <Button
                      key={choice}
                      name={choice}
                      variant="contained"
                      sx={{
                        backgroundColor: "var(--secondary)",
                        color: "var(--primary)",
                        height: "40px",
                        width: "20%",
                        fontSize: "3mm",
                        m: 1,
                        boxShadow: "-5px 5px var(--primary)",
                        ":hover": {
                          bgcolor: "#8ee5f5",
                          color: "black",
                        },
                      }}
                      onClick={handleFilterRemove}
                    >
                      {choice}
                    </Button>
                  ))}
                </>
              ) : (
                <></>
              )}
            </div>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "var(--primary)",
                color: "var(--secondary)",
                height: "40px",
                width: "20%",
              }}
              onClick={() => {
                window.location.reload();
              }}
            >
              Refresh
            </Button>
          </div>
        </div>
        {orderedData ? (
          <>
            {orderedData.map((university) => (
              <div className="home-box-filter">
                <UniversityList
                  key={university._id}
                  index={university.upvoteCount}
                  _id={university._id}
                  university_name={university.university_name}
                  university_img={university.university_image}
                  description={university.description}
                  upvotes={university.upvoteCount}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            {data ? (
              <>
                {data.universityByMajor.map((university) => (
                  <div className="home-box-filter center-items">
                    <UniversityList
                      key={university._id}
                      index={university.upvoteCount}
                      _id={university._id}
                      university_name={university.university_name}
                      university_img={university.university_image}
                      description={university.description}
                      upvotes={university.upvoteCount}
                    />
                  </div>
                ))}
              </>
            ) : (
              <>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Ready to find the University for you?
                  </Typography>
                  <Typography variant="h5" component="div">
                    Select a filter and view the results below
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Your results will appear here.
                  </Typography>
                </CardContent>
              </>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default RatedFilter;
