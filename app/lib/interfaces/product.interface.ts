export interface Product {
    product: ProductInfo;
  }

  export interface ProductInfo {
    id: string;
    title: string;
    description: string;
    vendor: string;
    totalInventory: number;
    tags: string[];
    collections: ProductCollections
    translations: ProductTranslation[];
    metafields: ProductMetafields[];
    variants: Variant;
    media: MediaImage;
  }
  
  export interface ProductCollections {
    edges: {
      node: {
        id: string;
        title: string;
        handle: string;
      };
    }[];
  }
  
  export interface ProductTranslation {
    key: string;
    value: string;
  }
  
  export interface ProductMetafields {
    key: string;
    type: "string";
    value: string
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
        price: {
          amount: string
          currenyCode:string
        }
        inventoryItem: {
          id: string;
        };
        quantityAvailable: number;
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
    data: Product;
    extensions: [];
  }
  