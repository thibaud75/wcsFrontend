import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CONTINENTS, GET_COUNTRIES } from "@/requests/queries/queries";
import { ADD_COUNTRY } from "@/requests/mutations/mutations";

// Interface pour les données des pays
interface CountriesData {
  countries: {
    id: number;
    name: string;
    code: string;
    emoji: string;
    continent: {
      name: string;
    } | null;
  }[];
}

const AddCountry: React.FC = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [emoji, setEmoji] = useState("");
  const [continentId, setContinentId] = useState("");

  const { loading: continentsLoading, error: continentsError, data: continentsData } = useQuery(GET_CONTINENTS);

  const [addCountry, { loading, error }] = useMutation(ADD_COUNTRY, {
    update(cache, { data: { addCountry } }) {
      const { countries }: CountriesData = cache.readQuery({ query: GET_COUNTRIES }) || { countries: [] };
      cache.writeQuery({
        query: GET_COUNTRIES,
        data: { countries: countries.concat([addCountry]) },
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCountry({ variables: { name, code, emoji, continentId } });
      setName("");
      setCode("");
      setEmoji("");
      setContinentId("");
    } catch (error) {
      console.error("Error adding country:", error);
    }
  };

  if (continentsLoading) return <p>Loading continents...</p>;
  if (continentsError) return <p>Error loading continents: {continentsError.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="code">Code:</label>
        <input
          type="text"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="emoji">Emoji:</label>
        <input
          type="text"
          id="emoji"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="continent">Continent:</label>
        <select
          id="continent"
          value={continentId}
          onChange={(e) => setContinentId(e.target.value)}
        >
          <option value="">Select a continent</option>
          {continentsData.continents.map((continent: any) => (
            <option key={continent.id} value={continent.id}>
              {continent.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={loading}>
        Add Country
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default AddCountry;
