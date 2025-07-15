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
  isLoadingState: boolean;
  isAdmin: boolean;
  isEditor: boolean;
  isViewer: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('access_token'));
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = (token: string, user: User) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAccessToken(token);
    setUser(user);
  };

  const logout = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const isAuthenticated = !!accessToken;
  const isAdmin = user?.role === 'admin';
  const isEditor = user?.role === 'editor';
  const isViewer = user?.role === 'viewer';
  const isLoadingState = isLoading;

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isAuthenticated,
        isLoadingState,
        isAdmin,
        isEditor,
        isViewer,
        login,
        logout,
        setUser,
        setAccessToken
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
