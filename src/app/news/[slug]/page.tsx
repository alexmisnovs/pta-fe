import apolloClient from "@/lib/apollo-client";
import { ArticleDocument } from "@/gql/graphql";
// import { Metadata } from "next";

import Link from "next/link";
import Image from "next/image";
import BlockRenderer from "@/components/utility/BlockRenderer";
import { Block } from "@/types/blocks";
// import ReactMarkdown from "react-markdown";

export const dynamicParams = true;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const { data, error } = await apolloClient.query({
    query: ArticleDocument,
    variables: {
      slug: slug,
    },
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    },
  });

  if (error) return { title: "Events: SaintModwens Catholic School PTA" };
  const article = data.articles[0];
  return {
    title: article?.title,
    description: article?.description,
    openGraph: {
      images: [article?.cover?.url],
      type: "website",
      title: article?.title,
      description: article?.description,
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;

  const { data } = await apolloClient.query({
    query: ArticleDocument,
    variables: {
      slug: slug,
    },
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    },
  });

  const article = data.articles[0];

  if (!article) return <h1>Article not found</h1>;
  // console.log(article.blocks);

  const processedBlocks = article?.blocks?.map(block => ({
    __typename: block?.__typename, // Ensure this exists in response
    ...block,
  })) as Block[]; // Type assertion here if needed

  return (
    <div className=" bg-white px-8 pb-10">
      <div className="text-white relative bg-custom-blue px-14 py-16 -mx-8 -mt-7">
        <h2 className="text-3xl font-bold relative z-30">{article.title}</h2>

        <Image
          className="object-cover absolute top-0 bottom-0 left-1/2 right-0 block w-1/2 h-full opacity-50 filter grayscale"
          src={article?.cover?.url as string}
          alt={article.title || "Article cover image"}
          fill
          priority
        />
        <div className="absolute z-20 w-80 bg-gradient-to-r from-custom-blue to-transparent h-full top-0 bottom-0 left-1/2"></div>
      </div>

      <div className="transform -translate-y-1/2">
        <Link
          href="/news"
          className="text-sm bg-custom-red text-white hover:bg-custom-blue hover:text-white inline-block rounded-lg py-3 px-5"
        >
          &laquo; Back to news
        </Link>
      </div>
      {/* Render blocks in original order */}
      <div className="container">
        <BlockRenderer blocks={processedBlocks ?? []} className="space-y-8" />
      </div>
    </div>
  );
}
