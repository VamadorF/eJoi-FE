import { describe, expect, it } from 'vitest';
import {
  fromRawHistoryResponse,
  fromRawHistoryPageResponse,
  fromRawMessage,
  toChatHistoryQueryParams,
  toSendMessageDto,
} from './chat.adapter';

describe('chat.adapter', () => {
  it('trunca message a 2000 y preserva companionId/useLongTermMemory', () => {
    const dto = toSendMessageDto({
      message: `  ${'a'.repeat(2500)}  `,
      companionId: 'cmp-1',
      useLongTermMemory: true,
    });

    expect(dto.message).toHaveLength(2000);
    expect(dto.companionId).toBe('cmp-1');
    expect(dto.useLongTermMemory).toBe(true);
  });

  it('inserta defaults en mensaje cuando faltan campos', () => {
    const normalized = fromRawMessage({}, 'fallback-companion');

    expect(normalized.id.startsWith('fallback-companion-')).toBe(true);
    expect(normalized.companionId).toBe('fallback-companion');
    expect(normalized.role).toBe('user');
    expect(normalized.message).toBe('');
    expect(new Date(normalized.createdAt).toString()).not.toBe('Invalid Date');
  });

  it('asimila historial en estructuras no estandar (messages/data)', () => {
    const historyFromMessages = fromRawHistoryResponse(
      {
        messages: [{ role: 'assistant', content: 'hola' }],
      },
      'cmp-a'
    );
    const historyFromData = fromRawHistoryResponse(
      {
        data: [{ role: 'system', text: 'regla' }],
      },
      'cmp-b'
    );

    expect(historyFromMessages).toHaveLength(1);
    expect(historyFromMessages[0].message).toBe('hola');
    expect(historyFromMessages[0].role).toBe('assistant');

    expect(historyFromData).toHaveLength(1);
    expect(historyFromData[0].message).toBe('regla');
    expect(historyFromData[0].role).toBe('system');
  });

  it('arma query params solo con valores presentes', () => {
    const params = toChatHistoryQueryParams({ limit: 50, cursor: 'cursor-1', offset: 10 });
    expect(params.get('companionId')).toBeNull();
    expect(params.get('limit')).toBe('50');
    expect(params.get('cursor')).toBe('cursor-1');
    expect(params.get('offset')).toBe('10');
  });

  it('normaliza metadata paginada con fallback de hasMore', () => {
    const page = fromRawHistoryPageResponse(
      {
        messages: [{ role: 'assistant', message: 'hola' }],
      },
      'cmp-paged',
      1
    );

    expect(page.messages).toHaveLength(1);
    expect(page.hasMore).toBe(true);
    expect(page.nextCursor).toBeNull();
  });
});
