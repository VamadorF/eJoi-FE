/**
 * Servicio de API para Companion
 * Todos los endpoints usan /companion/me (la identidad viene del JWT)
 */

import { httpClient } from '@/shared/services/http/client';
import { Companion, CreateCompanionRequest, UpdateCompanionRequest } from '../types';
import { fromCompanionApiResponse, toUpsertCompanionDto } from '../adapters/companion.adapter';

/**
 * Obtiene el companion del usuario autenticado
 * Endpoint: GET /companion/me
 */
export const getMyCompanion = async (): Promise<Companion | null> => {
  const response = await httpClient.get<unknown>('/companion/me');
  return fromCompanionApiResponse(response.data);
};

/**
 * Crea un nuevo companion para el usuario autenticado
 * Endpoint: POST /companion/me
 */
export const createCompanion = async (data: CreateCompanionRequest): Promise<Companion> => {
  const response = await httpClient.post<unknown>('/companion/me', toUpsertCompanionDto(data));
  const normalized = fromCompanionApiResponse(response.data);
  if (!normalized) {
    throw new Error('El backend no devolvio un companion valido');
  }
  return normalized;
};

/**
 * Actualiza el companion del usuario autenticado
 * Endpoint: PUT /companion/me
 */
export const updateCompanion = async (data: UpdateCompanionRequest): Promise<Companion> => {
  const response = await httpClient.put<unknown>('/companion/me', toUpsertCompanionDto(data));
  const normalized = fromCompanionApiResponse(response.data);
  if (!normalized) {
    throw new Error('El backend no devolvio un companion valido');
  }
  return normalized;
};
