/**
 * Servicio de API para autenticación.
 * Soporta login local, OAuth directo y verificación de sesión.
 */

import { httpClient } from '@/shared/services/http/client';
import {
  AppleLoginRequest,
  AuthLoginResponse,
  AuthProviderRequest,
  AuthProviderResponse,
  AuthSessionResponse,
  GoogleLoginRequest,
  LoginCredentialsRequest,
  User,
} from '../types';

type RawAuthResponse = {
  code?: number;
  access_token?: string;
  accessToken?: string;
  token?: string;
  user?: User | null;
};

type RawSessionResponse = {
  isAuthenticated?: boolean;
  authenticated?: boolean;
  user?: User | null;
};

const normalizeAuthResponse = (data: RawAuthResponse): AuthLoginResponse => {
  const accessToken = data.accessToken || data.access_token || data.token;

  if (!accessToken) {
    throw new Error('El backend no devolvio un access token valido');
  }

  if (!data.user) {
    throw new Error('El backend no devolvio informacion del usuario');
  }

  return {
    code: data.code,
    accessToken,
    access_token: data.access_token,
    user: data.user,
  };
};

const normalizeSessionResponse = (data: RawSessionResponse): AuthSessionResponse => {
  const isAuthenticated = data.isAuthenticated ?? data.authenticated ?? !!data.user;
  return {
    isAuthenticated,
    user: isAuthenticated ? data.user ?? null : null,
  };
};

export const loginWithCredentials = async (
  credentials: LoginCredentialsRequest
): Promise<AuthLoginResponse> => {
  const response = await httpClient.post<RawAuthResponse>('/auth/login', credentials);
  return normalizeAuthResponse(response.data);
};

export const loginWithGoogle = async (data: GoogleLoginRequest): Promise<AuthLoginResponse> => {
  const response = await httpClient.post<RawAuthResponse>('/auth/google', data);
  return normalizeAuthResponse(response.data);
};

export const loginWithApple = async (data: AppleLoginRequest): Promise<AuthLoginResponse> => {
  const response = await httpClient.post<RawAuthResponse>('/auth/apple', data);
  return normalizeAuthResponse(response.data);
};

/**
 * Endpoint legacy mantenido por compatibilidad con backend previos.
 */
export const loginWithProvider = async (
  data: AuthProviderRequest
): Promise<AuthProviderResponse> => {
  const response = await httpClient.post<RawAuthResponse>('/auth/provider', data);
  return normalizeAuthResponse(response.data);
};

export const getAuthSession = async (): Promise<AuthSessionResponse> => {
  const response = await httpClient.get<RawSessionResponse>('/auth');
  return normalizeSessionResponse(response.data);
};

export const logout = async (): Promise<void> => {
  // No-op: el backend no expone logout por ahora.
};
