import Link from "next/link";
import apolloClient from "@/lib/apollo-client";
import { EventListDocument } from "@/gql/graphql";
import Image from "next/image";
export default async function Page() {
  const { data } = await apolloClient.query({
    query: EventListDocument,
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    },
    // variables: {
    //   slug: "pta-school-disco",
    // },
  });
  const events = data.events;
  // console.log(data.events);
  // return <h1>Events will go here</h1>;

  return (
    <div className="container">
      <h1 className="text-4xl mb-6 text-center font-bold text-gray-700">PTA Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {events.map(event => {
          if (!event) return null;
          // if (!event?.cover?.url) return null;
          return (
            <Link
              className="group grid grid-cols-[140px_1fr] bg-white shadow rounded-lg overflow-hidden relative hover:bg-gradient-to-r from-white to-amber-50"
              key={event.slug}
              href={`/news/${event.slug}`}
            >
              <div className="relative overflow-hidden">
                {event.featuredImage?.url && (
                  <Image
                    className="transition duration-300 absolute inset-0 h-full w-full object-cover group-hover:scale-125 group-hover:rotate-12"
                    src={event.featuredImage?.url ?? "default-image.jpg"}
                    alt={event.heading ?? "Event Image"}
                    width={event.featuredImage?.formats?.medium?.width ?? 0}
                    height={event.featuredImage?.formats?.medium?.height ?? 0}
                  />
                )}
              </div>

              <div className="p-4">
                <p className="text-xl text-gray-600 font-bold group-hover:text-gray-700">
                  {event.heading}
                </p>
                <p className="text-sm text-gray-500 leading-6">{event.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
