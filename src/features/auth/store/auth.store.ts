/**
 * Store de autenticación con Zustand
 * Manejo del estado global de autenticación
 */

import { create } from 'zustand';
import { User, AuthState } from '../types';
import { setAuthToken, removeAuthToken, getAuthToken } from '@/shared/services/storage/secure';

interface AuthStore extends AuthState {
  // Actions
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  login: (user: User, accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  // Actions
  setUser: (user) => {
    set({
      user,
      isAuthenticated: !!user,
    });
  },

  setTokens: async (accessToken, refreshToken) => {
    try {
      await setAuthToken(accessToken);
      // TODO: Guardar refreshToken cuando esté disponible
      // await setRefreshToken(refreshToken);
    } catch (error) {
      console.error('Error saving tokens:', error);
      throw error;
    }
  },

  login: async (user, accessToken, refreshToken) => {
    try {
      await get().setTokens(accessToken, refreshToken);
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
      await removeAuthToken();
      // TODO: Llamar a logout del backend cuando esté disponible
      // await logout();
      
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error logging out:', error);
      // Aún así, limpiar el estado local
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
      console.log('checkAuth: Starting...');
      const token = await getAuthToken();
      console.log('checkAuth: Token retrieved:', token ? 'exists' : 'not found');
      
      if (token) {
        // TODO: Validar token con el backend cuando esté disponible
        // const user = await getCurrentUser();
        // get().setUser(user);
        
        // Por ahora, solo verificar que existe el token
        console.log('checkAuth: Setting authenticated state');
        set({
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        console.log('checkAuth: No token, setting unauthenticated state');
        set({
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('checkAuth: Error occurred:', error);
      // Si hay error, asumir que no está autenticado
      set({
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error al verificar autenticación',
      });
    }
  },
}));

