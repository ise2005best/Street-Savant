export const GET_ONE_PRODUCT = `
query getProductById($handle: String!) {
  product(handle: $handle) {
    id
    title
    description
    vendor
    tags
    totalInventory
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          quantityAvailable
          price {
            amount
            currencyCode
          }
        }
      }
    }
    metafields(identifiers: [
      { namespace: "custom", key: "product_details" }
    ]) {
      key
      value
      type
    }
    media(first: 7) {
      edges {
        node {
          ... on MediaImage {
            id
            image {
              url
            }
          }
        }
      }
    }
  }
}`;