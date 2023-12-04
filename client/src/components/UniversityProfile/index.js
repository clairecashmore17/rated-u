import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_UNIVERSITY } from "../../utils/queries";
import { ADD_COMMENT, ADD_UPVOTE } from "../../utils/mutations";
import { useParams } from "react-router-dom";
import UniversityList from "../UniversityList";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import {
  Container,
  Button,
  TextField,
  Card,
  CardMedia,
  IconButton,
  Alert,
  Stack,
} from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import "./index.css";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  margin-left: 15px;
  };


`
);

const UniversityProfile = () => {
  // Set states to handle user inputs, mutations, and queries.
  const [commentText, setComment] = useState("");
  const [addComment, { error }] = useMutation(ADD_COMMENT);
  const [addUpvote, { error: upvoteError }] = useMutation(ADD_UPVOTE);
  // grab the string from the URL (the university name)
  const { universityName: userParam } = useParams();
  // Toggle validation alerts
  const [showAlert, setShowAlert] = useState(false);
  // Query the information of the university
  const { loading, data, refetch } = useQuery(QUERY_UNIVERSITY, {
    variables: { universityName: userParam },
  });

  // Get the university ID to handle in the comment
  const universityId = data?.university?._id;

  // console.log(data);

  // Handle input from the comment text area
  const handleChange = (event) => {
    // set comment length
    if (event.target.value.length <= 280) {
      setComment(event.target.value);
    }
  };

  // handle the submit comment text
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // if there is a queried university with data
    if (data) {
      try {
        // Perform addComment mutation
        await addComment({
          variables: { commentText, universityId },
        });

        //clear the form
        setComment("");
        // setCharacterCount(0);
      } catch (e) {
        console.error(e);
      }
    }
    setComment("");
  };

  // Handling Upvote from user
  const handleUpvote = async (event) => {
    // console.log("upvote!");
    try {
      await addUpvote({
        variables: { universityId },
      });
      await refetch(QUERY_UNIVERSITY, {
        variables: { universityName: userParam },
      });
    } catch (e) {
      console.log(e);
      setShowAlert(true);
    }
  };

  return (
    <Container
      sx={{ maxWidth: "1500px", backgroundColor: "#f2f5f5", mb: "40px" }}
      maxWidth={false}
    >
      {data ? (
        <div>
          <div className="uni-container ">
            <Card
              sx={{
                width: "50%",
                m: 2,
                borderRadius: "5%",
                boxShadow: "-15px 15px #1f6150 ",
                height: 500,
              }}
            >
              <CardMedia
                sx={{ height: "100%" }}
                image={`/images/${data.university.university_image}`}
                title={`${data.university.university_name} image`}
              />
            </Card>
            <Card
              sx={{
                width: "50%",
                m: 2,
                borderRadius: "5%",
                boxShadow: "-15px 15px #1f6150 ",
                height: 500,
                // mt: "7%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <h1 className="uni-title">{data.university.university_name}</h1>
              {showAlert ? (
                <Stack>
                  <Alert severity="error" onClose={() => setShowAlert(false)}>
                    {upvoteError.toString()}
                  </Alert>
                </Stack>
              ) : (
                <></>
              )}{" "}
              <p className="uni-description">{data.university.description}</p>
              <div className="likes">
                <IconButton
                  size="small"
                  sx={{
                    m: 2,
                  }}
                  onClick={handleUpvote}
                  // disabled={!Auth.loggedIn}
                >
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
                </IconButton>

                <p className="numbers">{`( ${data.university.upvoteCount} )`}</p>
              </div>
            </Card>
          </div>
          <div className="comment-section ">
            <h1 style={{ paddingLeft: "15px" }}>
              Comments ({data.university.commentCount})
            </h1>

            <div className="add-comment">
              <TextareaAutosize
                id="commentText"
                name="commentText"
                label="Add a comment"
                onChange={handleChange}
              />
              {Auth.loggedIn() ? (
                <Button
                  variant="contained"
                  sx={{
                    width: "150px",
                    margin: 2,
                    backgroundColor: "#1f6150",
                    color: "white",
                    display: "block",
                    ":hover": {
                      bgcolor: "#8ee5f5",
                      color: "black",
                    },
                  }}
                  disabled={!commentText}
                  onClick={handleFormSubmit}
                >
                  Comment
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    width: "150px",
                    margin: 2,
                    backgroundColor: "#1f6150",
                    color: "white",
                    display: "block",
                    ":hover": {
                      bgcolor: "#8ee5f5",
                      color: "black",
                    },
                  }}
                  disabled={true}
                  onClick={handleFormSubmit}
                >
                  Login to make a comment
                </Button>
              )}{" "}
            </div>
            {data.university.comments != 0 ? (
              <div className="dets">
                {data.university.comments.map((comment, index) => (
                  <div className="comment ">
                    <Link
                      to={`/profile/${comment.username}`}
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      {" "}
                      <div className="account">
                        <AccountCircleSharpIcon
                          sx={{
                            fontSize: "50px",
                            ":hover": {
                              color: "var(--primary)",
                            },
                          }}
                        />
                        <p>@{comment.username}</p>
                      </div>
                    </Link>
                    <div className="comment-text">
                      <p className="c-text">{comment.commentText}</p>
                    </div>
                    <p className="date">{comment.createdAt}</p>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p>No comments for {data.university.university_name} yet...</p>
              </>
            )}
          </div>
        </div>
      ) : (
        <div>loading</div>
      )}
    </Container>
  );
};

export default UniversityProfile;
