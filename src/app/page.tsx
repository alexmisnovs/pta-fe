// "use client";
// app/page.tsx
import apolloClient from "@/lib/apollo-client";
import { HomePageDocument } from "@/gql/graphql";

import Articles from "@/components/Articles";
import Hero from "@/components/Hero";
import ImageSlider from "@/components/ImageSlider";
import Events from "@/components/Events";

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

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
          <p className="text-lg text-center">
            We are a non-profit organization dedicated to improving our community through various
            initiatives and volunteer programs. Join us in making a positive impact!
          </p>
        </div>
      </section>

      {/* NEWS */}

      <section className="py-20 px-4">
        <div className="container">
          <Articles />
        </div>
      </section>

      {/* Carousel */}
      <ImageSlider {...imageSlider} />

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
      <Events />
    </div>
  );
}
