/**
 * Hooks React Query para mutations de autenticación
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginWithProvider, logout } from '../api/auth.api';
import { queryKeys } from '@/shared/lib/queryKeys';
import { AuthProviderRequest } from '../types';

/**
 * Mutation para login con proveedor OAuth (Google/Apple)
 * Envía los datos del proveedor al backend unificado POST /auth/provider
 */
export const useLoginWithProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AuthProviderRequest) => loginWithProvider(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.currentUser });
    },
  });
};

/**
 * Mutation para logout
 * Limpia toda la cache de React Query al cerrar sesión
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
