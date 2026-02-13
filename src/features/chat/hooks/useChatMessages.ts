/**
 * Hook React Query para obtener mensajes de una sala de chat
 */

import { useQuery } from '@tanstack/react-query';
import { getChatMessages } from '../api/chat.api';
import { queryKeys } from '@/shared/lib/queryKeys';

export const useChatMessages = (roomId: string) => {
  return useQuery({
    queryKey: queryKeys.chat.messages(roomId),
    queryFn: () => getChatMessages(roomId),
    enabled: !!roomId,
  });
};

