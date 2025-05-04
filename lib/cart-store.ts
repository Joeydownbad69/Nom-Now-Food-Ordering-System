'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, DeliveryMethod, MenuItem, OrderSummary } from './types';

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  selectedItem: MenuItem | null;
  deliveryMethod: DeliveryMethod;
  deliveryFee: number;
  taxRate: number;
  
  addToCart: (item: MenuItem, quantity: number, specialInstructions?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
  toggleCart: () => void;
  setSelectedItem: (item: MenuItem | null) => void;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  getOrderSummary: () => OrderSummary;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      selectedItem: null,
      deliveryMethod: 'delivery',
      deliveryFee: 3.99,
      taxRate: 0.08,

      addToCart: (item, quantity, specialInstructions) => {
        const { items } = get();
        const existingItemIndex = items.findIndex((i) => i.id === item.id);

        if (existingItemIndex > -1) {
          const newItems = [...items];
          newItems[existingItemIndex].quantity += quantity;
          newItems[existingItemIndex].totalPrice = 
            newItems[existingItemIndex].price * newItems[existingItemIndex].quantity;
          
          if (specialInstructions) {
            newItems[existingItemIndex].specialInstructions = specialInstructions;
          }
          
          set({ items: newItems });
        } else {
          const newItem: CartItem = {
            ...item,
            quantity,
            totalPrice: item.price * quantity,
            specialInstructions
          };
          set({ items: [...items, newItem] });
        }
      },

      removeFromCart: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === itemId) {
              return {
                ...item,
                quantity,
                totalPrice: item.price * quantity,
              };
            }
            return item;
          }),
        }));
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.totalPrice, 0);
      },

      getTax: () => {
        return get().getSubtotal() * get().taxRate;
      },
      
      getTotal: () => {
        const { getSubtotal, getTax, deliveryMethod, deliveryFee } = get();
        const subtotal = getSubtotal();
        const tax = getTax();
        const shipping = deliveryMethod === 'delivery' ? deliveryFee : 0;
        
        return subtotal + tax + shipping;
      },

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      
      setSelectedItem: (item) => set({ selectedItem: item }),
      
      setDeliveryMethod: (method) => set({ deliveryMethod: method }),

      getOrderSummary: () => {
        const { items, getSubtotal, getTax, getTotal, deliveryMethod, deliveryFee } = get();
        
        return {
          items,
          subtotal: getSubtotal(),
          tax: getTax(),
          deliveryFee: deliveryMethod === 'delivery' ? deliveryFee : 0,
          total: getTotal(),
          deliveryMethod
        };
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);