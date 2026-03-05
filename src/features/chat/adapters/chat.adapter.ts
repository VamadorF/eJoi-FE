import { ChatHistoryPage, ChatHistoryParams, Message, MessageRole, SendMessageRequest } from '../types';

export type RawMessage = {
  id?: string;
  companionId?: string;
  role?: string;
  message?: string;
  content?: string;
  text?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type RawHistoryResponse = RawMessage[] | { messages?: RawMessage[]; data?: RawMessage[] };
export type RawHistoryPageResponse =
  | RawHistoryResponse
  | {
      nextCursor?: string | null;
      hasMore?: boolean;
      cursor?: string | null;
    };

const toMessageRole = (role?: string): MessageRole => {
  if (role === 'assistant' || role === 'system') {
    return role;
  }
  return 'user';
};

const clampText = (value: string, max: number): string => value.trim().slice(0, max);

const fallbackMessageId = (companionId: string): string =>
  `${companionId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const toChatHistoryQueryParams = (params: ChatHistoryParams): URLSearchParams => {
  const queryParams = new URLSearchParams();
  if (params.companionId) {
    queryParams.append('companionId', params.companionId);
  }
  if (typeof params.limit === 'number') {
    queryParams.append('limit', String(params.limit));
  }
  if (params.cursor) {
    queryParams.append('cursor', params.cursor);
  }
  if (typeof params.offset === 'number') {
    queryParams.append('offset', String(params.offset));
  }
  return queryParams;
};

export const toSendMessageDto = (payload: SendMessageRequest): SendMessageRequest => ({
  message: clampText(payload.message, 2000),
  companionId: payload.companionId,
  useLongTermMemory: payload.useLongTermMemory,
});

export const fromRawMessage = (message: RawMessage, fallbackCompanionId: string): Message => ({
  id: message.id ?? fallbackMessageId(fallbackCompanionId),
  companionId: message.companionId ?? fallbackCompanionId,
  role: toMessageRole(message.role),
  message: message.message ?? message.content ?? message.text ?? '',
  createdAt: message.createdAt ?? new Date().toISOString(),
  updatedAt: message.updatedAt,
});

/** Respuesta del backend POST /chat/message */
export type RawSendMessageResponse = {
  conversationId?: string;
  userMessage?: { id?: string; content?: string; createdAt?: string };
  assistantMessage?: { id?: string; content?: string; createdAt?: string };
};

export interface SendMessageResult {
  userMessage: Message;
  assistantMessage: Message;
}

export const fromSendMessageResponse = (
  data: RawSendMessageResponse,
  companionId: string
): SendMessageResult => {
  const userMsg = data.userMessage ?? {};
  const assistantMsg = data.assistantMessage ?? {};
  return {
    userMessage: fromRawMessage(
      { id: userMsg.id, role: 'user', content: userMsg.content, createdAt: userMsg.createdAt },
      companionId
    ),
    assistantMessage: fromRawMessage(
      {
        id: assistantMsg.id,
        role: 'assistant',
        content: assistantMsg.content,
        createdAt: assistantMsg.createdAt,
      },
      companionId
    ),
  };
};

export const fromRawHistoryResponse = (
  data: RawHistoryResponse,
  fallbackCompanionId: string
): Message[] => {
  const rawMessages = Array.isArray(data)
    ? data
    : Array.isArray(data.messages)
      ? data.messages
      : Array.isArray(data.data)
        ? data.data
        : [];

  return rawMessages.map((item) => fromRawMessage(item, fallbackCompanionId));
};

export const fromRawHistoryPageResponse = (
  data: RawHistoryPageResponse,
  fallbackCompanionId: string,
  requestedLimit: number
): ChatHistoryPage => {
  const hasMessageCollection =
    Array.isArray(data) ||
    ('messages' in data && Array.isArray(data.messages)) ||
    ('data' in data && Array.isArray(data.data));
  const messages = hasMessageCollection
    ? fromRawHistoryResponse(data as RawHistoryResponse, fallbackCompanionId)
    : [];
  const payload = data as { nextCursor?: string | null; hasMore?: boolean; cursor?: string | null };
  const nextCursor = payload.nextCursor ?? payload.cursor ?? null;
  const inferredHasMore = typeof payload.hasMore === 'boolean' ? payload.hasMore : messages.length >= requestedLimit;

  return {
    messages,
    nextCursor,
    hasMore: inferredHasMore,
  };
};
