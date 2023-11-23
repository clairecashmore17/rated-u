import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user {
    user {
      _id
      email
      first_name
      last_name
      major {
        major_name
      }
      friends {
        _id
        username
        first_name
        last_name
      }
      university {
        university_name
      }
      username
      upvotes {
        university_name
        university_image
      }
    }
  }
`;

export const QUERY_OTHER_USER = gql`
  query otherUser($username: String!) {
    otherUser(username: $username) {
      _id
      email
      first_name
      last_name
      major {
        major_name
      }
      friends {
        _id

        username
        first_name
        last_name
      }
      university {
        university_name
      }
      username
      upvotes {
        university_name
        university_image
      }
    }
  }
`;

export const QUERY_UNIVERSITIES_BY_MAJOR = gql`
  query getUniversitiesByMajor($majorName: String) {
    universityByMajor(majorName: $majorName) {
      _id
      university_name
      university_image
      description
      upvoteCount
    }
  }
`;

export const QUERY_UNIVERSITY = gql`
  query University($universityName: String) {
    university(universityName: $universityName) {
      _id
      university_name
      majors {
        major_name
      }
      university_image
      upvoteCount
      commentCount
      comments {
        commentText
        username
        createdAt
      }
      description
    }
  }
`;

export const QUERY_MAJORS = gql`
  query Majors {
    majors {
      major_name
      description
    }
  }
`;
