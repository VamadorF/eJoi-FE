import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/features/auth/store/auth.store';
import {
  initPurchaseListeners,
  cleanupPurchaseListeners,
} from '@/features/subscription/services/purchaseListener.service';

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

  // Purchase listeners: montar cuando el usuario está autenticado, limpiar al desmontar o logout
  useEffect(() => {
    if (isAuthenticated) {
      initPurchaseListeners();
    }
    return () => {
      cleanupPurchaseListeners();
    };
  }, [isAuthenticated]);

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

