/**
 * Servicio de API para Companion
 * Todos los endpoints usan /companion/me (la identidad viene del JWT)
 */

import { httpClient } from '@/shared/services/http/client';
import { Companion, CreateCompanionRequest, UpdateCompanionRequest } from '../types';

/**
 * Obtiene el companion del usuario autenticado
 * Endpoint: GET /companion/me
 */
export const getMyCompanion = async (): Promise<Companion | null> => {
  const response = await httpClient.get<Companion>('/companion/me');
  if (!response.data || Object.keys(response.data).length === 0) {
    return null;
  }
  return response.data;
};

/**
 * Crea un nuevo companion para el usuario autenticado
 * Endpoint: POST /companion/me
 */
export const createCompanion = async (data: CreateCompanionRequest): Promise<Companion> => {
  const response = await httpClient.post<Companion>('/companion/me', data);
  return response.data;
};

/**
 * Actualiza el companion del usuario autenticado
 * Endpoint: PUT /companion/me
 */
export const updateCompanion = async (data: UpdateCompanionRequest): Promise<Companion> => {
  const response = await httpClient.put<Companion>('/companion/me', data);
  return response.data;
};
