import apolloClient from "@/lib/apollo-client";
import { EventDocument } from "@/gql/graphql";

import Link from "next/link";
import ReactMarkdown from "react-markdown";

// export async function generateStaticParams() {
//   const membersPromise = await fetch("http://localhost:1337/api/team-members?populate=*");
//   const members = await membersPromise.json();
//   return members.data.map(member => {
//     return {
//       slug: member.slug,
//     };
//   });
// }

type EventParams = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: EventParams) {
  const { data } = await apolloClient.query({
    query: EventDocument,
    variables: {
      slug: params.slug,
    },
  });

  const event = data.events[0];

  if (!event) return <h1>Event not found</h1>;
  console.log(event.blocks);

  // return <h1>Single Event Details going here</h1>;
  // lets build content now
  let markdownContent: string | null | undefined = null;

  interface ImageFile {
    __typename?: string;
    file?: {
      __typename?: string;
      url: string;
      alternativeText?: string | null;
    } | null;
  }
  let imageFile: ImageFile = { file: { url: "" } };

  event?.blocks?.forEach(block => {
    if (block) {
      switch (block.__typename) {
        case "ComponentPtaRichTextMarkdown":
          markdownContent = block.content;

        case "ComponentSharedMedia":
          imageFile = {
            ...block,
          };
          return <h1>I am total donaitons</h1>;
          //  return <CardCarousel {...block} key={index} />;
          break;
        default:
          return <h1>didnt find anything</h1>;
      }
    }
  });
  return (
    <div>
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
          className="text-sm bg-gray-600 text-gray-400 hover:bg-gray-500 hover:text-gray-300 inline-block rounded-lg py-3 px-5"
        >
          &laquo; Back to all events
        </Link>
      </div>
      {markdownContent && <ReactMarkdown className="markdown">{markdownContent}</ReactMarkdown>}
      {imageFile?.file?.url && (
        <img className="" src={imageFile.file.url as string} />
        // <h2>Image will go here</h2>
      )}
      <div>Donations received: {event?.donationReceived}</div>
    </div>
  );
}
