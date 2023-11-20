import React, { useEffect, useState } from "react";
import { QUERY_USER, QUERY_OTHER_USER } from "../../utils/queries";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  Button,
  Container,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import "./index.css";

const UserProfile = () => {
  //getting url parameter
  const { username: userParam } = useParams();
  console.log(userParam);
  const { loading, data, refetch } = useQuery(
    userParam ? QUERY_OTHER_USER : QUERY_USER,
    {
      variables: { username: userParam },
    }
  );
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(data?.user || data?.otherUser || {});
    console.log(data);
  }, [data]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      sx={{ maxWidth: "1500px", backgroundColor: "#f2f5f5", mb: "40px" }}
      maxWidth={false}
    >
      <div className="dets-reverse">
        <div className="upper-profile">
          <div
            style={{
              width: "40%",
              m: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                width: "100%",
                m: 3,
                borderRadius: "5%",
                boxShadow: "-15px 15px #1f6150 ",
                height: 350,
                // mt: "7%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <AccountCircleSharpIcon
                sx={{ fontSize: "150px", color: "var(--primary)" }}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  pb={"30px"}
                  color={"#1f6150"}
                >
                  {`${user.first_name} ${user.last_name}`}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontSize={"5mm"}
                >
                  {`@${user.username}`}
                </Typography>
              </CardContent>
            </Card>
            {userParam ? (
              <Button variant="contained">Add friend</Button>
            ) : (
              <></>
            )}
          </div>
          {user.university ? (
            <Card
              sx={{
                width: "50%",
                m: 2,
                p: 2,
                borderRadius: "5%",
                boxShadow: "-15px 15px #1f6150 ",
                height: 400,
                // mt: "7%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <div className="profile-items">
                <div className="profile-item">
                  <div className="profile-title">
                    <SchoolIcon
                      sx={{
                        fontSize: "30px",
                        color: "var(--primary)",
                        m: "10px",
                        backgroundColor: "var(--secondary)",
                        p: 1,
                        borderRadius: 8,
                      }}
                    />
                    <h2>University</h2>
                  </div>
                  <p style={{ marginLeft: "100px", fontStyle: "bold" }}>
                    {user.university.university_name}
                  </p>
                </div>
                <div className="profile-item">
                  <div className="profile-title">
                    <AccountBalanceIcon
                      sx={{
                        fontSize: "30px",
                        color: "var(--primary)",
                        m: "10px",
                        backgroundColor: "var(--secondary)",
                        p: 1,
                        borderRadius: 8,
                      }}
                    />
                    <h2>Major</h2>
                  </div>
                  <p style={{ marginLeft: "100px", fontStyle: "bold" }}>
                    {user.major
                      ? user.major.major_name
                      : `Have not decalred a major.`}
                  </p>
                </div>
                <div className="profile-item">
                  <div className="profile-title">
                    <PeopleIcon
                      sx={{
                        fontSize: "30px",
                        color: "var(--primary)",
                        m: "10px",
                        backgroundColor: "var(--secondary)",
                        p: 1,
                        borderRadius: 8,
                      }}
                    />
                    <h2>Friends List</h2>
                  </div>
                  <p style={{ marginLeft: "100px", fontStyle: "bold" }}>
                    Expand Friends List
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            <p>Loading</p>
          )}
        </div>
        <div className="lower-profile">Lower Box</div>
      </div>
    </Container>
  );
};

export default UserProfile;
