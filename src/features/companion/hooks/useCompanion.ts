/**
 * Hook React Query para obtener datos de un companion
 */

import { useQuery } from '@tanstack/react-query';
import { getCompanion } from '../api/companion.api';
import { queryKeys } from '@/shared/lib/queryKeys';

export const useCompanion = (id: string) => {
  return useQuery({
    queryKey: queryKeys.companion.detail(id),
    queryFn: () => getCompanion(id),
    enabled: !!id,
  });
};

