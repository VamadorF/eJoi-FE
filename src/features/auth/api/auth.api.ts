/**
 * Servicio de API para autenticación
 * Funciones para llamadas al backend NestJS
 * TODO: Conectar con backend cuando esté disponible
 */

import { httpClient } from '@/shared/services/http/client';
import { LoginResponse, User } from '../types';

/**
 * Obtiene la URL de OAuth del backend para Google
 * TODO: Conectar con backend NestJS
 * 
 * Endpoint: GET ${API_URL}/auth/google/url
 * Response: { authUrl: string }
 * 
 * @returns Promise con la URL de autenticación
 */
export const getGoogleAuthUrl = async (): Promise<string> => {
  // TODO: Descomentar cuando el backend esté disponible
  // const response = await httpClient.get<{ authUrl: string }>('/auth/google/url');
  // return response.data.authUrl;
  
  // Placeholder: retornar error hasta que el backend esté disponible
  throw new Error('Backend no disponible. Conectar con NestJS cuando esté listo.');
};

/**
 * Obtiene la URL de OAuth del backend para Apple
 * TODO: Conectar con backend NestJS
 * 
 * Endpoint: GET ${API_URL}/auth/apple/url
 * Response: { authUrl: string }
 * 
 * @returns Promise con la URL de autenticación
 */
export const getAppleAuthUrl = async (): Promise<string> => {
  // TODO: Descomentar cuando el backend esté disponible
  // const response = await httpClient.get<{ authUrl: string }>('/auth/apple/url');
  // return response.data.authUrl;
  
  // Placeholder: retornar error hasta que el backend esté disponible
  throw new Error('Backend no disponible. Conectar con NestJS cuando esté listo.');
};

/**
 * Intercambia el código de autorización por un token
 * TODO: Conectar con backend NestJS
 * 
 * Endpoint: POST ${API_URL}/auth/google/callback
 * Body: { code: string }
 * Response: { user: User, accessToken: string, refreshToken: string }
 * 
 * @param code - Código de autorización obtenido de OAuth
 * @returns Promise con la respuesta del servidor
 */
export const exchangeGoogleCode = async (code: string): Promise<LoginResponse> => {
  // TODO: Descomentar cuando el backend esté disponible
  // const response = await httpClient.post<LoginResponse>('/auth/google/callback', {
  //   code: code,
  // });
  // return response.data;
  
  // Placeholder: retornar error hasta que el backend esté disponible
  throw new Error('Backend no disponible. Conectar con NestJS cuando esté listo.');
};

/**
 * Intercambia el código de autorización por un token (Apple)
 * TODO: Conectar con backend NestJS
 * 
 * Endpoint: POST ${API_URL}/auth/apple/callback
 * Body: { code: string }
 * Response: { user: User, accessToken: string, refreshToken: string }
 * 
 * @param code - Código de autorización obtenido de OAuth
 * @returns Promise con la respuesta del servidor
 */
export const exchangeAppleCode = async (code: string): Promise<LoginResponse> => {
  // TODO: Descomentar cuando el backend esté disponible
  // const response = await httpClient.post<LoginResponse>('/auth/apple/callback', {
  //   code: code,
  // });
  // return response.data;
  
  // Placeholder: retornar error hasta que el backend esté disponible
  throw new Error('Backend no disponible. Conectar con NestJS cuando esté listo.');
};

/**
 * Autentica con Google a través del backend
 * TODO: Conectar con backend NestJS
 * 
 * Endpoint: POST ${API_URL}/auth/google
 * Body: { token: string, idToken: string }
 * Response: { user: User, accessToken: string, refreshToken: string }
 * 
 * @param accessToken - Token de acceso de Google
 * @param idToken - ID token de Google
 * @returns Promise con la respuesta del servidor
 */
export const loginWithGoogle = async (
  accessToken: string,
  idToken: string
): Promise<LoginResponse> => {
  // TODO: Descomentar cuando el backend esté disponible
  // const response = await httpClient.post<LoginResponse>('/auth/google', {
  //   token: accessToken,
  //   idToken: idToken,
  // });
  // return response.data;
  
  // Placeholder: retornar datos mock hasta que el backend esté disponible
  throw new Error('Backend no disponible. Conectar con NestJS cuando esté listo.');
};

/**
 * Autentica con Apple a través del backend
 * TODO: Conectar con backend NestJS
 * 
 * Endpoint: POST ${API_URL}/auth/apple
 * Body: { identityToken: string, authorizationCode: string }
 * Response: { user: User, accessToken: string, refreshToken: string }
 * 
 * @param identityToken - Identity token de Apple
 * @param authorizationCode - Authorization code de Apple
 * @returns Promise con la respuesta del servidor
 */
export const loginWithApple = async (
  identityToken: string,
  authorizationCode: string
): Promise<LoginResponse> => {
  // TODO: Descomentar cuando el backend esté disponible
  // const response = await httpClient.post<LoginResponse>('/auth/apple', {
  //   identityToken: identityToken,
  //   authorizationCode: authorizationCode,
  // });
  // return response.data;
  
  // Placeholder: retornar datos mock hasta que el backend esté disponible
  throw new Error('Backend no disponible. Conectar con NestJS cuando esté listo.');
};

/**
 * Cierra sesión en el backend
 * TODO: Conectar con backend NestJS
 * 
 * Endpoint: POST ${API_URL}/auth/logout
 * Headers: { Authorization: Bearer ${token} }
 * 
 * @returns Promise<void>
 */
export const logout = async (): Promise<void> => {
  // TODO: Descomentar cuando el backend esté disponible
  // await httpClient.post('/auth/logout');
  
  // Placeholder: no hacer nada hasta que el backend esté disponible
};

/**
 * Refresca el token de acceso
 * TODO: Conectar con backend NestJS
 * 
 * Endpoint: POST ${API_URL}/auth/refresh
 * Body: { refreshToken: string }
 * Response: { accessToken: string, refreshToken: string }
 * 
 * @param refreshToken - Token de refresco
 * @returns Promise con los nuevos tokens
 */
export const refreshToken = async (refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> => {
  // TODO: Descomentar cuando el backend esté disponible
  // const response = await httpClient.post<{ accessToken: string; refreshToken: string }>('/auth/refresh', {
  //   refreshToken: refreshToken,
  // });
  // return response.data;
  
  // Placeholder: retornar error hasta que el backend esté disponible
  throw new Error('Backend no disponible. Conectar con NestJS cuando esté listo.');
};

/**
 * Obtiene el usuario actual desde el backend
 * TODO: Conectar con backend NestJS
 * 
 * Endpoint: GET ${API_URL}/auth/me
 * Headers: { Authorization: Bearer ${token} }
 * Response: { user: User }
 * 
 * @returns Promise con el usuario actual
 */
export const getCurrentUser = async (): Promise<User> => {
  // TODO: Descomentar cuando el backend esté disponible
  // const response = await httpClient.get<User>('/auth/me');
  // return response.data;
  
  // Placeholder: retornar error hasta que el backend esté disponible
  throw new Error('Backend no disponible. Conectar con NestJS cuando esté listo.');
};

