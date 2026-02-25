/**
 * Store de autenticación con Zustand
 * Manejo del estado global de autenticación
 */

import { create } from 'zustand';
import { User, AuthState } from '../types';
import { setAuthToken, removeAuthToken, getAuthToken, clearAuthData } from '@/shared/services/storage/secure';

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void;
  login: (user: User, accessToken: string) => Promise<void>;
  logout: () => Promise<void>;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  setUser: (user) => {
    set({
      user,
      isAuthenticated: !!user,
    });
  },

  login: async (user, accessToken) => {
    try {
      await setAuthToken(accessToken);
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Error al iniciar sesión',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      await clearAuthData();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error logging out:', error);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  setLoading: (isLoading) => {
    set({ isLoading });
  },

  setError: (error) => {
    set({ error });
  },

  checkAuth: async () => {
    try {
      const token = await getAuthToken();

      if (token) {
        set({
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error al verificar autenticación',
      });
    }
  },
}));
