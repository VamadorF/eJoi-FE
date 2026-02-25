/**
 * Hook para obtener el usuario actual usando GET /auth.
 */

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/lib/queryKeys';
import { getAuthSession } from '../api/auth.api';

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: queryKeys.auth.currentUser,
    queryFn: getAuthSession,
    retry: false,
  });

  return {
    data: query.data?.user ?? null,
    isLoading: query.isLoading,
    error: query.error,
    isAuthenticated: query.data?.isAuthenticated ?? false,
  };
};
