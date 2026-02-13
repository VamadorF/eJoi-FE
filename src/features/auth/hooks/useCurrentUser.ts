/**
 * Hook React Query para obtener el usuario actual
 * Consume getCurrentUser de auth.api.ts
 */

import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../api/auth.api';
import { queryKeys } from '@/shared/lib/queryKeys';

export const useCurrentUser = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.auth.currentUser,
    queryFn: getCurrentUser,
    enabled,
  });
};

