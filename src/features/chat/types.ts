/**
 * Tipos para feature Chat
 * TODO: Implementar cuando la feature esté disponible
 */

export interface Message {
  id: string;
  content: string;
  senderId: string;
  roomId: string;
  createdAt: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  lastMessage?: Message;
  unreadCount: number;
}

