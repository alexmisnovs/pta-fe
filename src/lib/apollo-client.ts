import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL,
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
});

export default apolloClient;
