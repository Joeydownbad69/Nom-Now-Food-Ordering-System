"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { CartItem } from "@/types/cart";
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartSubtotal: number;
  deliveryFee: number;
  restaurant: { id: number; name: string } | null;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
  cartSubtotal: 0,
  deliveryFee: 0,
  restaurant: null,
});

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [restaurant, setRestaurant] = useState<{ id: number; name: string } | null>(null);
  const [deliveryFee, setDeliveryFee] = useState(2.99);
  const { toast } = useToast();
  
  // Calculate cart totals
  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const cartTotal = cartSubtotal + deliveryFee;
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedRestaurant = localStorage.getItem("restaurant");
    
    if (storedCart) {
      setCartItems(storedCart ? JSON.parse(storedCart) : []);
    }
    
    if (storedRestaurant) {
      setRestaurant(storedRestaurant ? JSON.parse(storedRestaurant) : null);
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    
    if (restaurant) {
      localStorage.setItem("restaurant", JSON.stringify(restaurant));
    }
  }, [cartItems, restaurant]);
  
  const addToCart = (item: Omit<CartItem, "id">) => {
    // Check if adding from a different restaurant
    if (restaurant && item.restaurantId !== restaurant.id) {
      // Show confirmation modal (simplified for demo)
      if (confirm("Adding items from a different restaurant will clear your current cart. Continue?")) {
        setCartItems([{ ...item, id: Date.now() }]);
        setRestaurant({ id: item.restaurantId, name: "Restaurant" }); // In a real app, you'd have the name
      }
    } else {
      // Check if item already exists in cart
      const existingItemIndex = cartItems.findIndex(
        (cartItem) => cartItem.menuItemId === item.menuItemId
      );
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...cartItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        setCartItems(updatedItems);
      } else {
        // Item doesn't exist, add it
        setCartItems([...cartItems, { ...item, id: Date.now() }]);
        
        // Set restaurant if not already set
        if (!restaurant) {
          setRestaurant({ id: item.restaurantId, name: "Restaurant" }); // In a real app, you'd have the name
        }
      }
      
      // Show success toast
      toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart.`,
      });
    }
  };
  
  const removeFromCart = (itemId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
    
    // If cart is empty, clear restaurant
    if (cartItems.length === 1) {
      setRestaurant(null);
      localStorage.removeItem("restaurant");
    }
  };
  
  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
    setRestaurant(null);
    localStorage.removeItem("cart");
    localStorage.removeItem("restaurant");
  };
  
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartTotal,
        deliveryFee,
        restaurant,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}