/**
 * Query Keys centralizadas para React Query
 * Evita strings mágicos y facilita invalidación de cache
 */

export const queryKeys = {
  auth: {
    currentUser: ['auth', 'currentUser'] as const,
  },
  companion: {
    me: ['companion', 'me'] as const,
    list: ['companions'] as const,
  },
  chat: {
    rooms: ['chat', 'rooms'] as const,
    messages: (roomId: string) => ['chat', 'messages', roomId] as const,
  },
  onboarding: {
    data: ['onboarding'] as const,
  },
} as const;

