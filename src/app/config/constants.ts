/**
 * Constantes globales de la aplicación
 */

export const APP_NAME = 'eJoi';

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  ONBOARDING_COMPLETED: 'onboarding_completed',
} as const;

export const ROUTES = {
  LOGIN: '/login',
  MAIN: '/main',
  CHAT: '/chat',
  COMPANION: '/companion',
  ONBOARDING: '/onboarding',
} as const;

export const API_ENDPOINTS = {
  // Auth endpoints (comentados hasta que el backend esté disponible)
  // AUTH: {
  //   GOOGLE: '/auth/google',
  //   APPLE: '/auth/apple',
  //   LOGOUT: '/auth/logout',
  //   REFRESH: '/auth/refresh',
  // },
} as const;

