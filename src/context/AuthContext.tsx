import { _post } from '@/utils/crudService';
import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  username: string;
  role: 'viewer' | 'editor' | 'admin';
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isEditor: boolean;
  isViewer: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('access_token'));
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (token: string, user: User) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAccessToken(token);
    setUser(user);
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('access_token');

      if (token) {
        const res:any = await _post("auth/logout",{});
        toast.success(res.message)
      }
    } catch (err) {
      console.error("Logout API call failed:", err);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      setAccessToken(null);
      setUser(null);
    }
  };

  const isAuthenticated = !!accessToken;
  const isAdmin = user?.role === 'admin';
  const isEditor = user?.role === 'editor';
  const isViewer = user?.role === 'viewer';

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isAuthenticated,
        isAdmin,
        isEditor,
        isViewer,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used inside AuthProvider');
  return context;
};
