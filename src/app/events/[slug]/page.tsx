import apolloClient from "@/lib/apollo-client";
import { EventDocument, EventListDocument } from "@/gql/graphql";

import Link from "next/link";
import Image from "next/image";
import BlockRenderer from "@/components/utility/BlockRenderer";
import { Block } from "@/types/blocks";

export async function generateStaticParams() {
  const { data } = await apolloClient.query({
    query: EventListDocument,
    context: {
      // initialApolloState,
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
}

// type EventParams = {
//   params: {
//     slug: string;
//   };
// };
type Params = Promise<{ slug: string }>;

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;

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

  if (!event) return <h1>Event not found</h1>;
  // console.log(event);

  const processedBlocks = event?.blocks?.map(block => ({
    __typename: block?.__typename, // Ensure this exists in response
    ...block,
  })) as Block[]; // Type assertion here if needed

  return (
    <div className="bg-white px-8 pb-10">
      <div className="text-white relative bg-custom-blue px-14 py-16 -mx-8 -mt-7">
        <h2 className="text-4xl font-bold relative z-30">{event.heading}</h2>

        <Image
          className="object-cover absolute top-0 bottom-0 left-1/2 right-0 block w-1/2 h-full opacity-50 filter grayscale"
          src={event?.featuredImage?.url as string}
          alt={event?.heading || "Event featured image"}
          fill
          priority
        />
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
}
