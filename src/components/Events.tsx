"use client";

import { useQuery } from "@apollo/client";
import { EventListDocument } from "@/gql/graphql";
import Link from "next/link";

const Events = () => {
  const { data, loading, error } = useQuery(EventListDocument);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // console.log("EVENT component");
  // console.log(data);

  return (
    <section className="py-20 px-4">
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
                <div className="card-actions justify-end">
                  <Link className="btn btn-primary" key={event.slug} href={`/events/${event.slug}`}>
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>
    </section>
  );
};

export default Events;
