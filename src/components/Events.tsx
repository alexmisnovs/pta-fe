import apolloClient from "@/lib/apollo-client";
import { HomePageEventsDocument } from "@/gql/graphql";
import Link from "next/link";

export default async function Events() {
  const { data } = await apolloClient.query({
    query: HomePageEventsDocument,
    context: {
      fetchOptions: {
        next: { revalidate: 120 },
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
                <img
                  src={event.featuredImage?.url ?? "default-image.jpg"}
                  alt={event.heading ?? "Event Image"}
                  className="h-48 w-full object-cover"
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
    </div>
  );
}
