import { HomePageQuery } from "@/gql/graphql";

/**
 * Represents the Hero Section Block type extracted from the HomePageQuery.
 * This type uses TypeScript's Extract utility type to get the specific ComponentPtaHeroSection
 * from the blocks array in the homePageContent.
 *
 * @typedef {Object} HeroSectionBlock
 * @property {string} [__typename] - Optional typename property that matches "ComponentPtaHeroSection"
 */

export type HeroSectionBlock = Extract<
  NonNullable<NonNullable<NonNullable<HomePageQuery["homePageContent"]>["blocks"]>[number]>,
  { __typename?: "ComponentPtaHeroSection" }
>;
/**
 * Represents the About Section Block type extracted from the HomePageQuery.
 * This type uses TypeScript's Extract utility type to get the specific ComponentPtaHomePageAbout
 * from the blocks array in the homePageContent.
 *
 * @typedef {Object} AboutSectionBlock
 * @property {string} [__typename] - Optional typename property that matches "ComponentPtaHomePageAbout"
 */
export type AboutSectionBlock = Extract<
  NonNullable<NonNullable<NonNullable<HomePageQuery["homePageContent"]>["blocks"]>[number]>,
  { __typename?: "ComponentPtaHomePageAbout" }
>;

/**
 * Represents the Total Donations Block type extracted from the HomePageQuery.
 * This type uses TypeScript's Extract and Omit utility types to get the specific ComponentPtaTotalDonations
 * from the blocks array in the homePageContent, excluding the 'id' property.
 *
 * @typedef {Object} TotalDonationsBlock
 * @property {string} [__typename] - Optional typename property that matches "ComponentPtaTotalDonations"
 */
export type TotalDonationsBlock = Partial<
  Extract<
    NonNullable<NonNullable<NonNullable<HomePageQuery["homePageContent"]>["blocks"]>[number]>,
    { __typename?: "ComponentPtaTotalDonations" }
  >
>;

/**
 * Represents the Volunteer Section Block type extracted from the HomePageQuery.
 * This type uses TypeScript's Extract utility type to get the specific ComponentPtaHomePageVolunteerBlock
 * from the blocks array in the homePageContent.
 *
 * @typedef {Object} VolunteerSectionBlock
 * @property {string} [__typename] - Optional typename property that matches "ComponentPtaHomePageVolunteerBlock"
 */
export type VolunteerSectionBlock = Extract<
  NonNullable<NonNullable<NonNullable<HomePageQuery["homePageContent"]>["blocks"]>[number]>,
  { __typename?: "ComponentPtaHomePageVolunteerBlock" }
>;

/**
 * Represents the Image Slider Block type extracted from the HomePageQuery.
 * This type uses TypeScript's Extract and Partial utility types to get the specific ComponentPtaHomePageSlider
 * from the blocks array in the homePageContent, making all properties optional.
 *
 * @typedef {Object} ImageSliderBlock
 * @property {string} [__typename] - Optional typename property that matches "ComponentPtaHomePageSlider"
 */
export type ImageSliderBlock = Partial<
  Extract<
    NonNullable<NonNullable<NonNullable<HomePageQuery["homePageContent"]>["blocks"]>[number]>,
    { __typename?: "ComponentPtaHomePageSlider" }
  >
>;

export type FeaturedProjectBlock = Partial<
  Extract<
    NonNullable<NonNullable<NonNullable<HomePageQuery["homePageContent"]>["blocks"]>[number]>,
    { __typename?: "ComponentPtaFeaturedProject" }
  >
>;
