/**
 * Hook React Query para enviar un mensaje en una sala de chat
 */

import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { sendMessage } from '../api/chat.api';
import { queryKeys } from '@/shared/lib/queryKeys';
import { ChatHistoryPage, Message } from '../types';

const updateMessageInPages = (
  data: InfiniteData<ChatHistoryPage> | undefined,
  predicate: (message: Message) => boolean,
  updater: (message: Message) => Message
): InfiniteData<ChatHistoryPage> | undefined => {
  if (!data) {
    return data;
  }

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      messages: page.messages.map((message) => (predicate(message) ? updater(message) : message)),
    })),
  };
};

const appendMessageToLastPage = (
  data: InfiniteData<ChatHistoryPage> | undefined,
  newMessage: Message
): InfiniteData<ChatHistoryPage> | undefined => {
  if (!data || data.pages.length === 0) {
    return {
      pageParams: [undefined],
      pages: [{ messages: [newMessage], hasMore: false, nextCursor: null }],
    };
  }

  const lastPageIndex = data.pages.length - 1;
  const lastPage = data.pages[lastPageIndex];
  const alreadyExists = lastPage.messages.some((m) => m.id === newMessage.id);

  if (alreadyExists) {
    return data;
  }

  return {
    ...data,
    pages: data.pages.map((page, index) =>
      index === lastPageIndex
        ? { ...page, messages: [...page.messages, newMessage] }
        : page
    ),
  };
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      companionId,
      message,
      useLongTermMemory,
    }: {
      companionId?: string;
      message: string;
      useLongTermMemory?: boolean;
      clientMessageId?: string;
    }) => sendMessage({ companionId, message, useLongTermMemory }),
    onMutate: async (variables) => {
      const companionKey = variables.companionId ?? 'default';
      const queryKey = queryKeys.chat.messages(companionKey);
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<InfiniteData<ChatHistoryPage>>(queryKey);

      const optimisticMessage: Message = {
        id: `local-${variables.clientMessageId ?? Date.now()}`,
        clientMessageId: variables.clientMessageId,
        companionId: companionKey,
        role: 'user',
        message: variables.message,
        createdAt: new Date().toISOString(),
        deliveryStatus: 'pending',
      };

      queryClient.setQueryData<InfiniteData<ChatHistoryPage>>(queryKey, (currentData) => {
        if (!currentData || currentData.pages.length === 0) {
          return {
            pageParams: [undefined],
            pages: [{ messages: [optimisticMessage], hasMore: false, nextCursor: null }],
          };
        }

        const hasExistingClientMessage = currentData.pages.some((page) =>
          page.messages.some((message) => message.clientMessageId === variables.clientMessageId)
        );
        if (hasExistingClientMessage) {
          return updateMessageInPages(
            currentData,
            (message) => message.clientMessageId === variables.clientMessageId,
            (message) => ({ ...message, deliveryStatus: 'pending' })
          );
        }

        const lastPageIndex = currentData.pages.length - 1;
        return {
          ...currentData,
          pages: currentData.pages.map((page, index) =>
            index === lastPageIndex
              ? { ...page, messages: [...page.messages, optimisticMessage] }
              : page
          ),
        };
      });

      return { previousData, queryKey, clientMessageId: variables.clientMessageId };
    },
    onError: (_error, _variables, context) => {
      if (!context) {
        return;
      }

      queryClient.setQueryData<InfiniteData<ChatHistoryPage>>(context.queryKey, (currentData) =>
        updateMessageInPages(
          currentData,
          (message) => message.clientMessageId === context.clientMessageId,
          (message) => ({ ...message, deliveryStatus: 'failed' })
        )
      );
    },
    onSuccess: (data, variables) => {
      const companionKey = variables.companionId ?? 'default';
      const queryKey = queryKeys.chat.messages(companionKey);

      queryClient.setQueryData<InfiniteData<ChatHistoryPage>>(queryKey, (currentData) => {
        // 1) Marcar mensaje del usuario como enviado (y actualizar id real si viene del backend)
        let updated = updateMessageInPages(
          currentData,
          (message) => message.clientMessageId === variables.clientMessageId,
          (message) => ({
            ...message,
            id: data.userMessage.id ?? message.id,
            deliveryStatus: 'sent' as const,
          })
        );
        // 2) Añadir respuesta del assistant al cache para que aparezca de inmediato
        updated = appendMessageToLastPage(updated, data.assistantMessage);
        return updated;
      });

      queryClient.invalidateQueries({ queryKey: queryKeys.chat.rooms });
    },
  });
};

