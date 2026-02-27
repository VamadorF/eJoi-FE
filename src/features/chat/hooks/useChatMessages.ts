/**
 * Hook React Query para obtener mensajes de una sala de chat
 */

import { useInfiniteQuery } from '@tanstack/react-query';
import { getChatMessages } from '../api/chat.api';
import { queryKeys } from '@/shared/lib/queryKeys';
import { isValidUuid } from '@/shared/utils/uuid';

export const useChatMessages = (companionId?: string, limit?: number) => {
  const effectiveCompanionId = companionId ?? 'default';
  const pageLimit = limit ?? 30;

  return useInfiniteQuery({
    queryKey: queryKeys.chat.messages(effectiveCompanionId),
    enabled: Boolean(companionId) && isValidUuid(companionId),
    initialPageParam: { cursor: undefined as string | undefined, offset: 0 },
    queryFn: ({ pageParam }) =>
      getChatMessages({
        companionId,
        limit: pageLimit,
        cursor: pageParam.cursor,
        offset: pageParam.offset,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) {
        return undefined;
      }

      if (lastPage.nextCursor) {
        return {
          cursor: lastPage.nextCursor,
          offset: allPages.reduce((acc, page) => acc + page.messages.length, 0),
        };
      }

      return {
        cursor: undefined,
        offset: allPages.reduce((acc, page) => acc + page.messages.length, 0),
      };
    },
    select: (data) => ({
      ...data,
      flatMessages: data.pages.flatMap((page) => page.messages),
    }),
  });
};

