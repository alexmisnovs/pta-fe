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
export type AboutSectionBlock = Partial<
  Extract<
    NonNullable<NonNullable<NonNullable<HomePageQuery["homePageContent"]>["blocks"]>[number]>,
    { __typename?: "ComponentPtaHomePageAbout" }
  >
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

/**
 * Represents the Featured Project Block type extracted from the HomePageQuery.
 * This type uses TypeScript's Extract and Partial utility types to get the specific ComponentPtaFeaturedProject
 * from the blocks array in the homePageContent, making all properties optional.
 *
 * @typedef {Object} FeaturedProjectBlock
 * @property {string} [__typename] - Optional typename property that matches "ComponentPtaFeaturedProject"
 * @property {string} [title] - Optional title of the featured project
 * @property {string} [description] - Optional description of the featured project
 * @property {Object} [image] - Optional image associated with the featured project
 */
export type FeaturedProjectBlock = Partial<
  Extract<
    NonNullable<NonNullable<NonNullable<HomePageQuery["homePageContent"]>["blocks"]>[number]>,
    { __typename?: "ComponentPtaFeaturedProject" }
  >
>;

// export type RichTextMarkdown = Partial<ComponentPtaRichTextMarkdown>;
/**
 * Represents the Rich Text Markdown Block type extracted from the HomePageQuery.
 * This type uses TypeScript's Extract and Partial utility types to get the specific ComponentPtaRichTextMarkdown
 * from the blocks array in the homePageContent, making all properties optional.
 *
 * @typedef {Object} RichTextMarkdown
 * @property {string} [__typename] - Optional typename property that matches "ComponentPtaRichTextMarkdown"
 * @property {string} [content] - Optional markdown content to be rendered
 * @property {string} [title] - Optional title for the rich text section
 */
export type RichTextMarkdown = Partial<
  Extract<
    NonNullable<NonNullable<NonNullable<HomePageQuery["homePageContent"]>["blocks"]>[number]>,
    { __typename?: "ComponentPtaRichTextMarkdown" }
  >
>;

/**
 * Represents the Rich Text With Image Block type extracted from the HomePageQuery.
 * This type uses TypeScript's Extract and Partial utility types to get the specific ComponentPtaTextWithImage
 * from the blocks array in the homePageContent, making all properties optional.
 *
 * @typedef {Object} RichTextWithImageType
 * @property {string} [__typename] - Optional typename property that matches "ComponentPtaTextWithImage"
 * @property {string} [content] - Optional text content to be displayed alongside the image
 * @property {string} [title] - Optional title for the section
 * @property {Object} [file] - Optional image file to be displayed with the text
 * @property {boolean} [imageOnLeft] - Optional flag indicating if the image should be positioned on the left
 */
export type RichTextWithImageType = Partial<
  Extract<
    NonNullable<NonNullable<NonNullable<HomePageQuery["homePageContent"]>["blocks"]>[number]>,
    { __typename?: "ComponentPtaTextWithImage" }
  >
>;
