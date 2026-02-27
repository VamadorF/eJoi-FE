/**
 * Tipos para feature Chat
 */

export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  companionId: string;
  role: MessageRole;
  message: string;
  createdAt: string;
  updatedAt?: string;
  deliveryStatus?: 'pending' | 'sent' | 'failed';
  clientMessageId?: string;
}

export interface ChatHistoryParams {
  companionId?: string;
  limit?: number;
  cursor?: string;
  offset?: number;
}

export interface ChatHistoryPage {
  messages: Message[];
  nextCursor?: string | null;
  hasMore: boolean;
}

export interface SendMessageRequest {
  companionId?: string;
  message: string;
  useLongTermMemory?: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  lastMessage?: Message;
  unreadCount: number;
}

