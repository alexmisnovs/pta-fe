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
    donationLink?:
      | {
          __typename?: "ComponentSharedButtonLink" | undefined;
          link?: string | null | undefined;
          buttonText?: string | null | undefined;
        }
      | null
      | undefined;
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
          <div className="flex justify-center">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={totalDonationsBlock.donationLink?.link ?? "/"}
              className="flex 1 btn btn-md bg-custom-red hover:bg-gray text-white font-bold rounded px-4 border-0"
            >
              {totalDonationsBlock.donationLink?.buttonText ?? "Donate"}
            </a>
          </div>
        </div>
      </section>
      {/* NEWS */}
      <section className="py-10 px-4 md:px-8 bg-white">
        <Articles />
      </section>

      {/* Featured Project section */}
      <section className="py-10 bg-base  ">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-1">CURRENT PROJECTS</h2>
          <FeaturedProject {...featuredProjectBlock} />
        </div>
      </section>

      {/* Events Section */}
      <section className="py-10 px-4 bg-white">
        <Events />
      </section>

      {/* Carousel */}
      <section className="py-10 px-4 bg-base">
        <ImageSlider {...imageSlider} />
      </section>
      {/* Volunteer Form */}
      <section className="py-10 bg-white">
        <div className="container flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 md:order-2 max-w-xl">
            {/* <h2 className="text-3xl font-bold mb-6">WHY VOLUNTEER?</h2> */}
            <ReactMarkdown className="markdown prose">{volunteerBlock.content}</ReactMarkdown>
            <Link href="/volunteer">
              <button className="btn bg-custom-red hover:bg-custom-blue text-white font-bold py-2 px-4 rounded border-0 mt-4">
                Signup
              </button>
            </Link>
          </div>

          <div className="md:order-1 flex-1 flex justify-end">
            <Image
              src={volunteerBlock.image?.formats?.medium?.url || volunteerBlock.image?.url}
              alt={volunteerBlock.image?.formats?.medium?.alternativeText || "Volunteer image"}
              width={450}
              height={450}
              className="object-cover rounded-lg w-full max-w-[450px] h-[450px]"
              priority={false}
              sizes="(max-width: 768px) 100vw, 450px"
              quality={80}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
