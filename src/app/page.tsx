// "use client";
// app/page.tsx
import apolloClient from "@/lib/apollo-client";
import { HomePageDocument } from "@/gql/graphql";

import Articles from "@/components/HomePage/Articles";
import Hero from "@/components/HomePage/Hero";
import ImageSlider from "@/components/shared/ImageSlider";
import Events from "@/components/HomePage/Events";
// import VolunteerForm from "@/components/shared/VolunteerForm";
import FeaturedProject from "@/components/HomePage/FeaturedPoject";
import ReactMarkdown from "react-markdown";
import NewsLetter from "@/components/shared/NewsLetter";

import Image from "next/image";
import Link from "next/link";

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
    image?: {
      __typename?: "UploadFile";
      url: string;
      alternateText?: string | null;
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      formats?: any | null;
    } | null;
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
          <div className=" flex-1 md:order-2">
            <ReactMarkdown className="markdown">{volunteerBlock.content}</ReactMarkdown>
            <Link href="/volunteer">
              <button className="btn bg-custom-red hover:bg-custom-blue text-white font-bold py-2 px-4 rounded border-inherit">
                Signup
              </button>
            </Link>
          </div>

          {/* <Image src={volunteerBlock.image?.formats?.medium.url as string} alt="volunteer" /> */}
          <div className="md:order-1 flex-1">
            <Image
              src={volunteerBlock.image?.formats?.medium?.url || volunteerBlock.image?.url}
              alt={volunteerBlock.image?.formats?.medium?.alternativeText || "Volunteer image"}
              width={volunteerBlock.image?.formats?.medium?.width || 350}
              height={volunteerBlock.image?.formats?.medium?.height || 350}
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              quality={80}
            />
          </div>

          {/* <VolunteerForm className="md:order-2 flex-1" /> */}
        </div>
      </section>
    </div>
  );
}
