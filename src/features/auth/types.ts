/**
 * Tipos TypeScript para autenticación
 */

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  provider?: 'google' | 'apple';
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentialsRequest {
  username: string;
  password: string;
}

export interface AuthProviderRequest {
  provider: 'google' | 'apple';
  providerUserId: string;
  email: string;
  name: string;
}

export interface GoogleLoginRequest {
  idToken: string;
  accessToken?: string;
}

export interface AppleLoginRequest {
  identityToken: string;
  authorizationCode?: string;
}

export interface AuthLoginResponse {
  code?: number;
  accessToken: string;
  access_token?: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export type AuthProviderResponse = AuthLoginResponse;

export interface AuthSessionResponse {
  isAuthenticated: boolean;
  user: User | null;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
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
  user?: User;
  error?: string;
}

export interface AppleAuthResult {
  type: 'success' | 'error';
  identityToken?: string;
  authorizationCode?: string;
  accessToken?: string;
  user?: User;
  error?: string;
}
