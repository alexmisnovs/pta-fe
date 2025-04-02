import apolloClient from "@/lib/apollo-client";
import { HomePageArticlesDocument } from "@/gql/graphql";
import Link from "next/link";
import Image from "next/image";

export default async function Articles() {
  const { data } = await apolloClient.query({
    query: HomePageArticlesDocument,
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    },
    variables: {
      sort: "publishedAt:desc",
      // sort: "updatedAt:desc",
      pagination: {
        limit: 3,
      },
    },
  });
  // const articles = data.articles;
  // console.log(articles);
  // console.log(articles[0]?.cover?.formats?.thumbnail?.url);
  // return <h1>Articles will go here</h1>;

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-center mb-12">PTA News</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mx-auto">
          {data?.articles?.map(
            article =>
              article && (
                <div key={article.slug} className="h-full">
                  {/* Crucial h-full */}
                  <div className="card bg-custom-blue text-secondary-content h-full shadow-xl">
                    {/* Add h-full */}
                    <div className="card-body flex flex-col gap-4 h-full">
                      {/* Triple h-full */}
                      {/* Author Section */}
                      <div className="flex items-center flex-shrink-0">
                        <div className="avatar">
                          <div className="w-16 rounded-full border-2 border-white">
                            <Image
                              src={article.author?.avatar?.formats?.thumbnail?.url || ""}
                              alt={article.author?.name || ""}
                              width={article.author?.avatar?.formats?.thumbnail?.width || 0}
                              height={article.author?.avatar?.formats?.thumbnail?.height || 0}
                              sizes="(max-width: 768px) 100vw, 800px"
                              className="object-cover"
                              quality={80}
                            />
                            {/* <img src={article.author?.avatar?.url} /> */}
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-lg font-medium leading-tight italic">
                            <span className="text-gray-400">By: </span> {article.author?.name}
                          </p>
                          {/* <small>PTA member dev</small> */}
                        </div>
                      </div>
                      {/* body */}
                      <div className="flex-1 overflow-hidden">
                        <h2 className="text-xl font-semibold mb-3">{article.title}</h2>
                        <figure
                          className={`
                      w-full mx-auto mb-4 
                      md:w-[45%] md:max-w-lg 
                      md:float-left md:mr-8 md:mb-4
                      `}
                        >
                          <div className="relative aspect-video">
                            <Image
                              src={article.cover?.formats?.thumbnail?.url || article.cover?.url}
                              alt={
                                article.cover?.formats?.thumbnail?.alternativeText || article.title
                              }
                              width={article.cover?.formats?.thumbnail?.width || 0}
                              height={article.cover?.formats?.thumbnail?.height || 0}
                              sizes="(max-width: 768px) 100vw, 800px"
                              className="object-cover"
                              quality={80}
                            />
                          </div>
                        </figure>
                        <p className="mb-4 max-w-none ">
                          {/* Fixed height */}
                          {article.description}
                        </p>
                      </div>
                      {/* Date/Time + Button Section */}
                      <div className="mt-auto flex-shrink-0">
                        {/* Push to bottom */}
                        <div className="mb-4">
                          <p className="text-sm">
                            Published on:
                            {/* {new Date(article.publishedAt).toLocaleTimeString("en-GB", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })} */}
                            <span className="mx-2">•</span>
                            {new Date(article.publishedAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                            <span className="mx-2">•</span>
                            In:
                            <span className="text-gray-400"> {article.category?.name}</span>
                          </p>
                        </div>
                        <div className="card-actions justify-end">
                          <Link
                            className="btn bg-custom-red hover:bg-custom-blue text-white font-bold py-2 px-4 rounded border-0"
                            href={`/news/${article.slug}`}
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
        <div className="text-center mt-3">
          <Link
            href="/news"
            className="btn bg-custom-blue hover:bg-custom-blue text-white font-bold mt-4 py-2 px-4 rounded"
          >
            More News
          </Link>
        </div>
      </div>
    </>
  );
}
