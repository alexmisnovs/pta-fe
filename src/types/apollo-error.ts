import { ApolloError } from "@apollo/client";

// Define the structure of GraphQL errors to match GraphQLFormattedError
export interface GraphQLError {
  message: string;
  locations?: ReadonlyArray<{ line: number; column: number }>;
  path?: ReadonlyArray<string | number>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extensions?: Record<string, any>;
}

// Define the structure of network error result
export interface NetworkErrorResult {
  errors?: GraphQLError[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// Define the structure of network error
export interface ExtendedNetworkError extends Error {
  statusCode?: number;
  response?: Response;
  result?: NetworkErrorResult;
  bodyText?: string;
}

// Extend the ApolloError type
export interface ExtendedApolloError extends ApolloError {
  networkError: ExtendedNetworkError | null;
}

// Helper function to safely extract GraphQL errors from an ApolloError
export function extractGraphQLErrors(error: unknown): GraphQLError[] {
  if (!error) return [];

  // If it's an ApolloError, extract GraphQL errors
  if (error instanceof ApolloError) {
    // First check graphQLErrors array
    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
      // Convert readonly array to regular array with spread operator and map to our interface
      return [...error.graphQLErrors].map(err => ({
        message: err.message,
        locations: err.locations ? [...err.locations] : undefined,
        path: err.path ? [...err.path] : undefined,
        extensions: err.extensions,
      }));
    }

    // Then check networkError.result.errors
    if (error.networkError && "result" in error.networkError) {
      const networkError = error.networkError as ExtendedNetworkError;
      if (networkError.result?.errors) {
        return networkError.result.errors;
      }
    }
  }

  // For other types of errors or if no GraphQL errors found
  return [];
}

// Helper function to format error messages for display
export function formatGraphQLErrorMessages(error: unknown): string {
  const errors = extractGraphQLErrors(error);

  if (errors.length === 0) {
    return error instanceof Error ? error.message : "Unknown error";
  }

  return errors.map(err => err.message).join("\n");
}
