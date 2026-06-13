export interface Products {
  cursor: string;
  node: ProductInfo;
}

export interface ProductInfo {
  id: string;
  title: string;
  description: string;
  handle: string;
  vendor: string;
  totalInventory: number;
  tags: string[];
  metafields: ProductMetafields;
  variants: Variant;
  media: MediaImage;
}

export interface ProductMetafields {
  edges: {
    node: {
      key: string;
      value: string;
      reference: {
        image: {
          url: string;
        };
      };
    };
  }[];
}

export interface InventoryLevel {
  quantities: {
    quantity: number;
  }[];
}

export interface Variant {
  edges: {
    node: {
      id: string;
      title: string;
      inventoryItem: {
        id: string;
        inventoryLevel: InventoryLevel;
      };
      price: string;
      contextualPricing?: {
        price: {
          amount: number;
          currencyCode: string;
        };
      };
    };
  }[];
}

export interface MediaImage {
  edges: {
    node: {
      id: string;
      image: {
        url: string;
      };
    };
  }[];
}

export interface ProductNode {
  edges: Products[];
  extensions: [];
}
