import { notFound } from "next/navigation";
import ProductDetailPage from "./product.client";
import YouMayAlsoLike from "./youMayAlsoLike";
import shopifyClient from "@/app/lib/shopify-queries/shopify";
import { GET_ONE_PRODUCT } from "@/app/graphql/getOneProduct";
import { GET_PRODUCTS_QUERY } from "@/app/graphql/getAllProduct";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [{ data: productData }, { data: allProductsData }] = await Promise.all([
    shopifyClient.request(GET_ONE_PRODUCT, { variables: { handle: id } }),
    shopifyClient.request(GET_PRODUCTS_QUERY),
  ]);

  const product = productData?.product;
  const related = allProductsData?.products?.edges?.find(
    ({ node }: { node: { handle: string } }) => node.handle !== id
  );

  if (!product) notFound();

  return (
    <div className="bg-white">
      <ProductDetailPage product={product} />
      {related && <YouMayAlsoLike products={related} />}
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data } = await shopifyClient.request(GET_ONE_PRODUCT, {
    variables: { handle: id },
  });

  const product = data?.product;

  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.title} Souljier Store`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.media?.edges[0]?.node?.image?.url],
    },
    alternatives: {
      canonical: `https://souljier.com/product/${id}`,
    },
  };
}