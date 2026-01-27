/**
 * Hook para manejo de autenticación
 * Consume el store de Zustand y los servicios de auth
 */

import { useCallback } from 'react';
import { useAuthStore } from '../store/auth.store';
import { signInWithGoogle, signInWithApple } from '../services/auth.providers';
import { loginWithGoogle as loginWithGoogleAPI, loginWithApple as loginWithAppleAPI } from '../services/auth.api';
import { logger } from '@/shared/utils/logger';

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

  /**
   * Inicia sesión con Google
   * Flujo: Backend genera URL → WebBrowser abre sesión → Extrae código → Intercambia por token
   */
  const loginWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // El flujo completo se maneja en signInWithGoogle:
      // 1. Obtiene URL del backend
      // 2. Abre WebBrowser.openAuthSessionAsync()
      // 3. Extrae código de la redirección
      // 4. Intercambia código por token en el backend
      const googleResult = await signInWithGoogle();

      if (googleResult.type === 'error' || !googleResult.accessToken) {
        throw new Error(googleResult.error || 'Error en autenticación Google');
      }

      // El backend ya procesó todo, solo necesitamos guardar los datos
      const user = googleResult.user || {
        id: '1',
        email: 'user@example.com',
        name: 'Usuario Google',
        provider: 'google' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await login(
        user,
        googleResult.accessToken,
        'refresh-token' // El backend debería proporcionar esto
      );

      logger.info('Login exitoso con Google');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión con Google';
      setError(errorMessage);
      logger.error('Error en login con Google:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [login, setLoading, setError]);

  /**
   * Inicia sesión con Apple
   * Flujo: 
   * - iOS: expo-apple-authentication nativo
   * - Web/Android: Backend genera URL → WebBrowser abre sesión → Extrae código → Intercambia por token
   */
  const loginWithApple = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // El flujo completo se maneja en signInWithApple:
      // Para iOS: usa expo-apple-authentication directamente
      // Para Web/Android: Backend genera URL → WebBrowser → Extrae código → Intercambia por token
      const appleResult = await signInWithApple();

      if (appleResult.type === 'error') {
        throw new Error(appleResult.error || 'Error en autenticación Apple');
      }

      // Para iOS, tenemos identityToken directamente
      // Para Web/Android, el backend ya procesó el código y devolvió el token
      const accessToken = appleResult.accessToken || appleResult.identityToken || appleResult.authorizationCode || 'apple-token';

      const user = appleResult.user || {
        id: '2',
        email: 'user@example.com',
        name: 'Usuario Apple',
        provider: 'apple' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await login(
        user,
        accessToken,
        'refresh-token' // El backend debería proporcionar esto
      );

      logger.info('Login exitoso con Apple');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión con Apple';
      setError(errorMessage);
      logger.error('Error en login con Apple:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [login, setLoading, setError]);

  /**
   * Cierra sesión
   */
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await logoutStore();
      logger.info('Logout exitoso');
    } catch (error) {
      logger.error('Error en logout:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [logoutStore, setLoading]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    loginWithGoogle,
    loginWithApple,
    logout,
    checkAuth,
  };
};

