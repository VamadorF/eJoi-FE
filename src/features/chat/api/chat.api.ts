/**
 * Servicio de API para Chat
 * Funciones puras para llamadas al backend NestJS
 */

import { httpClient } from '@/shared/services/http/client';
import { ChatHistoryParams, ChatRoom, Message, SendMessageRequest } from '../types';
import {
  fromRawHistoryResponse,
  fromRawMessage,
  RawHistoryResponse,
  RawMessage,
  toChatHistoryQueryParams,
  toSendMessageDto,
} from '../adapters/chat.adapter';

/**
 * Obtiene la lista de salas de chat del usuario
 * 
 * Endpoint: GET ${API_URL}/chat/rooms
 * Response: ChatRoom[]
 */
export const getChatRooms = async (): Promise<ChatRoom[]> => {
  throw new Error('GET /chat/rooms no existe en backend actual.');
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
}: ChatHistoryParams): Promise<Message[]> => {
  const fallbackCompanionId = companionId ?? 'default';
  const params = toChatHistoryQueryParams({ companionId, limit });
  const query = params.toString();
  const endpoint = query ? `/chat/history?${query}` : '/chat/history';
  const response = await httpClient.get<RawHistoryResponse>(endpoint);
  return fromRawHistoryResponse(response.data, fallbackCompanionId);
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

