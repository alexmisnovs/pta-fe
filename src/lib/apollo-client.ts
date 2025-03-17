// lib/client.js
// import { HttpLink, InMemoryCache, ApolloClient } from "@apollo/client";
// import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

// export const { getClient } = registerApolloClient(() => {
//   return new ApolloClient({
//     cache: new InMemoryCache(),
//     link: new HttpLink({
//       uri: process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL,
//     }),
//     ssrMode: typeof window === "undefined",
//   });
// });

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL,
    fetchOptions: {
      next: { revalidate: 60 },
    },
  }),
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
});

export default apolloClient;
