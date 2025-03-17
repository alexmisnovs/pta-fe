// "use client";
// app/page.tsx
import apolloClient from "@/lib/apollo-client";
import { HomePageDocument } from "@/gql/graphql";

import Articles from "@/components/Articles";
import Hero from "@/components/Hero";
import ImageSlider from "@/components/ImageSlider";
import Events from "@/components/Events";
import VolunteerForm from "@/components/VolunteerForm";
export default async function Home() {
  // we need to get component data from api
  const { data = {} } = await apolloClient.query({
    query: HomePageDocument,
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    },
  });

  // console.log(data);
  const blocks = data?.homePageContent?.blocks || [];
  // let heroBlock = { title: "", content: "", backgroundImage: { url: "" } };
  let heroBlock = {};
  // let totalDonationsBlock = {};
  let imageSlider = {};
  let aboutUsBlock: {
    __typename?: "ComponentPtaHomePageAbout";
    heading?: string | null;
    description?: string | null;
  } = {};

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
        case "ComponentPtaHomePageAbout":
          aboutUsBlock = {
            ...block,
          };
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
      <section className="py-20 px-4 bg-white">
        {/* <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
          <p className="text-lg text-center">
            We are a non-profit organization dedicated to improving our community through various
            initiatives and volunteer programs. Join us in making a positive impact!
          </p>
        </div> */}
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">{aboutUsBlock.heading}</h2>
          <p className="text-lg text-center">{aboutUsBlock.description}</p>
        </div>
      </section>

      {/* NEWS */}

      <section className="py-20 px-4">
        <div className="container">
          <Articles />
        </div>
      </section>

      {/* Carousel */}
      <section className="py-20 px-4 bg-white">
        <ImageSlider {...imageSlider} />
      </section>
      {/* Volunteer Form */}
      <section className="py-20 bg-base  ">
        <VolunteerForm />
      </section>

      {/* Events Section */}
      <section className="py-20 px-4 bg-white">
        <Events />
      </section>
    </div>
  );
}
