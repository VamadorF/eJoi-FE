/**
 * Hook para obtener el usuario actual.
 * El backend no tiene endpoint GET /auth/me, asi que el usuario
 * se obtiene del store de Zustand (guardado durante login).
 *
 * Este hook se mantiene como wrapper por si en el futuro
 * el backend agrega un endpoint de usuario actual.
 */

import { useAuthStore } from '../store/auth.store';

export const useCurrentUser = () => {
  const { user, isAuthenticated } = useAuthStore();
  return { data: user, isLoading: false, error: null, isAuthenticated };
};
