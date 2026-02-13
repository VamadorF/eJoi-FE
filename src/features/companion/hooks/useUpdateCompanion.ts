/**
 * Hook React Query para actualizar un companion
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCompanion } from '../api/companion.api';
import { queryKeys } from '@/shared/lib/queryKeys';
import { Companion } from '../types';

export const useUpdateCompanion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Companion> }) =>
      updateCompanion(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companion.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.companion.list });
    },
  });
};

