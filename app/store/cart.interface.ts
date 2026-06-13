export type cartProps = {
    id: string;
    productId: string;
    productName: string;
    dateCreated?: string;
    quantity: number;
    variant: string;
    currencyCode: string;
    price: number;
    vendor: string;
    variantId: string;
    imageUrl: string;
}

export type Actions = {
    addToCart: (cartItem: cartProps) => void;
    removeItem: (id: string) => void;
    updateItemQuantity: (id: string, quantity: number) => void;
    getCart: () => cartProps[];
    clearCart: () => void;
}