import React from 'react';
import { CartProvider } from './CartProvider.tsx';

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
};