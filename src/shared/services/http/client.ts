/**
 * Cliente HTTP centralizado
 * Conexión con backend NestJS
 */

import { API_URL } from '@/app/config/env';
import { getAuthToken } from '@/shared/services/storage/secure';
import { logout } from '@/shared/services/session/sessionManager';
import { publishFatalHttpError } from './httpErrorBus';

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  suppressFatalBoundary?: boolean;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: any,
    message?: string
  ) {
    super(message || `API Error: ${status} ${statusText}`);
    this.name = 'ApiError';
  }
}

const AUTH_ERROR_STATUSES = new Set([401, 403]);

const parseResponseBody = async (response: Response): Promise<any> => {
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  try {
    const text = await response.text();
    return text ? { message: text } : null;
  } catch {
    return null;
  }
};

const isFatalBoundaryError = (status: number): boolean => status === 0 || status >= 500;

const reportFatalBoundaryError = (error: ApiError, endpoint: string, method: string): void => {
  publishFatalHttpError({
    status: error.status,
    statusText: error.statusText,
    endpoint,
    method,
    message: error.message,
  });
};

export const httpClient = {
  async request<T = any>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { method = 'GET', headers = {}, body, suppressFatalBoundary = false } = config;
    const requestHeadersInput = { ...headers };

    const token = await getAuthToken();
    if (token) {
      requestHeadersInput['Authorization'] = `Bearer ${token}`;
    }

    const url = `${API_URL}${endpoint}`;

    const requestHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...requestHeadersInput,
    };

    const requestConfig: RequestInit = {
      method,
      headers: requestHeaders,
    };

    if (body && method !== 'GET') {
      requestConfig.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, requestConfig);
      const data = await parseResponseBody(response);

      if (!response.ok) {
        const apiError = new ApiError(
          response.status,
          response.statusText,
          data,
          data?.message || `Request failed: ${response.statusText}`
        );

        if (AUTH_ERROR_STATUSES.has(apiError.status)) {
          await logout();
        } else if (isFatalBoundaryError(apiError.status) && !suppressFatalBoundary) {
          reportFatalBoundaryError(apiError, endpoint, method);
        }

        throw apiError;
      }

      return {
        data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      const networkError = new ApiError(
        0,
        'Network Error',
        null,
        error instanceof Error ? error.message : 'Unknown error'
      );

      if (!suppressFatalBoundary) {
        reportFatalBoundaryError(networkError, endpoint, method);
      }
      throw networkError;
    }
  },

  get<T = any>(
    endpoint: string,
    headers?: Record<string, string>,
    options?: Pick<RequestConfig, 'suppressFatalBoundary'>
  ) {
    return this.request<T>(endpoint, { method: 'GET', headers, ...options });
  },

  post<T = any>(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>
  ) {
    return this.request<T>(endpoint, { method: 'POST', body, headers });
  },

  put<T = any>(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>
  ) {
    return this.request<T>(endpoint, { method: 'PUT', body, headers });
  },

  patch<T = any>(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>
  ) {
    return this.request<T>(endpoint, { method: 'PATCH', body, headers });
  },

  delete<T = any>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>(endpoint, { method: 'DELETE', headers });
  },
};

