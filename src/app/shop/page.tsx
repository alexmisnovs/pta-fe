import apolloClient from "@/lib/apollo-client";
import { ProductsDocument } from "@/gql/graphql";
import Image from "next/image";

export default async function Page() {
  const { data } = await apolloClient.query({
    query: ProductsDocument,
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    },
  });
  const products = data.products;

  return (
    <div className="container py-8">
      <h1 className="text-4xl mb-8 text-center font-bold text-gray-700">PTA Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map(product => {
          if (!product) return null;
          return (
            <div key={product.name} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">{product.name}</h2>
                {product.image?.formats?.medium?.url && (
                  <figure className="px-4">
                    <Image
                      src={product.image.formats.medium.url}
                      alt={product.name || "Product image"}
                      width={product.image?.formats?.medium?.width ?? 400}
                      height={product.image?.formats?.medium?.height ?? 300}
                      className="rounded-lg object-contain w-full h-64"
                    />
                  </figure>
                )}
                <p className="text-gray-600 mt-4">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-2xl font-bold text-green-600">£{product.price?.toFixed(2)}</p>
                  <a
                    href={product.buyButtonLink?.link ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-custom-red hover:bg-custom-blue text-white border-0"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
