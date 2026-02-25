/**
 * Hook para manejo de autenticación
 * Combina Zustand (client state) con React Query (server state)
 */

import { useCallback } from 'react';
import { useAuthStore } from '../store/auth.store';
import { useLoginWithProvider, useLogout as useLogoutMutation } from './useAuthMutations';
import { logger } from '@/shared/utils/logger';
import { AuthProviderRequest } from '../types';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout: logoutStore,
    setLoading,
    setError,
    checkAuth,
  } = useAuthStore();

  const loginWithProviderMutation = useLoginWithProvider();
  const logoutMutation = useLogoutMutation();

  /**
   * Login genérico con proveedor OAuth.
   * El caller es responsable de obtener providerUserId, email y name
   * desde el SDK del proveedor (Google Sign-In, Apple Sign-In).
   */
  const loginWithProviderData = useCallback(async (data: AuthProviderRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await loginWithProviderMutation.mutateAsync(data);

      const userFromResponse = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        provider: data.provider,
      };

      await login(userFromResponse, response.access_token);

      logger.info(`Login exitoso con ${data.provider}`);
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : `Error al iniciar sesión con ${data.provider}`;
      setError(errorMessage);
      logger.error(`Error en login con ${data.provider}:`, error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [login, loginWithProviderMutation, setLoading, setError]);

  /**
   * Inicia sesión con Google.
   * Obtiene los datos del usuario via Google Sign-In SDK
   * y los envía al backend via POST /auth/provider.
   */
  const loginWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Importar dinámicamente para evitar problemas en plataformas sin soporte
      const { signInWithGoogle } = await import('../services/auth.providers');
      const googleResult = await signInWithGoogle();

      if (googleResult.type === 'error' || !googleResult.user) {
        throw new Error(googleResult.error || 'Error en autenticación Google');
      }

      await loginWithProviderData({
        provider: 'google',
        providerUserId: googleResult.user.id,
        email: googleResult.user.email || '',
        name: googleResult.user.name || '',
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión con Google';
      setError(errorMessage);
      logger.error('Error en login con Google:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [loginWithProviderData, setLoading, setError]);

  /**
   * Inicia sesión con Apple.
   * Obtiene los datos del usuario via Apple Sign-In SDK
   * y los envía al backend via POST /auth/provider.
   */
  const loginWithApple = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { signInWithApple } = await import('../services/auth.providers');
      const appleResult = await signInWithApple();

      if (appleResult.type === 'error' || !appleResult.user) {
        throw new Error(appleResult.error || 'Error en autenticación Apple');
      }

      await loginWithProviderData({
        provider: 'apple',
        providerUserId: appleResult.user.id,
        email: appleResult.user.email || '',
        name: appleResult.user.name || '',
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión con Apple';
      setError(errorMessage);
      logger.error('Error en login con Apple:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [loginWithProviderData, setLoading, setError]);

  /**
   * Cierra sesión.
   * Notifica al backend via React Query mutation + limpia estado local.
   */
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await logoutMutation.mutateAsync();
      await logoutStore();
      logger.info('Logout exitoso');
    } catch (error) {
      await logoutStore();
      logger.error('Error en logout:', error);
    } finally {
      setLoading(false);
    }
  }, [logoutStore, logoutMutation, setLoading]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    loginWithGoogle,
    loginWithApple,
    loginWithProviderData,
    logout,
    checkAuth,
  };
};
