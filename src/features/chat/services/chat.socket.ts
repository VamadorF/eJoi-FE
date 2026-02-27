import { Socket } from 'socket.io-client';
import { Message } from '../types';

export const CHAT_SOCKET_EVENTS = {
  joinConversation: 'conversation:join',
  leaveConversation: 'conversation:leave',
  messageNew: 'message:new',
  messageSent: 'message:sent',
  messageSend: 'message:send',
  typingStart: 'typing:start',
  typingStop: 'typing:stop',
} as const;

interface ConversationPayload {
  companionId: string;
}

interface SendMessagePayload {
  companionId: string;
  message: string;
  clientMessageId?: string;
}

type MessageListener = (message: Message) => void;
type TypingListener = (payload: { companionId: string }) => void;

const safeEmit = (socket: Socket | null, event: string, payload: unknown): void => {
  if (!socket?.connected) {
    return;
  }
  socket.emit(event, payload);
};

const subscribe = <TPayload,>(
  socket: Socket | null,
  event: string,
  handler: (payload: TPayload) => void
): (() => void) => {
  if (!socket) {
    return () => undefined;
  }
  socket.on(event, handler);
  return () => socket.off(event, handler);
};

export const joinConversation = (socket: Socket | null, companionId: string): void => {
  safeEmit(socket, CHAT_SOCKET_EVENTS.joinConversation, { companionId } satisfies ConversationPayload);
};

export const leaveConversation = (socket: Socket | null, companionId: string): void => {
  safeEmit(socket, CHAT_SOCKET_EVENTS.leaveConversation, { companionId } satisfies ConversationPayload);
};

export const sendMessageEvent = (socket: Socket | null, payload: SendMessagePayload): void => {
  safeEmit(socket, CHAT_SOCKET_EVENTS.messageSend, payload);
};

export const onMessageNew = (socket: Socket | null, listener: MessageListener): (() => void) =>
  subscribe<Message>(socket, CHAT_SOCKET_EVENTS.messageNew, listener);

export const onMessageSent = (socket: Socket | null, listener: MessageListener): (() => void) =>
  subscribe<Message>(socket, CHAT_SOCKET_EVENTS.messageSent, listener);

export const onTypingStart = (socket: Socket | null, listener: TypingListener): (() => void) =>
  subscribe<{ companionId: string }>(socket, CHAT_SOCKET_EVENTS.typingStart, listener);

export const onTypingStop = (socket: Socket | null, listener: TypingListener): (() => void) =>
  subscribe<{ companionId: string }>(socket, CHAT_SOCKET_EVENTS.typingStop, listener);

