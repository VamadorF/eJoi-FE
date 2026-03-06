import { AuthLoginResponse, AuthProviderRequest, AuthSessionResponse, User } from '../types';

export type RawAuthResponse = {
  code?: number;
  access_token?: string;
  accessToken?: string;
  token?: string;
  user?: User | null;
  data?: RawAuthResponse;
  result?: RawAuthResponse;
  auth?: RawAuthResponse;
};

export type RawSessionResponse = {
  code?: number;
  status?: string;
  isAuthenticated?: boolean;
  authenticated?: boolean;
  user?: User | null;
  data?: RawSessionResponse;
  session?: RawSessionResponse;
};

const trimOptional = (value?: string): string | undefined => {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
};

export const toProviderAuthDto = (payload: AuthProviderRequest): AuthProviderRequest => ({
  provider: payload.provider,
  providerUserId: payload.providerUserId.trim().slice(0, 191),
  email: trimOptional(payload.email),
  name: trimOptional(payload.name),
  avatarUrl: trimOptional(payload.avatarUrl),
  idToken: trimOptional(payload.idToken),
  identityToken: trimOptional(payload.identityToken),
});

export const fromAuthApiResponse = (data: RawAuthResponse): AuthLoginResponse => {
  const payload = data.data ?? data.result ?? data.auth ?? data;
  const accessToken = payload.accessToken || payload.access_token || payload.token;

  if (!accessToken) {
    throw new Error('El backend no devolvio un access token valido');
  }

  if (!payload.user) {
    throw new Error('El backend no devolvio informacion del usuario');
  }

  return {
    code: payload.code ?? data.code,
    accessToken,
    access_token: payload.access_token,
    user: payload.user,
  };
};

export const fromAuthSessionApiResponse = (data: RawSessionResponse): AuthSessionResponse => {
  const payload = data.data ?? data.session ?? data;
  const hasOkStatus = payload.code === 200 && payload.status === 'ok';
  const isAuthenticated =
    hasOkStatus || !!payload.isAuthenticated || !!payload.authenticated || !!payload.user;

  return {
    code: payload.code ?? data.code,
    status: payload.status ?? data.status,
    isAuthenticated,
    user: isAuthenticated ? payload.user ?? null : null,
  };
};
