import { createStorefrontApiClient } from "@shopify/storefront-api-client";

export const shopifyClient = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN!,
  apiVersion: process.env.SHOPIFY_API_VERSION!,
  publicAccessToken: process.env.SHOPIFY_PUBLIC_STOREFRONT_API!,
});

export default shopifyClient;