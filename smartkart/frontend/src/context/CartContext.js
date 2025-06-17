import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Ensure the parsed data is an array
        return Array.isArray(parsedCart) ? parsedCart : [];
      }
      return [];
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    if (!product || !product._id) {
      console.error('Invalid product data:', product);
      return;
    }

    setCartItems(prevItems => {
      // Ensure prevItems is always an array
      const items = Array.isArray(prevItems) ? prevItems : [];
      
      const existingItem = items.find(item => item._id === product._id);
      
      if (existingItem) {
        return items.map(item =>
          item._id === product._id
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
      } else {
        return [...items, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const items = Array.isArray(prevItems) ? prevItems : [];
      return items.filter(item => item._id !== productId);
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => {
      const items = Array.isArray(prevItems) ? prevItems : [];
      return items.map(item =>
        item._id === productId
          ? { ...item, quantity }
          : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    const items = Array.isArray(cartItems) ? cartItems : [];
    return items.reduce((total, item) => {
      const price = item.price || 0;
      const quantity = item.quantity || 0;
      return total + (price * quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    const items = Array.isArray(cartItems) ? cartItems : [];
    return items.reduce((count, item) => count + (item.quantity || 0), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems: Array.isArray(cartItems) ? cartItems : [],
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 