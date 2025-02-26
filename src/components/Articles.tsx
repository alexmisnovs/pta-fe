"use client";

import { useQuery } from "@apollo/client";
import { ArticlesDocument } from "@/gql/graphql";

export default function Articles() {
  const { data } = useQuery(ArticlesDocument);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  // console.log(data);
  return (
    <>
      <section className="py-10 md:py-16 bg-neutral">
        <div className="container">
          <div className="text-center text-white">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">PTA NEWS.</h2>
            <p className="text-lg sm:text-2xl mb-6 md:mb-14">See whats new </p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 lg:gap-8">
            <div className="block mb-8 lg:mb-10">
              <div className="stack">
                <div className="card bg-secondary text-secondary-content">
                  <div className="card-body gap-4">
                    <div className="flex items-center">
                      <div className="avatar flex-shrink-0">
                        <div className="w-16 rounded-full border-2 border-white">
                          <img src="https://placeimg.com/100/100/people" />
                        </div>
                      </div>

                      <div className="ml-3">
                        <p className="text-lg font-medium leading-tight">Eric Ampire</p>
                        <small>Mobile dev</small>
                      </div>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum aliquid quo eum
                      quae quos illo earum ipsa doloribus nostrum minus libero aspernatur laborum
                      cum, a suscipit, ratione ea totam ullam! Lorem ipsum dolor sit amet
                      consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab
                      veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at
                      reprehenderit, veritatis harum et rerum.
                    </p>
                  </div>
                </div>
                <div className="card bg-primary h-10"></div>
                <div className="card bg-warning h-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ul>
        {data?.articles?.map(
          article =>
            article ? (
              <li key={article.slug}>
                {article.title} {article.description} ({article.slug})
              </li>
            ) : null // Skip rendering if article is null
        )}
      </ul>
    </>
  );
}
