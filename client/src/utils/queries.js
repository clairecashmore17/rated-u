import { gql } from "@apollo/client";

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
