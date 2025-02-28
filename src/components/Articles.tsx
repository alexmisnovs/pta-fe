import apolloClient from "@/lib/apollo-client";
import { HomePageArticlesDocument } from "@/gql/graphql";

export default async function Articles() {
  const { data } = await apolloClient.query({
    query: HomePageArticlesDocument,
    context: {
      fetchOptions: {
        next: { revalidate: 600 },
      },
    },
    variables: {
      sort: "publishedAt:desc",
      pagination: {
        limit: 3,
      },
    },
  });
  // const articles = data.articles;
  // console.log(articles);
  // return <h1>Articles will go here</h1>;

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <section className="py-10 md:py-16">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">PTA NEWS.</h2>
            <p className="text-lg sm:text-2xl mb-6 md:mb-14">See whats new </p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 lg:gap-8">
            <ul>
              {data?.articles?.map(
                article =>
                  article ? (
                    <div key={article.slug} className="block mb-8 lg:mb-10">
                      <div className="stack">
                        {/* start of the news card */}
                        <div className="card bg-secondary text-secondary-content">
                          <div className="card-body gap-4">
                            <div className="flex items-center">
                              <div className="avatar flex-shrink-0">
                                <div className="w-16 rounded-full border-2 border-white">
                                  <img src={article.author?.avatar?.url} />
                                </div>
                              </div>

                              <div className="ml-3">
                                <p className="text-lg font-medium leading-tight">
                                  {article.author?.name}
                                </p>
                                <small>PTA member dev</small>
                              </div>
                            </div>
                            <p>
                              {article.title} {article.description} ({article.slug})
                              {new Date(article.publishedAt).toLocaleTimeString("en-GB", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                              {new Date(article.publishedAt).toLocaleDateString("en-GB", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="card bg-primary h-10"></div>
                        <div className="card bg-warning h-10"></div>
                      </div>
                    </div>
                  ) : null // Skip rendering if article is null
              )}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
