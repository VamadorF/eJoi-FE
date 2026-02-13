/**
 * Hook React Query para guardar datos de onboarding
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveOnboarding } from '../api/onboarding.api';
import { queryKeys } from '@/shared/lib/queryKeys';
import { OnboardingData } from '../types';

export const useSaveOnboarding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OnboardingData) => saveOnboarding(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.onboarding.data });
    },
  });
};

