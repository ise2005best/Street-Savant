import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { cartProps, Actions } from './cart.interface';


export const useCartStore = create(
    persist<Actions & {cartItems: cartProps[]}>(
        (set,get) => ({
            cartItems: [],
            addToCart:(cartItem: cartProps) => {
                const cartItems = get().getCart();
                const existingItem = cartItems.find(item => item.productId === cartItem.productId && item.variantId === cartItem.variantId);
                if (existingItem) {
                    // Update the quantity of the existing item
                    set({ 
                        cartItems: cartItems.map(item => 
                            item.productId === cartItem.productId  && item.variantId === cartItem.variantId
                                ? { ...item, quantity: item.quantity + 1 } 
                                : item
                        ) 
                    });
                    // Need to create the cart component and let it reflect the changes
                } else {
                    const newItem = {
                        ...cartItem,
                        dateCreated: new Date().toISOString(),
                    };
                    // Need to create the cart component and let it reflect the changes
                    set({ cartItems: [...cartItems, newItem] });
                }
            },

            updateItemQuantity(id, quantity) {
                // if quantity is less than 1, remove the item from the cart
                if(quantity < 1){
                    get().removeItem(id);
                }

                const cartItems = get().getCart();
                // Find the item in the cart
                const item = cartItems.find(item => item.productId === id);
                if(item){
                    // Update the quantity of the item
                    // need to create the cart component and let it reflect the changes
                    set({ cartItems: cartItems.map(item => 
                        item.productId === id 
                            ? { ...item, quantity: quantity } 
                            : item
                    ) });
                }

            },

            removeItem: (id: string) => {
                // use variant id to remove the item from the cart
                const cartItems = get().getCart();
                const updatedCart = cartItems.filter(item => item.variantId !== id);
                set({cartItems: updatedCart});
            },

            clearCart: () => {
                set({ cartItems: [] });
            },

            getCart: () => {
                return get().cartItems;
            },




        }),{
            name: 'cart-storage',
            // changed cart storage to session storage due to high flunctuation of cart prices and exchange rates
            storage: createJSONStorage(() => sessionStorage),
        }
)
)

