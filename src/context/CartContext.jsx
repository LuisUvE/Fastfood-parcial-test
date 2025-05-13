// src/context/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto para el carrito
const CartContext = createContext();

// El proveedor de carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para acceder al carrito
export const useCart = () => {
  return useContext(CartContext);
};
