import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "YOUR_GRAPHQL_ENDPOINT",
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
});

export default apolloClient;
