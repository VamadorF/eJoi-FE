/**
 * Servicio de API para Companion
 * Funciones puras para llamadas al backend NestJS
 * TODO: Conectar con backend cuando esté disponible
 */

import { httpClient } from '@/shared/services/http/client';
import { Companion } from '../types';

/**
 * Obtiene información de un companion por ID
 * 
 * Endpoint: GET ${API_URL}/companion/:id
 * Response: Companion
 * 
 * @param id - ID del companion
 */
export const getCompanion = async (id: string): Promise<Companion> => {
  // TODO: Descomentar cuando el backend esté disponible
  // const response = await httpClient.get<Companion>(`/companion/${id}`);
  // return response.data;

  throw new Error('Backend no disponible. Conectar con NestJS cuando esté listo.');
};

/**
 * Crea un nuevo companion
 * 
 * Endpoint: POST ${API_URL}/companion
 * Body: Partial<Companion>
 * Response: Companion
 * 
 * @param data - Datos del companion a crear
 */
export const createCompanion = async (data: Partial<Companion>): Promise<Companion> => {
  // TODO: Descomentar cuando el backend esté disponible
  // const response = await httpClient.post<Companion>('/companion', data);
  // return response.data;

  throw new Error('Backend no disponible. Conectar con NestJS cuando esté listo.');
};

/**
 * Actualiza un companion existente
 * 
 * Endpoint: PUT ${API_URL}/companion/:id
 * Body: Partial<Companion>
 * Response: Companion
 * 
 * @param id - ID del companion
 * @param data - Datos a actualizar
 */
export const updateCompanion = async (id: string, data: Partial<Companion>): Promise<Companion> => {
  // TODO: Descomentar cuando el backend esté disponible
  // const response = await httpClient.put<Companion>(`/companion/${id}`, data);
  // return response.data;

  throw new Error('Backend no disponible. Conectar con NestJS cuando esté listo.');
};

