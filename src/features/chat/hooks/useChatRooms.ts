/**
 * Hook React Query para obtener la lista de salas de chat
 */

import { useQuery } from '@tanstack/react-query';
import { getChatRooms } from '../api/chat.api';
import { queryKeys } from '@/shared/lib/queryKeys';

export const useChatRooms = () => {
  return useQuery({
    queryKey: queryKeys.chat.rooms,
    queryFn: getChatRooms,
  });
};

