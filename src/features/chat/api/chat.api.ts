/**
 * Servicio de API para Chat
 * Funciones puras para llamadas al backend NestJS
 * TODO: Conectar con backend cuando esté disponible
 */

import { httpClient } from '@/shared/services/http/client';
import { ChatRoom, Message } from '../types';

/**
 * Obtiene la lista de salas de chat del usuario
 * 
 * Endpoint: GET ${API_URL}/chat/rooms
 * Response: ChatRoom[]
 */
export const getChatRooms = async (): Promise<ChatRoom[]> => {
  // TODO: Descomentar cuando el backend esté disponible
  // const response = await httpClient.get<ChatRoom[]>('/chat/rooms');
  // return response.data;

  throw new Error('Backend no disponible. Conectar con NestJS cuando esté listo.');
};

/**
 * Obtiene los mensajes de una sala de chat
 * 
 * Endpoint: GET ${API_URL}/chat/rooms/:roomId/messages
 * Response: Message[]
 * 
 * @param roomId - ID de la sala de chat
 */
export const getChatMessages = async (roomId: string): Promise<Message[]> => {
  // TODO: Descomentar cuando el backend esté disponible
  // const response = await httpClient.get<Message[]>(`/chat/rooms/${roomId}/messages`);
  // return response.data;

  throw new Error('Backend no disponible. Conectar con NestJS cuando esté listo.');
};

/**
 * Envía un mensaje a una sala de chat
 * 
 * Endpoint: POST ${API_URL}/chat/rooms/:roomId/messages
 * Body: { content: string }
 * Response: Message
 * 
 * @param roomId - ID de la sala de chat
 * @param content - Contenido del mensaje
 */
export const sendMessage = async (roomId: string, content: string): Promise<Message> => {
  // TODO: Descomentar cuando el backend esté disponible
  // const response = await httpClient.post<Message>(`/chat/rooms/${roomId}/messages`, { content });
  // return response.data;

  throw new Error('Backend no disponible. Conectar con NestJS cuando esté listo.');
};

