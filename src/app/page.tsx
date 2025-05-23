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
import RichText from "@/components/blocks/RichText";
import RichTextWithImage from "@/components/HomePage/RichTextWithImage";
import { Suspense } from "react";

import {
  type HeroSectionBlock,
  type AboutSectionBlock,
  type TotalDonationsBlock,
  type VolunteerSectionBlock,
  type ImageSliderHomePageBlock,
  type FeaturedProjectBlock,
  type RichTextMarkdown,
  type RichTextWithImageType,
} from "@/types/blocks";
import ArticlesLoading from "@/components/loading/ArticlesLoading";

export default async function HomePage() {
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

  const blocks = data?.homePageContent?.blocks || [];
  let richText: RichTextMarkdown = {};
  let richTextWithImage: RichTextWithImageType = {};
  let heroBlock: HeroSectionBlock = {};
  let imageSlider: ImageSliderHomePageBlock = {};
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
      <Suspense fallback={<ArticlesLoading />}>
        <section className="py-10 px-4 md:px-8 bg-white">
          <Articles />
        </section>
      </Suspense>
      {/* Featured Project section */}
      <section className="py-10 bg-base">
        <FeaturedProject {...featuredProjectBlock} />
      </section>
      {/* Events Section - with Suspense */}
      <Suspense fallback={<ArticlesLoading />}>
        <section className="py-10 px-4 bg-white">
          <Events />
        </section>
      </Suspense>
      {/* Carousel */}
      <section className="py-10 px-4 bg-base">
        <ImageSlider slides={imageSlider.slides || []} heading="Gallery" />
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
    </div>
  );
}
