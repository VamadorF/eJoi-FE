/**
 * Servicio de API para Chat
 * Funciones puras para llamadas al backend NestJS
 */

import { httpClient } from '@/shared/services/http/client';
import { ChatHistoryParams, ChatRoom, Message, MessageRole, SendMessageRequest } from '../types';

type RawMessage = {
  id?: string;
  companionId?: string;
  role?: string;
  message?: string;
  content?: string;
  text?: string;
  createdAt?: string;
  updatedAt?: string;
};

type RawHistoryResponse = RawMessage[] | { messages?: RawMessage[]; data?: RawMessage[] };

const toMessageRole = (role?: string): MessageRole => {
  if (role === 'assistant' || role === 'system') {
    return role;
  }
  return 'user';
};

const normalizeMessage = (message: RawMessage, fallbackCompanionId: string): Message => ({
  id: message.id ?? `${fallbackCompanionId}-${Date.now()}`,
  companionId: message.companionId ?? fallbackCompanionId,
  role: toMessageRole(message.role),
  message: message.message ?? message.content ?? message.text ?? '',
  createdAt: message.createdAt ?? new Date().toISOString(),
  updatedAt: message.updatedAt,
});

const extractHistory = (data: RawHistoryResponse): RawMessage[] => {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.messages)) {
    return data.messages;
  }

  if (Array.isArray(data.data)) {
    return data.data;
  }

  return [];
};

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
  const params = new URLSearchParams({ companionId });
  if (typeof limit === 'number') {
    params.append('limit', String(limit));
  }

  const response = await httpClient.get<RawHistoryResponse>(`/chat/history?${params.toString()}`);
  return extractHistory(response.data).map((item) => normalizeMessage(item, companionId));
};

/**
 * Envía un mensaje al companion.
 *
 * Endpoint: POST /chat/message
 * Body: { companionId, message }
 * Response: Message
 */
export const sendMessage = async (data: SendMessageRequest): Promise<Message> => {
  const response = await httpClient.post<RawMessage>('/chat/message', data);
  return normalizeMessage(response.data, data.companionId);
};

