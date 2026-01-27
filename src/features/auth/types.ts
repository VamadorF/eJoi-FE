/**
 * Tipos TypeScript para autenticación
 */

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  provider: 'google' | 'apple';
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface GoogleAuthResult {
  type: 'success' | 'error';
  accessToken?: string;
  idToken?: string;
  user?: User; // Usar el tipo User completo
  error?: string;
}

export interface AppleAuthResult {
  type: 'success' | 'error';
  identityToken?: string;
  authorizationCode?: string;
  accessToken?: string; // Token obtenido del backend después del intercambio
  user?: User; // Usar el tipo User completo
  error?: string;
}

