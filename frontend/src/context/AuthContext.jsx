import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('forkful_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('forkful_token');
    } catch {
      return null;
    }
  });

  const persist = useCallback((nextUser, nextToken) => {
    setUser(nextUser);
    setToken(nextToken);
    if (nextToken) {
      localStorage.setItem('forkful_token', nextToken);
      localStorage.setItem('forkful_user', JSON.stringify(nextUser));
    } else {
      localStorage.removeItem('forkful_token');
      localStorage.removeItem('forkful_user');
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await api.login({ email, password });
    persist(data.user, data.token);
    return data;
  }, [persist]);

  const register = useCallback(async (username, email, password) => {
    const data = await api.register({ username, email, password });
    persist(data.user, data.token);
    return data;
  }, [persist]);

  const logout = useCallback(() => {
    persist(null, null);
  }, [persist]);

  const updateLocalUser = useCallback((partial) => {
    setUser((prev) => {
      const next = { ...prev, ...partial };
      try { localStorage.setItem('forkful_user', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  // Verify the stored token is still valid on first load.
  useEffect(() => {
    if (!token) return;
    api.me().catch(() => persist(null, null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    register,
    logout,
    updateLocalUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
