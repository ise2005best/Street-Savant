export const GET_PRODUCTS_QUERY = `{
  products(first: 10) {
    edges {
      cursor
      node {
        id
        title
        tags
        handle
        vendor
        variants(first: 5) {
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
        media(first: 3) {
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
    }
  }
}`;
