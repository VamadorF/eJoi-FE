/**
 * Hook React Query para obtener los datos de onboarding
 */

import { useQuery } from '@tanstack/react-query';
import { getOnboarding } from '../api/onboarding.api';
import { queryKeys } from '@/shared/lib/queryKeys';

export const useOnboarding = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.onboarding.data,
    queryFn: getOnboarding,
    enabled,
  });
};

