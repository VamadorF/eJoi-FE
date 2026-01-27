/**
 * Cliente HTTP centralizado
 * Preparado para conexión con backend NestJS
 * TODO: Agregar interceptores para tokens cuando el backend esté disponible
 */

import { API_URL } from '@/app/config/env';

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
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

/**
 * Cliente HTTP base usando fetch
 * TODO: Cuando el backend esté disponible, agregar:
 * - Interceptor para Authorization header: headers: { Authorization: `Bearer ${token}` }
 * - Manejo de refresh tokens
 * - Retry logic para requests fallidos
 */
export const httpClient = {
  /**
   * Realiza una petición HTTP
   * @param endpoint - Endpoint relativo (se concatena con API_URL)
   * @param config - Configuración de la petición
   * @returns Promise con la respuesta
   */
  async request<T = any>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { method = 'GET', headers = {}, body } = config;

    // TODO: Agregar token de autenticación cuando esté disponible
    // const token = await getAuthToken();
    // if (token) {
    //   headers['Authorization'] = `Bearer ${token}`;
    // }

    const url = `${API_URL}${endpoint}`;

    const requestHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...headers,
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
      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          response.status,
          response.statusText,
          data,
          data.message || `Request failed: ${response.statusText}`
        );
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
      throw new ApiError(
        0,
        'Network Error',
        null,
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  },

  get<T = any>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>(endpoint, { method: 'GET', headers });
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

