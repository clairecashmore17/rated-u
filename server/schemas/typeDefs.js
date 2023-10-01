const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Auth {
    token: ID
    user: User
  }
  type Major {
    _id: ID
    major_name: String
    description: String
  }
  type University {
    _id: ID
    university_name: String
    university_image: String
    majors: [Major]
    comments: [Comment]
    upvotes: [Upvote]
  }
  type Upvote {
    _id: ID
    userId: ID
  }
  type Comment {
    _id: ID
    universityId: ID
    commentText: String
    username: String
  }
  type User {
    _id: ID
    username: String
    first_name: String
    last_name: String
    email: String
    university: University
    major: Major
    friends: [User]
  }
  type Query {
    user: User
    users: [User]
  }
  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      first_name: String!
      last_name: String!
      university: ID
      major: ID
    ): Auth

    login(email: String!, password: String!): Auth

    addFriend(friendId: ID!): User
    deleteFriend(friendId: ID!): User
  }
`;

module.exports = typeDefs;
