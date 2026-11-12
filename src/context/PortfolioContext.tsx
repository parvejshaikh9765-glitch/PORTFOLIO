import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, AdminUser } from '../types';

interface PortfolioContextType {
  data: PortfolioData | null;
  loading: boolean;
  error: string | null;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  token: string | null;
  adminUser: AdminUser | null;
  login: (token: string, user: AdminUser) => void;
  logout: () => void;
  reloadPublicData: () => Promise<void>;
  currentPath: string;
  navigate: (path: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [token, setToken] = useState<string | null>(localStorage.getItem('admin_token'));
  const [adminUser, setAdminUser] = useState<AdminUser | null>(
    localStorage.getItem('admin_user') ? JSON.parse(localStorage.getItem('admin_user')!) : null
  );
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  // Synchronize browser history and path
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch public data
  const reloadPublicData = async () => {
    try {
      const res = await fetch('/api/public/data');
      if (!res.ok) throw new Error('Failed to load portfolio data');
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching public portfolio data:', err);
      setError(err.message || 'An error occurred while loading data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadPublicData();
  }, []);

  // Verify stored token on mount
  useEffect(() => {
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) throw new Error('Token expired');
          return res.json();
        })
        .then(user => {
          setAdminUser(user);
          localStorage.setItem('admin_user', JSON.stringify(user));
        })
        .catch(() => {
          logout();
        });
    }
  }, [token]);

  // Handle Theme Toggle
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const login = (newToken: string, user: AdminUser) => {
    setToken(newToken);
    setAdminUser(user);
    localStorage.setItem('admin_token', newToken);
    localStorage.setItem('admin_user', JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setAdminUser(null);
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        loading,
        error,
        theme,
        toggleTheme,
        token,
        adminUser,
        login,
        logout,
        reloadPublicData,
        currentPath,
        navigate
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
