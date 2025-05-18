import apolloClient from "@/lib/apollo-client";
import { HomePageEventsDocument } from "@/gql/graphql";
import Link from "next/link";
import Image from "next/image";

export default async function Events() {
  const { data } = await apolloClient.query({
    query: HomePageEventsDocument,
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    },
    variables: {
      sort: "publishedAt:desc",
      pagination: {
        limit: 3,
      },
    },
  });
  // const events = data.events;
  // console.log(events);

  // console.log("EVENT component");
  // console.log(data);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {data?.events?.map((event, index) => {
          if (!event) return null;
          
          // Check if event is in the past
          const eventDate = new Date(event.dateTime);
          const isPastEvent = eventDate < new Date();
          
          return (
            <div 
              key={index} 
              className={`card shadow-xl ${isPastEvent ? 'bg-gray-200 opacity-75' : 'bg-base-100'}`}
            >
              <figure className={isPastEvent ? 'grayscale' : ''}>
                <Image
                  src={event.featuredImage?.formats?.medium?.url ?? "default-image.jpg"}
                  alt={event.featuredImage?.alternativeText || event.heading || "Event Image"}
                  className="h-48 w-full object-cover"
                  width={event.featuredImage?.formats?.medium?.width ?? 0}
                  height={event.featuredImage?.formats?.medium?.height ?? 0}
                />
              </figure>
              <div className="card-body">
                <h3 className={`card-title ${isPastEvent ? 'text-gray-600' : ''}`}>
                  {event.heading ?? "Default Title"}
                  {isPastEvent && <span className="text-sm font-normal text-gray-500 ml-2">(Past)</span>}
                </h3>
                <p className={isPastEvent ? 'text-gray-500' : ''}>
                  {event.description ?? "No description available."}
                </p>
                <p className={isPastEvent ? 'text-gray-500' : ''}>
                  {new Date(event.dateTime).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  <br />
                  {new Date(event.dateTime).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>
                <div className="card-actions justify-end">
                  <Link
                    className={`btn ${isPastEvent 
                      ? 'bg-gray-400 hover:bg-gray-500' 
                      : 'bg-custom-red hover:bg-custom-blue'} text-white font-bold py-2 px-4 rounded`}
                    key={event.slug}
                    href={`/events/${event.slug}`}
                  >
                    {isPastEvent ? 'View Details' : 'Read More'}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-3">
        <Link
          href="/events"
          className="btn bg-custom-blue hover:bg-custom-blue text-white font-bold mt-4 py-2 px-4 rounded"
        >
          More Events
        </Link>
      </div>
    </div>
  );
}
