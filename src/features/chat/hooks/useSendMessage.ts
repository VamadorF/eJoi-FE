/**
 * Hook React Query para enviar un mensaje en una sala de chat
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendMessage } from '../api/chat.api';
import { queryKeys } from '@/shared/lib/queryKeys';

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      companionId,
      message,
    }: {
      companionId: string;
      message: string;
    }) => sendMessage({ companionId, message }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chat.messages(variables.companionId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.chat.rooms });
    },
  });
};

