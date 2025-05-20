import Link from "next/link";
import apolloClient from "@/lib/apollo-client";
import { ArticlesDocument } from "@/gql/graphql";
import Image from "next/image";

export default async function Page({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  // Await searchParams before accessing its properties
  const resolvedParams = await searchParams;
  const category = resolvedParams.category;

  const { data } = await apolloClient.query({
    query: ArticlesDocument,
    context: {
      fetchOptions: {
        next: { revalidate: 10 },
      },
    },
    variables: category
      ? {
          filters: {
            category: {
              name: {
                eq: category,
              },
            },
          },
        }
      : undefined,
  });

  // Sort articles by date (newest first)
  const articles = [...data.articles].sort((a, b) => {
    if (!a || !b) return 0;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  // Extract all unique categories for the filter UI
  // We need to fetch all categories separately since we're now filtering articles
  const { data: categoryData } = await apolloClient.query({
    query: ArticlesDocument, // You might want to create a dedicated CategoriesDocument query
    context: {
      fetchOptions: {
        next: { revalidate: 3600 }, // Cache categories longer
      },
    },
  });

  const allArticles = categoryData.articles || [];
  const categories = Array.from(
    new Set(allArticles.map(article => article?.category?.name).filter(Boolean) as string[])
  );

  return (
    <div className="container mb-10">
      <h1 className="text-4xl mb-6 text-center font-bold text-gray-700 pt-6">PTA News</h1>

      {/* Category filter links */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <Link
          href="/news"
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            !category
              ? "bg-custom-blue text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          All Categories
        </Link>
        {categories.map(cat => (
          <Link
            key={cat}
            href={`/news?category=${encodeURIComponent(cat)}`}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              category === cat
                ? "bg-custom-blue text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {articles.map(article => {
          if (!article) return null;
          // if (!article?.cover?.url) return null;
          return (
            <Link
              className="group flex flex-col bg-white shadow rounded-lg overflow-hidden relative hover:bg-gradient-to-r from-white to-amber-50"
              key={article.slug}
              href={`/news/${article.slug}`}
            >
              <div className="relative overflow-hidden h-[200px]">
                {article.cover?.url && (
                  <Image
                    className="transition duration-300 object-cover group-hover:scale-125 group-hover:rotate-12"
                    src={article.cover?.formats?.medium?.url}
                    alt={article.title || "News article image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={true}
                  />
                )}
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                  <span>{article.category?.name}</span>
                  <span>{new Date(article.publishedAt).toLocaleDateString("en-GB")}</span>
                </div>

                <h3 className="text-xl text-gray-600 font-bold group-hover:text-gray-700 mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 leading-6 mb-4">{article.description}</p>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-sm text-gray-500">By {article.author?.name}</span>
                  <button className="btn bg-custom-blue hover:bg-custom-red text-white font-bold py-2 px-4 rounded border-0">
                    Read More
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No articles found in this category.</p>
          <Link href="/news" className="text-custom-blue hover:underline mt-2 inline-block">
            View all articles
          </Link>
        </div>
      )}
    </div>
  );
}
