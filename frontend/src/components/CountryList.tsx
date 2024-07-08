import React from "react";
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "@/requests/queries/queries";
import Link from "next/link";
import AddCountry from "@/components/AddCountry";

type Country = {
  name: string,
  emoji: string,
  code: string,
}

const CountryList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <h1>Liste des pays</h1>
      <ul>
        {data.countries.map((country: Country) => (
          <li key={country.code}>
            <Link href={`/country/${country.code}`}>
              {country.name} {country.emoji}
            </Link>
          </li>
        ))}
      </ul>
      <AddCountry />
    </div>
  );
};

export default CountryList;
