/**
 * Manejo centralizado de errores HTTP
 */

import { ApiError } from './client';

export const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    // Manejar diferentes códigos de estado
    switch (error.status) {
      case 401:
        return 'No autorizado. Por favor, inicia sesión nuevamente.';
      case 403:
        return 'No tienes permisos para realizar esta acción.';
      case 404:
        return 'Recurso no encontrado.';
      case 422:
        return error.data?.message || 'Error de validación.';
      case 500:
        return 'Error del servidor. Por favor, intenta más tarde.';
      default:
        return error.data?.message || error.message || 'Error desconocido.';
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Ocurrió un error inesperado.';
};

export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof ApiError) {
    return error.status === 0;
  }
  return false;
};

