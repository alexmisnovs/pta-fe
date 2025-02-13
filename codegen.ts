import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  // schema: "YOUR_GRAPHQL_ENDPOINT", // e.g. https://countries.trevorblades.com/
  schema: "http://localhost:1337/graphql", // e.g.
  documents: ["src/**/*.graphql"],
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
};

export default config;
