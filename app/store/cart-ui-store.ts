import { create } from "zustand";

interface CartUIState {
  isCartOpen: boolean;
  isEditCartOpen: boolean;
  itemBeingEdited: string | null;
  openCart: () => void;
  closeCart: () => void;
  openEditCart: (id: string) => void;
  closeEditCart: () => void;
}

export const useCartUIStore = create<CartUIState>((set) => ({
  isCartOpen: false,
  isEditCartOpen: false,
  itemBeingEdited: null,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  openEditCart: (id) => set({ isEditCartOpen: true, itemBeingEdited: id }),
  closeEditCart: () => set({ isEditCartOpen: false, itemBeingEdited: null }),
}));
