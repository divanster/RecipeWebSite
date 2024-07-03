// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  authTokens: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authTokens, setAuthTokens] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthTokens(token);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setAuthTokens(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthTokens(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authTokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
