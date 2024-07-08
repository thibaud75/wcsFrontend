import React from "react";
import { useQuery } from "@apollo/client";
import { GET_COUNTRY_INFORMATIONS } from "@/requests/queries/queries";
import { useRouter } from "next/router";

const CountryInformations: React.FC = () => {
  const router = useRouter();
  const { code } = router.query;

  const { loading, error, data } = useQuery(GET_COUNTRY_INFORMATIONS, {
    variables: { code },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const { name, emoji, continent } = data.country;

  return (
    <div>
      <h1>{name}</h1>
      <p>Code: {code}</p>
      <p>Emoji: {emoji}</p>
      {continent && <p>Continent: {continent.name}</p>}
    </div>
  );
};

export default CountryInformations;
