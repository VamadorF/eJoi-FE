/**
 * Hooks React Query para mutations de autenticación
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  loginWithApple,
  loginWithCredentials,
  loginWithGoogle,
  loginWithProvider,
  logout,
} from '../api/auth.api';
import { queryKeys } from '@/shared/lib/queryKeys';
import {
  AppleLoginRequest,
  AuthProviderRequest,
  GoogleLoginRequest,
  LoginCredentialsRequest,
} from '../types';

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

export const useLoginWithCredentials = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentialsRequest) => loginWithCredentials(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.currentUser });
    },
  });
};

export const useLoginWithGoogle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GoogleLoginRequest) => loginWithGoogle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.currentUser });
    },
  });
};

export const useLoginWithApple = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AppleLoginRequest) => loginWithApple(data),
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
