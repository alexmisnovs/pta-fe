/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query Articles {\n  articles {\n    title\n    slug\n    description\n    cover {\n      url\n    }\n  }\n}\n\nquery HomePageArticles($sort: [String], $pagination: PaginationArg) {\n  articles(sort: $sort, pagination: $pagination) {\n    title\n    description\n    slug\n    cover {\n      url\n      alternativeText\n    }\n    publishedAt\n    author {\n      name\n      avatar {\n        url\n      }\n    }\n  }\n}\n\nquery HomePage {\n  homePageContent {\n    blocks {\n      ... on ComponentPtaHeroSection {\n        title\n        content\n        backgroundImage {\n          url\n        }\n      }\n      ... on ComponentPtaTotalDonations {\n        id\n        text\n        total\n      }\n      ... on ComponentPtaHomePageSlider {\n        slides {\n          url\n        }\n      }\n      ... on ComponentPtaHomePageAbout {\n        heading\n        description\n      }\n    }\n  }\n}\n\nquery Header {\n  header {\n    logoText\n    donateButtonLink {\n      link\n    }\n    menuLink {\n      buttonText\n      link\n    }\n    logoImage {\n      url\n      formats\n    }\n  }\n}\n\nquery Footer {\n  footer {\n    footerLogo {\n      alternativeText\n      url\n    }\n    copyright\n    socialLink {\n      buttonText\n      link\n    }\n  }\n}\n\nquery EventList {\n  events {\n    heading\n    isPast\n    featuredImage {\n      url\n    }\n    dateTime\n    slug\n    description\n  }\n}\n\nquery HomePageEvents($sort: [String], $pagination: PaginationArg) {\n  events(sort: $sort, pagination: $pagination) {\n    heading\n    isPast\n    featuredImage {\n      url\n    }\n    dateTime\n    slug\n    description\n  }\n}\n\nquery Event($slug: String) {\n  events(filters: {slug: {eq: $slug}}) {\n    heading\n    dateTime\n    isPast\n    featuredImage {\n      url\n      alternativeText\n    }\n    donationReceived\n    blocks {\n      ... on ComponentPtaRichTextMarkdown {\n        content\n      }\n      ... on ComponentSharedMedia {\n        file {\n          url\n          alternativeText\n        }\n      }\n    }\n    description\n  }\n}\n\nquery Article($slug: String) {\n  articles(filters: {slug: {eq: $slug}}) {\n    cover {\n      alternativeText\n      url\n    }\n    title\n    description\n    blocks {\n      ... on ComponentSharedQuote {\n        body\n        title\n      }\n      ... on ComponentSharedRichText {\n        body\n      }\n      ... on ComponentSharedRichText {\n        body\n      }\n      ... on ComponentSharedSlider {\n        files {\n          alternativeText\n          url\n        }\n      }\n    }\n  }\n}\n\nmutation CreateVolunteer($data: VolunteerInput!) {\n  createVolunteer(data: $data) {\n    name\n    email\n  }\n}\n\nquery Projects {\n  projects {\n    coverImage {\n      alternativeText\n      url\n    }\n    donationsGoal\n    heading\n    description\n    slug\n  }\n}\n\nquery Project($slug: String) {\n  projects(filters: {slug: {eq: $slug}}) {\n    coverImage {\n      alternativeText\n      url\n    }\n    donationsGoal\n    heading\n    body\n    donationsReceived\n    donateButtonLink {\n      link\n    }\n  }\n}\n\nquery ContactPage {\n  contactPage {\n    heading\n    description\n    content\n  }\n}\n\nmutation CreateContactFormEntry($data: ContactFormEntryInput!) {\n  createContactFormEntry(data: $data) {\n    name\n    email\n  }\n}": typeof types.ArticlesDocument,
};
const documents: Documents = {
    "query Articles {\n  articles {\n    title\n    slug\n    description\n    cover {\n      url\n    }\n  }\n}\n\nquery HomePageArticles($sort: [String], $pagination: PaginationArg) {\n  articles(sort: $sort, pagination: $pagination) {\n    title\n    description\n    slug\n    cover {\n      url\n      alternativeText\n    }\n    publishedAt\n    author {\n      name\n      avatar {\n        url\n      }\n    }\n  }\n}\n\nquery HomePage {\n  homePageContent {\n    blocks {\n      ... on ComponentPtaHeroSection {\n        title\n        content\n        backgroundImage {\n          url\n        }\n      }\n      ... on ComponentPtaTotalDonations {\n        id\n        text\n        total\n      }\n      ... on ComponentPtaHomePageSlider {\n        slides {\n          url\n        }\n      }\n      ... on ComponentPtaHomePageAbout {\n        heading\n        description\n      }\n    }\n  }\n}\n\nquery Header {\n  header {\n    logoText\n    donateButtonLink {\n      link\n    }\n    menuLink {\n      buttonText\n      link\n    }\n    logoImage {\n      url\n      formats\n    }\n  }\n}\n\nquery Footer {\n  footer {\n    footerLogo {\n      alternativeText\n      url\n    }\n    copyright\n    socialLink {\n      buttonText\n      link\n    }\n  }\n}\n\nquery EventList {\n  events {\n    heading\n    isPast\n    featuredImage {\n      url\n    }\n    dateTime\n    slug\n    description\n  }\n}\n\nquery HomePageEvents($sort: [String], $pagination: PaginationArg) {\n  events(sort: $sort, pagination: $pagination) {\n    heading\n    isPast\n    featuredImage {\n      url\n    }\n    dateTime\n    slug\n    description\n  }\n}\n\nquery Event($slug: String) {\n  events(filters: {slug: {eq: $slug}}) {\n    heading\n    dateTime\n    isPast\n    featuredImage {\n      url\n      alternativeText\n    }\n    donationReceived\n    blocks {\n      ... on ComponentPtaRichTextMarkdown {\n        content\n      }\n      ... on ComponentSharedMedia {\n        file {\n          url\n          alternativeText\n        }\n      }\n    }\n    description\n  }\n}\n\nquery Article($slug: String) {\n  articles(filters: {slug: {eq: $slug}}) {\n    cover {\n      alternativeText\n      url\n    }\n    title\n    description\n    blocks {\n      ... on ComponentSharedQuote {\n        body\n        title\n      }\n      ... on ComponentSharedRichText {\n        body\n      }\n      ... on ComponentSharedRichText {\n        body\n      }\n      ... on ComponentSharedSlider {\n        files {\n          alternativeText\n          url\n        }\n      }\n    }\n  }\n}\n\nmutation CreateVolunteer($data: VolunteerInput!) {\n  createVolunteer(data: $data) {\n    name\n    email\n  }\n}\n\nquery Projects {\n  projects {\n    coverImage {\n      alternativeText\n      url\n    }\n    donationsGoal\n    heading\n    description\n    slug\n  }\n}\n\nquery Project($slug: String) {\n  projects(filters: {slug: {eq: $slug}}) {\n    coverImage {\n      alternativeText\n      url\n    }\n    donationsGoal\n    heading\n    body\n    donationsReceived\n    donateButtonLink {\n      link\n    }\n  }\n}\n\nquery ContactPage {\n  contactPage {\n    heading\n    description\n    content\n  }\n}\n\nmutation CreateContactFormEntry($data: ContactFormEntryInput!) {\n  createContactFormEntry(data: $data) {\n    name\n    email\n  }\n}": types.ArticlesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query Articles {\n  articles {\n    title\n    slug\n    description\n    cover {\n      url\n    }\n  }\n}\n\nquery HomePageArticles($sort: [String], $pagination: PaginationArg) {\n  articles(sort: $sort, pagination: $pagination) {\n    title\n    description\n    slug\n    cover {\n      url\n      alternativeText\n    }\n    publishedAt\n    author {\n      name\n      avatar {\n        url\n      }\n    }\n  }\n}\n\nquery HomePage {\n  homePageContent {\n    blocks {\n      ... on ComponentPtaHeroSection {\n        title\n        content\n        backgroundImage {\n          url\n        }\n      }\n      ... on ComponentPtaTotalDonations {\n        id\n        text\n        total\n      }\n      ... on ComponentPtaHomePageSlider {\n        slides {\n          url\n        }\n      }\n      ... on ComponentPtaHomePageAbout {\n        heading\n        description\n      }\n    }\n  }\n}\n\nquery Header {\n  header {\n    logoText\n    donateButtonLink {\n      link\n    }\n    menuLink {\n      buttonText\n      link\n    }\n    logoImage {\n      url\n      formats\n    }\n  }\n}\n\nquery Footer {\n  footer {\n    footerLogo {\n      alternativeText\n      url\n    }\n    copyright\n    socialLink {\n      buttonText\n      link\n    }\n  }\n}\n\nquery EventList {\n  events {\n    heading\n    isPast\n    featuredImage {\n      url\n    }\n    dateTime\n    slug\n    description\n  }\n}\n\nquery HomePageEvents($sort: [String], $pagination: PaginationArg) {\n  events(sort: $sort, pagination: $pagination) {\n    heading\n    isPast\n    featuredImage {\n      url\n    }\n    dateTime\n    slug\n    description\n  }\n}\n\nquery Event($slug: String) {\n  events(filters: {slug: {eq: $slug}}) {\n    heading\n    dateTime\n    isPast\n    featuredImage {\n      url\n      alternativeText\n    }\n    donationReceived\n    blocks {\n      ... on ComponentPtaRichTextMarkdown {\n        content\n      }\n      ... on ComponentSharedMedia {\n        file {\n          url\n          alternativeText\n        }\n      }\n    }\n    description\n  }\n}\n\nquery Article($slug: String) {\n  articles(filters: {slug: {eq: $slug}}) {\n    cover {\n      alternativeText\n      url\n    }\n    title\n    description\n    blocks {\n      ... on ComponentSharedQuote {\n        body\n        title\n      }\n      ... on ComponentSharedRichText {\n        body\n      }\n      ... on ComponentSharedRichText {\n        body\n      }\n      ... on ComponentSharedSlider {\n        files {\n          alternativeText\n          url\n        }\n      }\n    }\n  }\n}\n\nmutation CreateVolunteer($data: VolunteerInput!) {\n  createVolunteer(data: $data) {\n    name\n    email\n  }\n}\n\nquery Projects {\n  projects {\n    coverImage {\n      alternativeText\n      url\n    }\n    donationsGoal\n    heading\n    description\n    slug\n  }\n}\n\nquery Project($slug: String) {\n  projects(filters: {slug: {eq: $slug}}) {\n    coverImage {\n      alternativeText\n      url\n    }\n    donationsGoal\n    heading\n    body\n    donationsReceived\n    donateButtonLink {\n      link\n    }\n  }\n}\n\nquery ContactPage {\n  contactPage {\n    heading\n    description\n    content\n  }\n}\n\nmutation CreateContactFormEntry($data: ContactFormEntryInput!) {\n  createContactFormEntry(data: $data) {\n    name\n    email\n  }\n}"): (typeof documents)["query Articles {\n  articles {\n    title\n    slug\n    description\n    cover {\n      url\n    }\n  }\n}\n\nquery HomePageArticles($sort: [String], $pagination: PaginationArg) {\n  articles(sort: $sort, pagination: $pagination) {\n    title\n    description\n    slug\n    cover {\n      url\n      alternativeText\n    }\n    publishedAt\n    author {\n      name\n      avatar {\n        url\n      }\n    }\n  }\n}\n\nquery HomePage {\n  homePageContent {\n    blocks {\n      ... on ComponentPtaHeroSection {\n        title\n        content\n        backgroundImage {\n          url\n        }\n      }\n      ... on ComponentPtaTotalDonations {\n        id\n        text\n        total\n      }\n      ... on ComponentPtaHomePageSlider {\n        slides {\n          url\n        }\n      }\n      ... on ComponentPtaHomePageAbout {\n        heading\n        description\n      }\n    }\n  }\n}\n\nquery Header {\n  header {\n    logoText\n    donateButtonLink {\n      link\n    }\n    menuLink {\n      buttonText\n      link\n    }\n    logoImage {\n      url\n      formats\n    }\n  }\n}\n\nquery Footer {\n  footer {\n    footerLogo {\n      alternativeText\n      url\n    }\n    copyright\n    socialLink {\n      buttonText\n      link\n    }\n  }\n}\n\nquery EventList {\n  events {\n    heading\n    isPast\n    featuredImage {\n      url\n    }\n    dateTime\n    slug\n    description\n  }\n}\n\nquery HomePageEvents($sort: [String], $pagination: PaginationArg) {\n  events(sort: $sort, pagination: $pagination) {\n    heading\n    isPast\n    featuredImage {\n      url\n    }\n    dateTime\n    slug\n    description\n  }\n}\n\nquery Event($slug: String) {\n  events(filters: {slug: {eq: $slug}}) {\n    heading\n    dateTime\n    isPast\n    featuredImage {\n      url\n      alternativeText\n    }\n    donationReceived\n    blocks {\n      ... on ComponentPtaRichTextMarkdown {\n        content\n      }\n      ... on ComponentSharedMedia {\n        file {\n          url\n          alternativeText\n        }\n      }\n    }\n    description\n  }\n}\n\nquery Article($slug: String) {\n  articles(filters: {slug: {eq: $slug}}) {\n    cover {\n      alternativeText\n      url\n    }\n    title\n    description\n    blocks {\n      ... on ComponentSharedQuote {\n        body\n        title\n      }\n      ... on ComponentSharedRichText {\n        body\n      }\n      ... on ComponentSharedRichText {\n        body\n      }\n      ... on ComponentSharedSlider {\n        files {\n          alternativeText\n          url\n        }\n      }\n    }\n  }\n}\n\nmutation CreateVolunteer($data: VolunteerInput!) {\n  createVolunteer(data: $data) {\n    name\n    email\n  }\n}\n\nquery Projects {\n  projects {\n    coverImage {\n      alternativeText\n      url\n    }\n    donationsGoal\n    heading\n    description\n    slug\n  }\n}\n\nquery Project($slug: String) {\n  projects(filters: {slug: {eq: $slug}}) {\n    coverImage {\n      alternativeText\n      url\n    }\n    donationsGoal\n    heading\n    body\n    donationsReceived\n    donateButtonLink {\n      link\n    }\n  }\n}\n\nquery ContactPage {\n  contactPage {\n    heading\n    description\n    content\n  }\n}\n\nmutation CreateContactFormEntry($data: ContactFormEntryInput!) {\n  createContactFormEntry(data: $data) {\n    name\n    email\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;