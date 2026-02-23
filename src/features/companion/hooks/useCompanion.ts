/**
 * Hook React Query para obtener el companion del usuario autenticado
 */

import { useQuery } from '@tanstack/react-query';
import { getMyCompanion } from '../api/companion.api';
import { queryKeys } from '@/shared/lib/queryKeys';

export const useMyCompanion = () => {
  return useQuery({
    queryKey: queryKeys.companion.me,
    queryFn: getMyCompanion,
  });
};
