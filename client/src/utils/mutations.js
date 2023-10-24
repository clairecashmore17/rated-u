import { gql } from "@apollo/client";

export const ADD_USER = gql `
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
