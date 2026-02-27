/**
 * Hook para manejo de autenticación
 * Combina Zustand (client state) con React Query (server state)
 */

import { useCallback } from 'react';
import { useAuthStore } from '../store/auth.store';
import {
  useLoginWithApple,
  useLoginWithCredentials,
  useLoginWithGoogle,
  useLoginWithProvider,
  useLogout as useLogoutMutation,
} from './useAuthMutations';
import { logger } from '@/shared/utils/logger';
import { AuthProviderRequest, LoginCredentialsRequest } from '../types';

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
  const loginWithCredentialsMutation = useLoginWithCredentials();
  const loginWithGoogleMutation = useLoginWithGoogle();
  const loginWithAppleMutation = useLoginWithApple();
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

      await login(userFromResponse, response.accessToken);

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

  const loginWithCredentials = useCallback(async (credentials: LoginCredentialsRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await loginWithCredentialsMutation.mutateAsync(credentials);

      const userFromResponse = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
      };

      await login(userFromResponse, response.accessToken);
      logger.info('Login local exitoso');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesion';
      setError(errorMessage);
      logger.error('Error en login local:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [login, loginWithCredentialsMutation, setError, setLoading]);

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

      if (!googleResult.idToken) {
        throw new Error('No se recibio idToken de Google');
      }

      const response = await loginWithGoogleMutation.mutateAsync({
        idToken: googleResult.idToken,
        accessToken: googleResult.accessToken,
      });

      await login(
        {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          provider: 'google',
        },
        response.accessToken
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión con Google';
      setError(errorMessage);
      logger.error('Error en login con Google:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [login, loginWithGoogleMutation, setError, setLoading]);

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

      if (!appleResult.identityToken) {
        throw new Error('No se recibio identityToken de Apple');
      }

      const response = await loginWithAppleMutation.mutateAsync({
        identityToken: appleResult.identityToken,
        authorizationCode: appleResult.authorizationCode,
      });

      await login(
        {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          provider: 'apple',
        },
        response.accessToken
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión con Apple';
      setError(errorMessage);
      logger.error('Error en login con Apple:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [login, loginWithAppleMutation, setError, setLoading]);

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
    loginWithCredentials,
    loginWithGoogle,
    loginWithApple,
    loginWithProviderData,
    logout,
    checkAuth,
  };
};
