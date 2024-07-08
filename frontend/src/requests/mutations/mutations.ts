import { gql } from "@apollo/client";

export const ADD_COUNTRY = gql`
  mutation AddCountry($name: String!, $code: String!, $emoji: String!, $continentId: ID) {
    addCountry(data: { name: $name, code: $code, emoji: $emoji, continent: $continentId }) {
      id
      name
      code
      emoji
      continent {
        name
      }
    }
  }
`;
