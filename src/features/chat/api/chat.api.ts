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
  // #region agent log
  fetch('http://127.0.0.1:7658/ingest/39857839-993a-4106-aeaf-5c248ccc31b2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'eaafaf'},body:JSON.stringify({sessionId:'eaafaf',runId:'chat500-dbg-1',hypothesisId:'H5',location:'chat.api.ts:getChatMessages:request',message:'requesting chat history',data:{endpoint,hasCursor:Boolean(cursor),offset:offset??null,limit:pageLimit},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  try {
    const response = await httpClient.get<RawHistoryPageResponse>(
      endpoint,
      undefined,
      { suppressFatalBoundary: typeof offset === 'number' && !cursor }
    );
    // #region agent log
    fetch('http://127.0.0.1:7658/ingest/39857839-993a-4106-aeaf-5c248ccc31b2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'eaafaf'},body:JSON.stringify({sessionId:'eaafaf',runId:'chat500-dbg-3',hypothesisId:'H5',location:'chat.api.ts:getChatMessages:success',message:'chat history request succeeded',data:{endpoint,usedOffset:Boolean(typeof offset === 'number' && !cursor)},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    return fromRawHistoryPageResponse(response.data, fallbackCompanionId, pageLimit);
  } catch (error) {
    if (error instanceof ApiError && error.status >= 500 && typeof offset === 'number' && !cursor) {
      const fallbackParams = toChatHistoryQueryParams({ companionId, limit: pageLimit });
      const fallbackQuery = fallbackParams.toString();
      const fallbackEndpoint = fallbackQuery ? `/chat/history?${fallbackQuery}` : '/chat/history';
      // #region agent log
      fetch('http://127.0.0.1:7658/ingest/39857839-993a-4106-aeaf-5c248ccc31b2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'eaafaf'},body:JSON.stringify({sessionId:'eaafaf',runId:'chat500-dbg-2',hypothesisId:'H5',location:'chat.api.ts:getChatMessages:fallbackNoOffset',message:'retrying chat history without offset',data:{fallbackEndpoint,originalEndpoint:endpoint,status:error.status},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      try {
        const fallbackResponse = await httpClient.get<RawHistoryPageResponse>(
          fallbackEndpoint,
          undefined,
          { suppressFatalBoundary: true }
        );
        // #region agent log
        fetch('http://127.0.0.1:7658/ingest/39857839-993a-4106-aeaf-5c248ccc31b2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'eaafaf'},body:JSON.stringify({sessionId:'eaafaf',runId:'chat500-dbg-3',hypothesisId:'H5',location:'chat.api.ts:getChatMessages:fallbackSuccess',message:'chat history fallback succeeded',data:{fallbackEndpoint},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        return fromRawHistoryPageResponse(fallbackResponse.data, fallbackCompanionId, pageLimit);
      } catch (fallbackError) {
        // #region agent log
        fetch('http://127.0.0.1:7658/ingest/39857839-993a-4106-aeaf-5c248ccc31b2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'eaafaf'},body:JSON.stringify({sessionId:'eaafaf',runId:'chat500-dbg-3',hypothesisId:'H5',location:'chat.api.ts:getChatMessages:fallbackError',message:'chat history fallback failed without boundary publish',data:{fallbackEndpoint,errorName:fallbackError instanceof Error?fallbackError.name:'unknown',errorMessage:fallbackError instanceof Error?fallbackError.message:String(fallbackError)},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
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
    // #region agent log
    fetch('http://127.0.0.1:7658/ingest/39857839-993a-4106-aeaf-5c248ccc31b2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'eaafaf'},body:JSON.stringify({sessionId:'eaafaf',runId:'chat500-dbg-1',hypothesisId:'H5',location:'chat.api.ts:getChatMessages:error',message:'chat history request failed',data:{endpoint,errorName:error instanceof Error?error.name:'unknown',errorMessage:error instanceof Error?error.message:String(error)},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
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

