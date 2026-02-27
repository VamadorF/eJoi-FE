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
} from '../types';
import {
  fromAuthApiResponse,
  fromAuthSessionApiResponse,
  RawAuthResponse,
  RawSessionResponse,
  toProviderAuthDto,
} from '../adapters/auth.adapter';

export const loginWithCredentials = async (
  credentials: LoginCredentialsRequest
): Promise<AuthLoginResponse> => {
  const response = await httpClient.post<RawAuthResponse>('/auth/login', credentials);
  return fromAuthApiResponse(response.data);
};

export const loginWithGoogle = async (data: GoogleLoginRequest): Promise<AuthLoginResponse> => {
  const response = await httpClient.post<RawAuthResponse>('/auth/google', toProviderAuthDto(data));
  return fromAuthApiResponse(response.data);
};

export const loginWithApple = async (data: AppleLoginRequest): Promise<AuthLoginResponse> => {
  const response = await httpClient.post<RawAuthResponse>('/auth/apple', toProviderAuthDto(data));
  return fromAuthApiResponse(response.data);
};

/**
 * Endpoint legacy mantenido por compatibilidad con backend previos.
 */
export const loginWithProvider = async (
  data: AuthProviderRequest
): Promise<AuthProviderResponse> => {
  const response = await httpClient.post<RawAuthResponse>('/auth/provider', toProviderAuthDto(data));
  return fromAuthApiResponse(response.data);
};

export const getAuthSession = async (): Promise<AuthSessionResponse> => {
  const response = await httpClient.get<RawSessionResponse>('/auth');
  return fromAuthSessionApiResponse(response.data);
};

export const logout = async (): Promise<void> => {
  // No-op: el backend no expone logout por ahora.
};
