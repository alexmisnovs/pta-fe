import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  // schema: "YOUR_GRAPHQL_ENDPOINT", // e.g. https://countries.trevorblades.com/
  schema: "https://countries.trevorblades.com/", // e.g.
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
