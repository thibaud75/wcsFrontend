import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
      emoji
      code
    }
  }
`;

export const GET_COUNTRY_INFORMATIONS = gql`
  query GetCountryDetails($code: String!) {
    country(code: $code) {
      name
      code
      emoji
      continent {
        name
      }
    }
  }
`;

export const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      id
      name
    }
  }
`;
