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
  });

  // Sort events by date (newest first) Potentially add filter to gql query later
  const events = [...data.events].sort((a, b) => {
    if (!a || !b) return 0;
    return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
  });

  return (
    <div className="container mb-10">
      <h1 className="text-4xl mb-6 text-center font-bold text-gray-700 pt-6">PTA Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {events.map(event => {
          if (!event) return null;

          // Check if event is in the past
          const eventDate = new Date(event.dateTime);
          const isPastEvent = eventDate < new Date();

          return (
            <Link
              className={`group flex flex-col shadow rounded-lg overflow-hidden relative hover:bg-gradient-to-r from-white to-amber-50 ${
                isPastEvent ? "bg-gray-200 opacity-75" : "bg-white"
              }`}
              key={event.slug}
              href={`/events/${event.slug}`}
            >
              <div className="relative overflow-hidden h-[200px]">
                {event.featuredImage?.url && (
                  <Image
                    className={`transition duration-300 object-cover group-hover:scale-125 group-hover:rotate-12 ${
                      isPastEvent ? "grayscale" : ""
                    }`}
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

                <h3
                  className={`text-xl font-bold mb-2 ${
                    isPastEvent ? "text-gray-600" : "text-gray-600 group-hover:text-gray-700"
                  }`}
                >
                  {event.heading}
                  {isPastEvent && (
                    <span className="text-sm font-normal text-gray-500 ml-2">(Past)</span>
                  )}
                </h3>
                <p
                  className={`text-sm leading-6 mb-4 ${
                    isPastEvent ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  {event.description}
                </p>

                <div className="mt-auto flex flex-col">
                  <span className="text-sm text-gray-500 mb-3">Location: Saint Modwens School</span>
                  <div className="flex justify-center">
                    <button
                      className={`btn text-white font-bold py-2 px-4 rounded border-0 ${
                        isPastEvent
                          ? "bg-gray-400 hover:bg-gray-500"
                          : "bg-custom-red hover:bg-custom-blue"
                      }`}
                    >
                      {isPastEvent ? "View Details" : "More Details"}
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
