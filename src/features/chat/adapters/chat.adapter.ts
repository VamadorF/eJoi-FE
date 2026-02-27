import { ChatHistoryParams, Message, MessageRole, SendMessageRequest } from '../types';

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
