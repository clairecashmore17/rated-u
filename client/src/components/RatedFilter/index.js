import React, { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Button, Container } from "@mui/material";
import UniversityList from "../UniversityList";
import { QUERY_UNIVERSITIES_BY_MAJOR } from "../../utils/queries";
import "./index.css";
import { useQuery } from "@apollo/client";

const RatedFilter = () => {
  const [viewHighest, setViewHighest] = useState(true);
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
  const handleMajorChoice = (event) => {
    const { name, value } = event.target;
    setMajor(name);

    setChosen((oldArray) => [...oldArray, name]);
    setDisabled(true);
    setDisabledRate(false);
  };

  const handleFilterChoice = (event) => {
    const { name, value } = event.target;
    // console.log(name);
    setChosenFilter((oldArray) => [...oldArray, name]);
    setDisabledRate(true);

    if (name === "Highest Likes") {
      setViewHighest(true);
      console.log("You want to view the " + viewHighest);
    } else if (name === "Lowest Likes") {
      // setViewHighest(false);
    } else {
      console.log("You dont want to view by likes");
    }
    const sortData = [...data.universityByMajor];
    const sortedData = sortData.sort((a, b) => {
      console.log(a);
      if (viewHighest) {
        console.log("sort");
        return b.upvoteCount - a.upvoteCount;
      } else {
        return a.upvoteCount - b.upvoteCount;
      }
    });
    console.log("set data");
    setOrderedData(sortedData);
    console.log(`DATA: ${JSON.stringify(sortedData)}`);
  };

  const handleChosenRemove = (event) => {
    setChosen(chosenMajor.splice(0, 0));
    // console.log(chosenMajor);
    setDisabled(false);
    setDisabledRate(true);
  };
  const handleFilterRemove = (event) => {
    setChosenFilter(chosenMajor.splice(0, 0));
    // console.log(chosenMajor);
    setDisabledRate(false);
    // setViewHighest(false);
  };

  const major_types = [
    "Electrical Engineering",
    "Computer Engineering",
    "Cyber Security",
    "Major A",
    "Major B",
    "Major C",
  ];
  const filter_types = ["Highest Likes", "Lowest Likes"];

  return (
    <Container
      sx={{ maxWidth: "1500px", backgroundColor: "#f2f5f5" }}
      maxWidth={false}
    >
      <div className="dets">
        <div className="home-box filter">
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
                    minWidth: "40%",
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
                    minWidth: "40%",
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
              <div className="home-box ">
                <UniversityList
                  key={university._id}
                  index={university.upvoteCount}
                  _id={university._id}
                  university_name={university.university_name}
                  university_img={university.university_image}
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
                  <div className="home-box ">
                    <UniversityList
                      key={university._id}
                      index={university.upvoteCount}
                      _id={university._id}
                      university_name={university.university_name}
                      university_img={university.university_image}
                      upvotes={university.upvoteCount}
                    />
                  </div>
                ))}
              </>
            ) : (
              <p>loading</p>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default RatedFilter;
