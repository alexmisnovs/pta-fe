import Link from "next/link";
import apolloClient from "@/lib/apollo-client";
import { EventListDocument } from "@/gql/graphql";

export default async function Page() {
  const { data } = await apolloClient.query({
    query: EventListDocument,
    context: {
      fetchOptions: {
        next: { revalidate: 600 },
      },
    },
    // variables: {
    //   slug: "pta-school-disco",
    // },
  });
  const events = data.events;
  console.log(data.events);
  // return <h1>Events will go here</h1>;

  return (
    <div>
      <h1 className="text-4xl mb-6 font-bold text-gray-700">Our Events</h1>
      <div className="grid grid-cols-2 gap-6">
        {events.map(event => {
          if (!event) return null;
          if (!event?.featuredImage) return null;
          return (
            <Link
              className="group grid grid-cols-[140px_1fr] bg-white shadow rounded-lg overflow-hidden relative hover:bg-gradient-to-r from-white to-amber-50"
              key={event.slug}
              href={`/events/${event.slug}`}
            >
              <div className="relative overflow-hidden">
                <img
                  className="transition duration-300 absolute inset-0 h-full w-full object-cover group-hover:scale-125 group-hover:rotate-12"
                  src={event.featuredImage.url}
                />
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
