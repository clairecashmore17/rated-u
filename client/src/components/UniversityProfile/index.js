import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_UNIVERSITY } from "../../utils/queries";
import { ADD_COMMENT } from "../../utils/mutations";
import { useParams } from "react-router-dom";
import UniversityList from "../UniversityList";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { Button, TextField } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import "./index.css";
import Auth from "../../utils/auth";
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
  const [commentText, setComment] = useState("");
  const [addComment, { error }] = useMutation(ADD_COMMENT);
  const { universityName: userParam } = useParams();
  console.log(userParam);
  const uni_name = "The George Washington University";
  const { loading, data } = useQuery(QUERY_UNIVERSITY, {
    variables: { universityName: userParam },
  });
  if (data) {
    const uni_data = data.university;
    // console.log("DATE IS" + data.university.comments[0].createdAt);
  }
  const universityId = data?.university?._id;
  const handleChange = (event) => {
    console.log("in handleChange");
    if (event.target.value.length <= 280) {
      setComment(event.target.value);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (data) {
      try {
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
  };

  return (
    <div>
      {data ? (
        <div>
          {" "}
          <UniversityList
            key={data.university._id}
            index={data.university.upvoteCount}
            _id={data.university._id}
            university_name={data.university.university_name}
            university_img={data.university.university_image}
            description={data.university.description}
            upvotes={data.university.upvoteCount}
          />
          <div className="comment-section ">
            <h1 style={{ paddingLeft: "15px" }}>
              Comments ({data.university.commentCount})
            </h1>
            {Auth.loggedIn() ? (
              <div className="add-comment">
                <TextareaAutosize
                  id="commentText"
                  name="commentText"
                  label="Add a comment"
                  onChange={handleChange}
                />
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
                  onClick={handleFormSubmit}
                >
                  Comment
                </Button>
              </div>
            ) : (
              <div>Login to add a comment</div>
            )}
            {data.university.comments != 0 ? (
              <div className="dets">
                {data.university.comments.map((comment, index) => (
                  <div className="comment ">
                    <div className="account">
                      <AccountCircleSharpIcon sx={{ fontSize: "50px" }} />
                      <p>@{comment.username}</p>
                    </div>
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
    </div>
  );
};

export default UniversityProfile;
