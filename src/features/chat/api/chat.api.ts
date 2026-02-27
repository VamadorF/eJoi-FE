/**
 * Servicio de API para Chat
 * Funciones puras para llamadas al backend NestJS
 */

import { ApiError, httpClient } from '@/shared/services/http/client';
import { ChatHistoryPage, ChatHistoryParams, ChatRoom, Message, SendMessageRequest } from '../types';
import {
  fromRawHistoryPageResponse,
  fromRawMessage,
  RawHistoryPageResponse,
  RawMessage,
  toChatHistoryQueryParams,
  toSendMessageDto,
} from '../adapters/chat.adapter';

/**
 * Obtiene la lista de salas de chat del usuario
 *
 * Endpoint: GET ${API_URL}/chat/rooms
 * Response: ChatRoom[]
 *
 * Nota: El backend no expone este endpoint aún. Retorna [] hasta que esté disponible.
 */
export const getChatRooms = async (): Promise<ChatRoom[]> => {
  return [];
};

/**
 * Obtiene historial de chat de un companion.
 *
 * Endpoint: GET /chat/history?companionId=...&limit=...
 * Response: Message[]
 */
export const getChatMessages = async ({
  companionId,
  limit,
  cursor,
  offset,
}: ChatHistoryParams): Promise<ChatHistoryPage> => {
  const fallbackCompanionId = companionId ?? 'default';
  const pageLimit = limit ?? 50;
  const emptyHistoryPage: ChatHistoryPage = {
    messages: [],
    hasMore: false,
    nextCursor: null,
  };
  const params = toChatHistoryQueryParams({ companionId, limit: pageLimit, cursor, offset });
  const query = params.toString();
  const endpoint = query ? `/chat/history?${query}` : '/chat/history';
  try {
    const response = await httpClient.get<RawHistoryPageResponse>(
      endpoint,
      undefined,
      { suppressFatalBoundary: typeof offset === 'number' && !cursor }
    );
    return fromRawHistoryPageResponse(response.data, fallbackCompanionId, pageLimit);
  } catch (error) {
    if (error instanceof ApiError && error.status >= 500 && typeof offset === 'number' && !cursor) {
      const fallbackParams = toChatHistoryQueryParams({ companionId, limit: pageLimit });
      const fallbackQuery = fallbackParams.toString();
      const fallbackEndpoint = fallbackQuery ? `/chat/history?${fallbackQuery}` : '/chat/history';
      try {
        const fallbackResponse = await httpClient.get<RawHistoryPageResponse>(
          fallbackEndpoint,
          undefined,
          { suppressFatalBoundary: true }
        );
        return fromRawHistoryPageResponse(fallbackResponse.data, fallbackCompanionId, pageLimit);
      } catch (fallbackError) {
        if (
          fallbackError instanceof ApiError &&
          (fallbackError.status >= 500 || fallbackError.status === 404 || fallbackError.status === 0)
        ) {
          return emptyHistoryPage;
        }
        throw fallbackError;
      }
    }
    if (
      error instanceof ApiError &&
      (error.status >= 500 || error.status === 404 || error.status === 0)
    ) {
      return emptyHistoryPage;
    }
    throw error;
  }
};

/**
 * Envía un mensaje al companion.
 *
 * Endpoint: POST /chat/message
 * Body: { companionId, message }
 * Response: Message
 */
export const sendMessage = async (data: SendMessageRequest): Promise<Message> => {
  const response = await httpClient.post<RawMessage>('/chat/message', toSendMessageDto(data));
  return fromRawMessage(response.data, data.companionId ?? 'default');
};

