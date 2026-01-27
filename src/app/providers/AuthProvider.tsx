import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/features/auth/store/auth.store';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isAuthenticated, user, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    console.log('AuthProvider mounted, calling checkAuth...');
    checkAuth().catch((error) => {
      console.error('Error in checkAuth:', error);
    });
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
  };

  console.log('AuthProvider render:', { isAuthenticated, isLoading, hasUser: !!user });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

