/**
 * Hook React Query para enviar un mensaje en una sala de chat
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendMessage } from '../api/chat.api';
import { queryKeys } from '@/shared/lib/queryKeys';

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roomId, content }: { roomId: string; content: string }) =>
      sendMessage(roomId, content),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chat.messages(variables.roomId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.chat.rooms });
    },
  });
};

