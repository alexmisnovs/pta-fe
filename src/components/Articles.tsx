"use client";

import { useQuery } from "@apollo/client";
import { ArticlesDocument } from "@/gql/graphql";

export default function Articles() {
  const { data } = useQuery(ArticlesDocument);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  console.log(data);
  return (
    <ul>
      {data?.articles?.map(
        article =>
          article ? (
            <li key={article.slug}>
              {article.title} {article.description} ({article.slug})
            </li>
          ) : null // Skip rendering if article is null
      )}
    </ul>
  );
}
