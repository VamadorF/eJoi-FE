/**
 * Hook React Query para crear un companion
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCompanion } from '../api/companion.api';
import { queryKeys } from '@/shared/lib/queryKeys';
import { CreateCompanionRequest } from '../types';

export const useCreateCompanion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCompanionRequest) => createCompanion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companion.me });
    },
  });
};
