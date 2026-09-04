import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'https://mynewstyle-server.onrender.com';

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const getToken = () => localStorage.getItem('token');

  const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  });

  const fetchCart = useCallback(async () => {
    if (!user) {
      setCart({ items: [] });
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/cart`, { headers: authHeaders() });
      if (res.ok) {
        const data = await res.json();
        setCart(data);
      }
    } catch (err) {
      console.error('Erreur chargement panier:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Recharge le panier à chaque connexion/déconnexion
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, size, color, quantity = 1) => {
    if (!user) {
      throw new Error('NEED_LOGIN');
    }
    const res = await fetch(`${API_URL}/api/cart/add`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ productId, size, color, quantity }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Erreur lors de l'ajout au panier");
    setCart(data);
    return data;
  };

  const updateQuantity = async (itemId, quantity) => {
    const res = await fetch(`${API_URL}/api/cart/update/${itemId}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify({ quantity }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erreur de mise à jour');
    setCart(data);
    return data;
  };

  const removeFromCart = async (itemId) => {
    const res = await fetch(`${API_URL}/api/cart/remove/${itemId}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erreur de suppression');
    setCart(data);
    return data;
  };

  const clearCart = async () => {
    await fetch(`${API_URL}/api/cart/clear`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    setCart({ items: [] });
  };

  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        cartCount,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart: fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);