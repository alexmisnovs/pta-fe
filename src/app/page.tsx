// "use client";
// app/page.tsx
import apolloClient from "@/lib/apollo-client";
import { HomePageDocument } from "@/gql/graphql";

import Articles from "@/components/HomePage/Articles";
import Hero from "@/components/HomePage/Hero";
import ImageSlider from "@/components/shared/ImageSlider";
import Events from "@/components/HomePage/Events";
import VolunteerForm from "@/components/shared/VolunteerForm";
import FeaturedProject from "@/components/HomePage/FeaturedPoject";
import ReactMarkdown from "react-markdown";
import NewsLetter from "@/components/shared/NewsLetter";

export default async function Home() {
  // we need to get component data from api
  const { data = {} } = await apolloClient.query({
    query: HomePageDocument,
    context: {
      // initialApolloState,
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
  let featuredProjectBlock = {};
  let totalDonationsBlock: {
    __typename?: "ComponentPtaTotalDonations";
    text?: string | null;
    total?: number | null;
  } = {};
  let volunteerBlock: {
    __typename?: "ComponentPtaHomePageVolunteerBlock";
    content?: string | null;
  } = {};

  blocks.forEach(block => {
    if (block) {
      switch (block.__typename) {
        case "ComponentPtaHeroSection":
          heroBlock = {
            ...block,
          };
          break;
        case "ComponentPtaTotalDonations":
          totalDonationsBlock = {
            ...block,
          };
          break;
        case "ComponentPtaHomePageAbout":
          aboutUsBlock = {
            ...block,
          };
          break;
        case "ComponentPtaFeaturedProject":
          featuredProjectBlock = {
            ...block,
          };
          break;
        case "ComponentPtaHomePageVolunteerBlock":
          volunteerBlock = {
            ...block,
          };
          break;
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
      <section className="py-10 px-4 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">{aboutUsBlock.heading}</h2>
          <p className="text-lg text-center">{aboutUsBlock.description}</p>
        </div>
      </section>
      {/* Newsletter */}
      <section className="pt-5 pb-10 px-4 bg-base">
        <NewsLetter className="w-full" />
      </section>

      {/* total donations */}
      <section className="py-10 px-4 bg-custom-blue">
        <div className="container">
          <h2 className="text-3xl font-bold text-white text-center my-8">
            {totalDonationsBlock.text} :{" "}
            <span className="text-custom-red">£{totalDonationsBlock.total}</span>
          </h2>
        </div>
      </section>
      {/* NEWS */}
      <section className="py-10 px-4 bg-base">
        <div className="container">
          <Articles />
        </div>
      </section>

      {/* Featured Project section */}
      <section className="py-10 bg-base  ">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">CURRENT PROJECTS</h2>
          <FeaturedProject {...featuredProjectBlock} />
        </div>
      </section>

      {/* Events Section */}
      <section className="py-10 px-4 bg-white">
        <Events />
      </section>

      {/* Carousel */}
      <section className="py-10 px-4 bg-white">
        <ImageSlider {...imageSlider} />
      </section>
      {/* Volunteer Form */}
      <section className="py-10 bg-base">
        <div className="container flex flex-col md:flex-row gap-8">
          <ReactMarkdown className="markdown flex-1 md:order-1">
            {volunteerBlock.content}
          </ReactMarkdown>
          <VolunteerForm className="md:order-2 flex-1" />
        </div>
      </section>
    </div>
  );
}
