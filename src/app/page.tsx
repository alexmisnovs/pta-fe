import apolloClient from "@/lib/apollo-client";
import { HomePageDocument } from "@/gql/graphql";

import Articles from "@/components/HomePage/Articles";
import Hero from "@/components/HomePage/Hero";
import ImageSlider from "@/components/shared/ImageSlider";
import Events from "@/components/HomePage/Events";
import FeaturedProject from "@/components/HomePage/FeaturedPoject";

import NewsLetter from "@/components/shared/NewsLetter";
import TotalDonations from "@/components/HomePage/TotalDonations";
import AboutUs from "@/components/HomePage/AboutUs";
import Volunteer from "@/components/HomePage/Volunteer";
import RichText from "@/components/HomePage/RichText";
import RichTextWithImage from "@/components/HomePage/RichTextWithImage";
import { Suspense } from "react";

import {
  type HeroSectionBlock,
  type AboutSectionBlock,
  type TotalDonationsBlock,
  type VolunteerSectionBlock,
  type ImageSliderBlock,
  type FeaturedProjectBlock,
  type RichTextMarkdown,
  type RichTextWithImageType,
} from "@/types/blocks";
import ArticlesLoading from "@/components/loading/ArticlesLoading";
import EventsLoading from "@/components/loading/EventsLoading";

export default async function HomePage() {
  // we need to get component data from api
  const { data = {} } = await apolloClient.query({
    query: HomePageDocument,
    context: {
      // initialApolloState,
      fetchOptions: {
        next: { revalidate: 0 },
      },
    },
  });

  const blocks = data?.homePageContent?.blocks || [];
  let richText: RichTextMarkdown = {};
  let richTextWithImage: RichTextWithImageType = {};
  let heroBlock: HeroSectionBlock = {};
  let imageSlider: ImageSliderBlock = {};
  let aboutUsBlock: AboutSectionBlock = {};
  let featuredProjectBlock: FeaturedProjectBlock = {};
  let totalDonationsBlock: TotalDonationsBlock = {};
  let volunteerBlock: VolunteerSectionBlock = {};

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
        case "ComponentPtaRichTextMarkdown":
          richText = {
            ...block,
          };
          break;
        case "ComponentPtaTextWithImage":
          richTextWithImage = {
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

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <Hero {...heroBlock} />
      {/* About Section */}
      <section className="py-10 px-4 bg-white">
        <AboutUs {...aboutUsBlock} />
      </section>
      {/* Newsletter */}
      <section className="pt-5 pb-10 px-4 bg-base">
        <NewsLetter className="w-full" />
      </section>
      {/* Total donations */}
      <section className="py-10 px-4 bg-custom-blue">
        <TotalDonations {...totalDonationsBlock} />
      </section>
      {/* Rich Text with Image */}
      {richTextWithImage && richTextWithImage.file && richTextWithImage.content && (
        <section className="py-10 px-4 bg-base">
          <RichTextWithImage {...richTextWithImage} />
        </section>
      )}
      {/* News - with Suspense */}
      <Suspense
        fallback={
          <div className="py-10 px-4 md:px-8 bg-white">
            <div className="container mx-auto">
              <h2 className="text-2xl font-bold mb-6">Latest News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-lg shadow-md h-64 animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        }
      >
        <section className="py-10 px-4 md:px-8 bg-white">
          <Articles />
        </section>
      </Suspense>
      {/* Featured Project section */}
      <section className="py-10 bg-base">
        <FeaturedProject {...featuredProjectBlock} />
      </section>
      {/* Events Section - with Suspense */}
      <Suspense
        fallback={
          <div className="py-10 px-4 bg-white">
            <div className="container mx-auto">
              <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-md p-4 h-32 animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        }
      >
        <section className="py-10 px-4 bg-white">
          <Events />
        </section>
      </Suspense>
      {/* Carousel */}
      <section className="py-10 px-4 bg-base">
        <ImageSlider {...imageSlider} />
      </section>
      {/* Volunteer Block */}
      <section className="py-10 bg-white">
        <Volunteer {...volunteerBlock} />
      </section>
      {richText && richText.heading && richText.content && (
        <section className="py-10 bg-white">
          <RichText {...richText} />
        </section>
      )}
      <ArticlesLoading />
      <EventsLoading />
    </div>
  );
}

// // new version with blockRender, however, it wont display properly events and news,
// // because they are not technically blocks
// // app/page.tsx
// import apolloClient from "@/lib/apollo-client";
// import { HomePageDocument } from "@/gql/graphql";
// import HomePageBlockRenderer from "@/components/utility/HomePageBlockRender";
// import NewsLetter from "@/components/shared/NewsLetter";
// import Articles from "@/components/HomePage/Articles";
// import Events from "@/components/HomePage/Events";

// export default async function HomePage() {
//   // we need to get component data from api
//   const { data = {} } = await apolloClient.query({
//     query: HomePageDocument,
//     context: {
//       fetchOptions: {
//         next: { revalidate: 60 },
//       },
//     },
//   });

//   const blocks = data?.homePageContent?.blocks || [];

//   return (
//     <>
//       <HomePageBlockRenderer blocks={blocks.filter(block => block !== null)} />

//       {/* Additional sections that aren't part of the CMS blocks */}
//       <section className="pt-5 pb-10 px-4 bg-base">
//         <NewsLetter className="w-full" />
//       </section>

//       <section className="py-10 px-4 md:px-8 bg-white">
//         <Articles />
//       </section>

//       <section className="py-10 px-4 bg-white">
//         <Events />
//       </section>
//     </>
//   );
// }
