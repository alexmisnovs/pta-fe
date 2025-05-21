import apolloClient from "@/lib/apollo-client";
import { EventDocument, EventListDocument } from "@/gql/graphql";
import { ApolloError } from "@apollo/client";
import { extractGraphQLErrors } from "@/types/apollo-error";

import Link from "next/link";
import Image from "next/image";
import BlockRenderer from "@/components/utility/BlockRenderer";
import { Block } from "@/types/blocks";

export async function generateStaticParams() {
  try {
    const { data } = await apolloClient.query({
      query: EventListDocument,
      context: {
        fetchOptions: {
          next: { revalidate: 60 },
        },
      },
    });

    const events = data.events;
    return events.map(event => {
      return {
        slug: event?.slug,
      };
    });
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return []; // Return empty array to prevent build failure
  }
}

type Params = Promise<{ slug: string }>;

export default async function Page({ params }: { params: Params }) {
  try {
    const { slug } = await params;

    console.log("Fetching event with slug:", slug);

    const { data } = await apolloClient.query({
      query: EventDocument,
      variables: {
        slug: slug,
      },
      context: {
        fetchOptions: {
          next: { revalidate: 60 },
        },
      },
    });

    const event = data.events[0];

    if (!event) {
      return (
        <div className="container py-10 text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Event Not Found</h1>
          <p className="mb-6">The event youre looking for doesnt exist or has been removed.</p>
          <Link
            href="/events"
            className="bg-custom-blue text-white px-4 py-2 rounded hover:bg-custom-red"
          >
            Browse All Events
          </Link>
        </div>
      );
    }

    // Process blocks as before
    const processedBlocks = event?.blocks?.map(block => ({
      __typename: block?.__typename,
      ...block,
    })) as Block[];

    return (
      <div className="bg-white px-8 pb-10">
        <div className="text-white relative bg-custom-blue px-14 py-16 -mx-8 -mt-7">
          <h2 className="text-4xl font-bold relative z-30">{event.heading}</h2>

          {event?.featuredImage?.url && (
            <Image
              className="object-cover absolute top-0 bottom-0 left-1/2 right-0 block w-1/2 h-full opacity-50 filter grayscale"
              src={event.featuredImage.url}
              alt={event?.heading || "Event featured image"}
              fill
              priority
            />
          )}
          <div className="absolute z-20 w-80 bg-gradient-to-r from-custom-blue to-transparent h-full top-0 bottom-0 left-1/2"></div>
        </div>

        <div className="transform -translate-y-1/2">
          <Link
            href="/events"
            className="text-sm bg-custom-red text-white hover:bg-custom-blue hover:text-white inline-block rounded-lg py-3 px-5"
          >
            &laquo; Back to events
          </Link>
        </div>

        {/* Event Date Display */}
        {event.dateTime && (
          <div className="mb-8 text-center">
            <div className="inline-block bg-gray-100 rounded-lg px-6 py-3 border border-gray-200">
              <p className="text-lg font-semibold text-gray-700">
                <span className="mr-2">📅</span>
                {new Date(event.dateTime).toLocaleDateString("en-GB", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                <span className="mx-2">|</span>
                <span className="text-custom-blue">
                  {new Date(event.dateTime).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </p>
            </div>
          </div>
        )}

        <div className="container">
          <BlockRenderer blocks={processedBlocks ?? []} className="space-y-8 " />
        </div>
      </div>
    );

    // Return error UI with more detailed information
  } catch (error) {
    console.error("Error in event page:");
    // Extract GraphQL errors using our helper function
    const graphqlErrors = extractGraphQLErrors(error);

    // Log detailed error information
    if (graphqlErrors.length > 0) {
      console.error("GraphQL Error Details:");
      graphqlErrors.forEach((err, index) => {
        console.error(`Error ${index + 1}:`, err.message);
        if (err.locations) console.error("Locations:", err.locations);
        if (err.extensions) console.error("Extensions:", err.extensions);
      });
    }

    // If it's an ApolloError, try to access networkError details
    if (error instanceof ApolloError && error.networkError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const networkError = error.networkError as any;
      console.error("Network Error Status:", networkError.statusCode);

      // Try to access the result property
      if (networkError.result) {
        console.error("Network Error Result:", networkError.result);
      }
    }

    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Event</h1>
        <p className="mb-4">We encountered an error while loading this event.</p>
        <div className="bg-gray-100 p-4 rounded text-left mb-6 max-w-2xl mx-auto">
          <p className="font-semibold">
            Error Type: {error instanceof Error ? error.name : "Unknown"}
          </p>
          <p className="text-red-600">{error instanceof Error ? error.message : "Unknown error"}</p>

          {graphqlErrors.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold">GraphQL Errors:</p>
              <ul className="list-disc pl-5">
                {graphqlErrors.map((err, index) => (
                  <li key={index} className="mt-2">
                    {err.message}
                    {err.path && (
                      <p className="text-sm text-gray-600">Path: {err.path.join(".")}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <Link
          href="/events"
          className="bg-custom-blue text-white px-4 py-2 rounded hover:bg-custom-red"
        >
          Return to Events
        </Link>
      </div>
    );
  }
}
