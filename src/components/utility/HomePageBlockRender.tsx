// not going to be used right now due to articles and events having their own queries
import React from "react";
import { HomePageQuery } from "@/gql/graphql";
import Hero from "@/components/HomePage/Hero";
import AboutUs from "@/components/HomePage/AboutUs";
import TotalDonations from "@/components/HomePage/TotalDonations";
import ImageSlider from "@/components/shared/ImageSlider";
import Volunteer from "@/components/HomePage/Volunteer";
import FeaturedProject from "@/components/HomePage/FeaturedPoject";
import RichText from "@/components/blocks/RichText";

import {
  type HeroSectionBlock,
  type AboutSectionBlock,
  type TotalDonationsBlock,
  type VolunteerSectionBlock,
  type ImageSliderHomePageBlock,
  type FeaturedProjectBlock,
} from "@/types/blocks";

export type HomePageBlock = NonNullable<
  NonNullable<NonNullable<HomePageQuery["homePageContent"]>["blocks"]>[number]
>;

interface SectionStyle {
  backgroundColor: string;
  paddingX: string;
  paddingY: string;
  additionalClasses?: string;
}

// Define section styles based on block type or position
const getSectionStyle = (blockType: string, index: number): SectionStyle => {
  // Alternating background colors
  const isEven = index % 2 === 0;

  // Default styles
  const defaultStyle: SectionStyle = {
    backgroundColor: isEven ? "bg-white" : "bg-base",
    paddingX: "px-4",
    paddingY: "py-10",
  };

  // Custom styles for specific block types
  switch (blockType) {
    case "ComponentPtaHeroSection":
      return {
        backgroundColor: "",
        paddingX: "",
        paddingY: "",
        additionalClasses: "w-full",
      };
    case "ComponentPtaTotalDonations":
      return {
        backgroundColor: "bg-custom-blue",
        paddingX: "px-4",
        paddingY: "py-10",
      };
    case "ComponentPtaFeaturedProject":
      return {
        backgroundColor: "bg-base",
        paddingX: "px-4",
        paddingY: "py-10",
      };
    case "ComponentPtaHomePageAbout":
      return {
        backgroundColor: "bg-white",
        paddingX: "px-4",
        paddingY: "py-10",
      };
    default:
      return defaultStyle;
  }
};

interface HomePageBlockRendererProps {
  blocks: HomePageBlock[];
}

const HomePageBlockRenderer: React.FC<HomePageBlockRendererProps> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  // Process blocks to extract typed components
  let richText = {};
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
          heroBlock = { ...block };
          break;
        case "ComponentPtaTotalDonations":
          totalDonationsBlock = { ...block };
          break;
        case "ComponentPtaRichTextMarkdown":
          richText = { ...block };
          break;
        case "ComponentPtaHomePageAbout":
          aboutUsBlock = { ...block };
          break;
        case "ComponentPtaFeaturedProject":
          featuredProjectBlock = { ...block };
          break;
        case "ComponentPtaHomePageVolunteerBlock":
          volunteerBlock = { ...block };
          break;
        case "ComponentPtaHomePageSlider":
          imageSlider = { ...block };
          break;
      }
    }
  });

  // Define the sections with their components and styles
  const sections = [
    {
      component: <Hero {...heroBlock} />,
      type: "ComponentPtaHeroSection",
    },
    {
      component: <AboutUs {...aboutUsBlock} />,
      type: "ComponentPtaHomePageAbout",
    },
    {
      component: <TotalDonations {...totalDonationsBlock} />,
      type: "ComponentPtaTotalDonations",
    },
    {
      component: <FeaturedProject {...featuredProjectBlock} />,
      type: "ComponentPtaFeaturedProject",
    },
    {
      component: <ImageSlider {...imageSlider} />,
      type: "ComponentPtaHomePageSlider",
    },
    {
      component: <Volunteer {...volunteerBlock} />,
      type: "ComponentPtaHomePageVolunteerBlock",
    },
    {
      component: <RichText {...richText} />,
      type: "ComponentPtaRichTextMarkdown",
    },
  ];

  return (
    <div className="min-h-screen">
      {sections.map((section, index) => {
        const style = getSectionStyle(section.type, index);
        const className = `${style.backgroundColor} ${style.paddingX} ${style.paddingY} ${
          style.additionalClasses || ""
        }`.trim();

        return (
          <section key={index} className={className}>
            {section.component}
          </section>
        );
      })}
    </div>
  );
};

export default HomePageBlockRenderer;
