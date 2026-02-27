import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  publishFatalHttpError: vi.fn(),
  logout: vi.fn(),
  getAuthToken: vi.fn().mockResolvedValue(null),
}));

vi.mock('@/app/config/env', () => ({
  API_URL: 'http://localhost:3000',
}));

vi.mock('@/shared/services/http/httpErrorBus', () => ({
  publishFatalHttpError: mocks.publishFatalHttpError,
}));

vi.mock('@/shared/services/session/sessionManager', () => ({
  logout: mocks.logout,
}));

vi.mock('@/shared/services/storage/secure', () => ({
  getAuthToken: mocks.getAuthToken,
}));

import { httpClient } from './client';

describe('httpClient fatal error bridge integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('publica fatal cuando backend responde 500', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Server Error',
        headers: {
          get: () => 'application/json',
        },
        json: async () => ({ message: 'boom' }),
      })
    );

    await expect(httpClient.get('/chat/history')).rejects.toThrow();
    expect(mocks.publishFatalHttpError).toHaveBeenCalledTimes(1);
    expect(mocks.logout).not.toHaveBeenCalled();
  });

  it('no publica fatal para 400', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        headers: {
          get: () => 'application/json',
        },
        json: async () => ({ message: 'validation' }),
      })
    );

    await expect(httpClient.get('/chat/history')).rejects.toThrow();
    expect(mocks.publishFatalHttpError).not.toHaveBeenCalled();
    expect(mocks.logout).not.toHaveBeenCalled();
  });

  it('publica fatal para fallos de red', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network down')));

    await expect(httpClient.get('/chat/history')).rejects.toThrow();
    expect(mocks.publishFatalHttpError).toHaveBeenCalledTimes(1);
  });
});
