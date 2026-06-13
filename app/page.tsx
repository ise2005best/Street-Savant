import { notFound } from "next/navigation";
import ProductPage from "./components/product-page";
import { ProductNode } from "./lib/interfaces/products.interface";
import shopifyClient from "./lib/shopify-queries/shopify";
import { GET_PRODUCTS_QUERY } from "./graphql/getAllProduct";

export default async function AllProductsPage() {
 const {data, errors} = await shopifyClient.request(GET_PRODUCTS_QUERY)
  const product:ProductNode = data.products

  if (errors) {
    notFound();
  }

  return (
    <ProductPage
      products={product}
      heroImage1="https://cdn.shopify.com/s/files/1/0718/1035/1259/files/1_5.png?v=1781354602"
      heroImage2="https://cdn.shopify.com/s/files/1/0718/1035/1259/files/1_4.png?v=1781354597"
      heroImage3="https://cdn.shopify.com/s/files/1/0718/1035/1259/files/1_7.png?v=1781371943"

    />
  );
}