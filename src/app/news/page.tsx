import Link from "next/link";
import apolloClient from "@/lib/apollo-client";
import { ArticlesDocument } from "@/gql/graphql";

export default async function Page() {
  const { data } = await apolloClient.query({
    query: ArticlesDocument,
    context: {
      fetchOptions: {
        next: { revalidate: 600 },
      },
    },
    // variables: {
    //   slug: "pta-school-disco",
    // },
  });
  const articles = data.articles;
  // console.log(data.articles);
  // return <h1>articles will go here</h1>;

  return (
    <div className="container">
      <h1 className="text-4xl mb-6 font-bold text-gray-700">PTA News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {articles.map(article => {
          if (!article) return null;
          // if (!article?.cover?.url) return null;
          return (
            <Link
              className="group grid grid-cols-[140px_1fr] bg-white shadow rounded-lg overflow-hidden relative hover:bg-gradient-to-r from-white to-amber-50"
              key={article.slug}
              href={`/news/${article.slug}`}
            >
              <div className="relative overflow-hidden">
                {article.cover?.url && (
                  <img
                    className="transition duration-300 absolute inset-0 h-full w-full object-cover group-hover:scale-125 group-hover:rotate-12"
                    src={article.cover.url}
                  />
                )}
              </div>

              <div className="p-4">
                <p className="text-xl text-gray-600 font-bold group-hover:text-gray-700">
                  {article.title}
                </p>
                <p className="text-sm text-gray-500 leading-6">{article.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
