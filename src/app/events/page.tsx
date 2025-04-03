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
      <h1 className="text-4xl mb-6 text-center font-bold text-gray-700 pt-6">PTA Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {events.map(event => {
          if (!event) return null;
          return (
            <Link
              className="group flex flex-col bg-white shadow rounded-lg overflow-hidden relative hover:bg-gradient-to-r from-white to-amber-50"
              key={event.slug}
              href={`/events/${event.slug}`}
            >
              <div className="relative overflow-hidden h-[200px]">
                {event.featuredImage?.url && (
                  <Image
                    className="transition duration-300 object-cover group-hover:scale-125 group-hover:rotate-12"
                    src={event.featuredImage?.url ?? "default-image.jpg"}
                    alt={event.heading ?? "Event Image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={false}
                  />
                )}
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                  <span>Event</span>
                  <div className="text-right">
                    <div>
                      {new Date(event.dateTime).toLocaleDateString("en-GB", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </div>
                    <div>
                      {new Date(event.dateTime).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl text-gray-600 font-bold group-hover:text-gray-700 mb-2">
                  {event.heading}
                </h3>
                <p className="text-sm text-gray-500 leading-6 mb-4">{event.description}</p>

                <div className="mt-auto flex flex-col">
                  <span className="text-sm text-gray-500 mb-3">Location: Saint Modwens School</span>
                  <div className="flex justify-center">
                    <button className="btn bg-custom-red hover:bg-custom-blue text-white font-bold py-2 px-4 rounded border-0">
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
