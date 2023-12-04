import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $first_name: String!
    $last_name: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      first_name: $first_name
      last_name: $last_name
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($universityId: ID!, $commentText: String!) {
    addComment(universityId: $universityId, commentText: $commentText) {
      _id
      university_name

      comments {
        commentText
        username
        _id
      }
    }
  }
`;

export const ADD_UPVOTE = gql`
  mutation addUpvote($universityId: ID!) {
    addUpvote(universityId: $universityId) {
      _id
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($friendId: ID!) {
    addFriend(friendId: $friendId) {
      username
      _id
      first_name
      last_name
    }
  }
`;
export const UPDATE_MAJOR = gql`
  mutation UpdateUserMajor($majorName: String!) {
    updateUserMajor(major_name: $majorName) {
      username
      major {
        major_name
      }
    }
  }
`;
