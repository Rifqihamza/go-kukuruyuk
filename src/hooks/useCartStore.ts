import { create } from 'zustand';
import { CartItem } from '../types';

interface CartState {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()((set, get) => ({
    items: [],

    addItem: (item) => {
        set((state) => {
            const existingIndex = state.items.findIndex(
                (i) => i.productId === item.productId
            );

            if (existingIndex >= 0) {
                const updatedItems = [...state.items];
                updatedItems[existingIndex] = {
                    ...updatedItems[existingIndex],
                    quantity: updatedItems[existingIndex].quantity + (item.quantity ?? 1),
                };
                return { items: updatedItems };
            }

            return {
                items: [
                    ...state.items,
                    {
                        productId: item.productId,
                        productName: item.productName,
                        price: item.price,
                        image: item.image,
                        quantity: item.quantity ?? 1,
                    },
                ],
            };
        });
    },

    removeItem: (productId) => {
        set((state) => ({
            items: state.items.filter((i) => i.productId !== productId),
        }));
    },

    updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
            get().removeItem(productId);
            return;
        }
        set((state) => ({
            items: state.items.map((i) =>
                i.productId === productId ? { ...i, quantity } : i
            ),
        }));
    },

    clearCart: () => set({ items: [] }),

    getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
    },

    getTotalPrice: () => {
        return get().items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    },
}));