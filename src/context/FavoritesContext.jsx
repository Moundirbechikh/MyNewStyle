import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'https://mynewstyle-server.onrender.com';

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]); // liste de produits complets
  const [loading, setLoading] = useState(false);

  const getToken = () => localStorage.getItem('token');
  const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  });

  const fetchFavorites = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/favorites`, { headers: authHeaders() });
      if (res.ok) {
        const data = await res.json();
        setFavorites(data);
      }
    } catch (err) {
      console.error('Erreur chargement favoris:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  // Bascule un produit dans/hors des favoris, met à jour l'état local immédiatement
  const toggleFavorite = async (productId) => {
    if (!user) {
      throw new Error('NEED_LOGIN');
    }
    const res = await fetch(`${API_URL}/api/favorites/toggle/${productId}`, {
      method: 'POST',
      headers: authHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erreur');

    // Recharge la liste complète pour avoir les objets produits à jour
    await fetchFavorites();
    return data.isFavorite;
  };

  const isFavorite = (productId) => favorites.some((p) => p._id === productId);

  return (
    <FavoritesContext.Provider
      value={{ favorites, loading, toggleFavorite, isFavorite, refreshFavorites: fetchFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);