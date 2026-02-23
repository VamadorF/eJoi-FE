/**
 * Hook React Query para actualizar el companion
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCompanion } from '../api/companion.api';
import { queryKeys } from '@/shared/lib/queryKeys';
import { UpdateCompanionRequest } from '../types';

export const useUpdateCompanion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCompanionRequest) => updateCompanion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companion.me });
    },
  });
};
