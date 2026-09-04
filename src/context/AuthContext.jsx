import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'https://mynewstyle-server.onrender.com';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          localStorage.removeItem('token');
        }
      } catch (err) {
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      // Compte pas encore vérifié : on remonte l'info pour que Login.jsx
      // puisse rediriger vers la page de vérification
      if (res.status === 403 && data.needsVerification) {
        const err = new Error(data.message || 'Compte non vérifié');
        err.needsVerification = true;
        err.email = data.email;
        throw err;
      }
      throw new Error(data.message || 'Erreur de connexion');
    }

    localStorage.setItem('token', data.token);
    setUser(data);
    return data;
  };

  // Ne connecte PLUS automatiquement : le compte doit être vérifié d'abord.
  // Retourne { needsVerification: true, email } pour rediriger vers /verify-email
  const register = async (formData) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Erreur lors de l'inscription");
    }

    return data; // { message, email, needsVerification: true }
  };

  // Valide le code reçu par email, connecte automatiquement si succès
  const verifyEmail = async (email, code) => {
    const res = await fetch(`${API_URL}/api/auth/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Code invalide');
    }

    localStorage.setItem('token', data.token);
    setUser(data);
    return data;
  };

  const resendCode = async (email) => {
    const res = await fetch(`${API_URL}/api/auth/resend-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Erreur lors du renvoi du code');
    }

    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, verifyEmail, resendCode }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);