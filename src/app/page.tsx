// "use client";
// app/page.tsx
import apolloClient from "@/lib/apollo-client";
import { HomePageDocument } from "@/gql/graphql";

import Articles from "@/components/Articles";
import Hero from "@/components/Hero";
import ImageSlider from "@/components/ImageSlider";
const events = [
  {
    title: "Community Cleanup Day",
    description: "Join us for a city-wide cleanup event to make our community sparkle!",
    image: "https://picsum.photos/200/300",
  },
  {
    title: "Charity Marathon",
    description: "Annual charity run to support local homeless shelters",
    image: "https://picsum.photos/200/300",
  },
  {
    title: "Food Drive",
    description: "Help us collect non-perishable food items for families in need",
    image: "https://picsum.photos/200/300",
  },
];

export default async function Home() {
  // we need to get component data from api
  const { data = {} } = await apolloClient.query({
    query: HomePageDocument,
    context: {
      fetchOptions: {
        next: { revalidate: 600 },
      },
    },
  });

  // console.log(data);
  const blocks = data?.homePageContent?.blocks || [];
  // let heroBlock = { title: "", content: "", backgroundImage: { url: "" } };
  let heroBlock = {};
  // let totalDonationsBlock = {};
  let imageSlider = {};

  blocks.forEach(block => {
    if (block) {
      switch (block.__typename) {
        case "ComponentPtaHeroSection":
          heroBlock = {
            ...block,
          };

        case "ComponentPtaTotalDonations":
          // totalDonationsBlock = {
          //   ...block,
          // };
          return <h1>I am total donaitons</h1>;
        //  return <CardCarousel {...block} key={index} />;
        case "ComponentPtaHomePageSlider":
          imageSlider = {
            ...block,
          };
          break;
        default:
          return <h1>didnt find anything</h1>;
      }
    }
  });
  // console.log(imageSlider);

  return (
    <div className="min-h-screen">
      {/* Hero section */}

      <Hero {...heroBlock} />

      {/* NEWS */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Articles />
        </div>
      </section>

      {/* Carousel */}
      <ImageSlider {...imageSlider} />
      {/* About Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
          <p className="text-lg text-center">
            We are a non-profit organization dedicated to improving our community through various
            initiatives and volunteer programs. Join us in making a positive impact!
          </p>
        </div>
      </section>

      {/* Volunteer Form */}
      <section className="py-20 bg-base-200">
        <div className="max-w-md mx-auto card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Become a Volunteer</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="input input-bordered w-full" />
              <input
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full"
              />
              <button className="btn btn-primary w-full">Join Now</button>
            </form>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {events.map((event, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <figure>
                <img src={event.image} alt={event.title} className="h-48 w-full object-cover" />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{event.title}</h3>
                <p>{event.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Read More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
