import React, { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Button, Container } from "@mui/material";
import UniversityList from "../UniversityList";
import { QUERY_UNIVERSITIES_BY_MAJOR } from "../../utils/queries";
import "./index.css";
import { useQuery } from "@apollo/client";
const RatedFilter = () => {
  const [filter, setFilter] = useState("");
  const [chosen, setChosen] = useState(["clear"]);
  const [disabled, setDisabled] = useState(false);
  // console.log(chosen);
  const { loading, data } = useQuery(QUERY_UNIVERSITIES_BY_MAJOR, {
    variables: { majorName: filter },
  });

  // if (data) {
  //   console.log(JSON.stringify(data.universityByMajor[0].university_name));
  // }
  const handleFilterChoice = (event) => {
    const { name, value } = event.target;
    setFilter(name);

    setChosen((oldArray) => [...oldArray, name]);
    setDisabled(true);
  };

  const handleChosenRemove = (event) => {
    const { name, value } = event.target;
    setChosen(chosen.splice(0, 1));
    // console.log(chosen);
    setDisabled(false);
  };

  const buttons = [
    "Electrical Engineering",
    "Computer Engineering",
    "Cyber Security",
    "filter 4",
    "filter 5",
    "filter 6",
  ];
  const filters = [];
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
            {buttons.map((button) => (
              <Button
                variant="contained"
                key={button}
                name={button}
                disabled={disabled}
                sx={{
                  backgroundColor: "var(--secondary)",
                  color: "var(--primary)",
                  fontWeight: "bold",
                  height: "40px",
                  width: "20%",
                  p: "10px",
                  m: "15px",
                  ":hover": {
                    bgcolor: "#8ee5f5",
                    color: "black",
                  },
                }}
                onClick={handleFilterChoice}
              >
                {button}
              </Button>
            ))}
          </div>
          <div className="search-filter">
            <div className="chosen-filters">
              {chosen ? (
                <>
                  {chosen.map((choice) => (
                    <Button
                      key={choice}
                      name={choice}
                      variant="contained"
                      sx={{
                        backgroundColor: "var(--secondary)",
                        color: "var(--primary)",
                        height: "40px",
                        width: "15%",
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
            </div>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "var(--primary)",
                color: "var(--secondary)",
                height: "40px",
                width: "20%",
              }}
            >
              Search
            </Button>
          </div>
        </div>

        {data ? (
          <>
            {data.universityByMajor.map((university) => (
              <div className="home-box ">
                <UniversityList
                  key={university._id}
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
      </div>
    </Container>
  );
};

export default RatedFilter;
