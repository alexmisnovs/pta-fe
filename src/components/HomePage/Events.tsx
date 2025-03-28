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
        {data?.events?.map((event, index) =>
          event ? (
            <div key={index} className="card bg-base-100 shadow-xl">
              <figure>
                <Image
                  src={event.featuredImage?.formats?.medium?.url ?? "default-image.jpg"}
                  alt={event.featuredImage?.alternativeText || event.heading || "Event Image"}
                  className="h-48 w-full object-cover"
                  width={event.featuredImage?.formats?.medium?.width ?? 0}
                  height={event.featuredImage?.formats?.medium?.height ?? 0}
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{event.heading ?? "Default Title"}</h3>
                <p>{event.description ?? "No description available."}</p>
                <p>
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
                    className="btn bg-custom-red hover:bg-custom-blue text-white font-bold py-2 px-4 rounded"
                    key={event.slug}
                    href={`/events/${event.slug}`}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ) : null
        )}
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
