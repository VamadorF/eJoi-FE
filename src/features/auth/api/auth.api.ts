/**
 * Servicio de API para autenticación
 * Endpoint principal: POST /auth/provider
 */

import { httpClient } from '@/shared/services/http/client';
import { AuthProviderRequest, AuthProviderResponse, LoginResponse } from '../types';

/**
 * Autentica al usuario mediante un proveedor OAuth.
 * El frontend resuelve el flujo OAuth con el SDK del proveedor (Google/Apple)
 * y envia los datos resultantes al backend.
 *
 * Endpoint: POST /auth/provider
 */
export const loginWithProvider = async (
  data: AuthProviderRequest
): Promise<AuthProviderResponse> => {
  const response = await httpClient.post<AuthProviderResponse>('/auth/provider', data);
  return response.data;
};

/**
 * Cierra sesión.
 * El backend no tiene endpoint de logout, el estado se limpia solo en el cliente
 * (borrar token de SecureStore + limpiar Zustand).
 */
export const logout = async (): Promise<void> => {
  // No-op: el backend no tiene endpoint de logout.
  // La limpieza se hace en auth.store.logout()
};

// ---------------------------------------------------------------------------
// Funciones legacy de OAuth via WebBrowser (mantenidas como fallback)
// El backend actual usa POST /auth/provider como endpoint unificado.
// ---------------------------------------------------------------------------

/*
export const getGoogleAuthUrl = async (): Promise<string> => {
  const response = await httpClient.get<{ authUrl: string }>('/auth/google/url');
  return response.data.authUrl;
};

export const getAppleAuthUrl = async (): Promise<string> => {
  const response = await httpClient.get<{ authUrl: string }>('/auth/apple/url');
  return response.data.authUrl;
};

export const exchangeGoogleCode = async (code: string): Promise<LoginResponse> => {
  const response = await httpClient.post<LoginResponse>('/auth/google/callback', { code });
  return response.data;
};

export const exchangeAppleCode = async (code: string): Promise<LoginResponse> => {
  const response = await httpClient.post<LoginResponse>('/auth/apple/callback', { code });
  return response.data;
};

export const loginWithGoogle = async (
  accessToken: string,
  idToken: string
): Promise<LoginResponse> => {
  const response = await httpClient.post<LoginResponse>('/auth/google', {
    token: accessToken,
    idToken,
  });
  return response.data;
};

export const loginWithApple = async (
  identityToken: string,
  authorizationCode: string
): Promise<LoginResponse> => {
  const response = await httpClient.post<LoginResponse>('/auth/apple', {
    identityToken,
    authorizationCode,
  });
  return response.data;
};

export const refreshToken = async (
  refreshToken: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  const response = await httpClient.post<{ accessToken: string; refreshToken: string }>(
    '/auth/refresh',
    { refreshToken }
  );
  return response.data;
};
*/
