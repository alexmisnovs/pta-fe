import apolloClient from "@/lib/apollo-client";
import { EventDocument, EventListDocument } from "@/gql/graphql";

import Link from "next/link";
import BlockRenderer, { Block } from "@/components/BlockRenderer";

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
  // console.log(event.blocks);

  const processedBlocks = event?.blocks?.map(block => ({
    __typename: block?.__typename, // Ensure this exists in response
    ...block,
  })) as Block[]; // Type assertion here if needed

  return (
    <div className="container">
      <div className="text-white relative bg-custom-blue px-14 py-16 -mx-8 -mt-7">
        <h2 className="text-6xl font-bold relative z-30">{event.heading}</h2>

        <img
          className="object-cover absolute top-0 bottom-0 left-1/2 right-0 block w-1/2 h-full opacity-50 filter grayscale"
          src={event?.featuredImage?.url as string}
        />
        <div className="absolute z-20 w-80 bg-gradient-to-r from-custom-blue to-transparent h-full top-0 bottom-0 left-1/2"></div>
      </div>

      <div className="transform -translate-y-1/2">
        <Link
          href="/events"
          className="text-sm bg-custom-red text-white hover:bg-custom-blue hover:text-white inline-block rounded-lg py-3 px-5"
        >
          &laquo; Back to all events
        </Link>
      </div>
      <BlockRenderer blocks={processedBlocks ?? []} className="space-y-8" />
      <div>Donations received: {event?.donationReceived}</div>
    </div>
  );
}
