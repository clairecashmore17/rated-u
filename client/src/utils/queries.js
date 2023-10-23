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
