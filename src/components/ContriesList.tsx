"use client";

import { useQuery } from "@apollo/client";
import { CountriesDocument } from "@/gql/graphql";

export default function CountriesList() {
  const { data, loading, error } = useQuery(CountriesDocument);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data?.countries?.map(country => (
        <li key={country.code}>
          {country.emoji} {country.name} ({country.code})
        </li>
      ))}
    </ul>
  );
}
