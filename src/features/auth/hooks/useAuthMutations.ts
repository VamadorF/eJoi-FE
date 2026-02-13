/**
 * Hooks React Query para mutations de autenticación
 * Login (Google/Apple) y Logout
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginWithGoogle, loginWithApple, logout } from '../api/auth.api';
import { queryKeys } from '@/shared/lib/queryKeys';

/**
 * Mutation para login con Google
 * Invalida la query de currentUser al tener éxito
 */
export const useLoginWithGoogle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ accessToken, idToken }: { accessToken: string; idToken: string }) =>
      loginWithGoogle(accessToken, idToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.currentUser });
    },
  });
};

/**
 * Mutation para login con Apple
 * Invalida la query de currentUser al tener éxito
 */
export const useLoginWithApple = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ identityToken, authorizationCode }: { identityToken: string; authorizationCode: string }) =>
      loginWithApple(identityToken, authorizationCode),
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

