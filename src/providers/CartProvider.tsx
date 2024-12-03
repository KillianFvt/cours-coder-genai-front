import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentCart } from '../services/getCurrentCart.ts';
import { addToCart } from '../services/addToCart.ts';
import { CartItem } from '../types/CartItem.ts';
import {useUser} from "./UserProvider.tsx";

interface CartContextType {
  totalItems: number;
  items: CartItem[];
  addItemToCart: (id: string) => void;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [totalItems, setTotalItems] = useState<number>(0);
  const [items, setItems] = useState<CartItem[]>([]);
  const { reloadUser } = useUser();

  const refreshCart = () => {
    getCurrentCart()
      .then(cart => {
        setTotalItems(cart.totalItems);
        setItems(cart.items);
      })
      .catch(error => {
        console.error('Failed to fetch cart:', error);
      });
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const addItemToCart = (id: string) => {
    addToCart(id)
      .then(success => {
        if (success) {
          return getCurrentCart();
        } else {
          throw new Error('Failed to add item to cart');
        }
      })
      .then(cart => {
        setTotalItems(cart.totalItems);
        setItems(cart.items);
      })
      .catch(error => {
        console.error('Failed to fetch cart:', error);
        reloadUser().then(() => addItemToCart(id));
      });
  };

  return (
    <CartContext.Provider value={{ totalItems, items, addItemToCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};