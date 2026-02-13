/**
 * Servicio de API para Onboarding
 * Funciones puras para llamadas al backend NestJS
 * TODO: Conectar con backend cuando esté disponible
 */

import { httpClient } from '@/shared/services/http/client';
import { OnboardingData } from '../types';

/**
 * Obtiene la configuración de onboarding del usuario
 * 
 * Endpoint: GET ${API_URL}/onboarding
 * Response: OnboardingData
 */
export const getOnboarding = async (): Promise<OnboardingData> => {
  // TODO: Descomentar cuando el backend esté disponible
  // const response = await httpClient.get<OnboardingData>('/onboarding');
  // return response.data;

  throw new Error('Backend no disponible. Conectar con NestJS cuando esté listo.');
};

/**
 * Guarda la configuración de onboarding del usuario
 * 
 * Endpoint: POST ${API_URL}/onboarding
 * Body: OnboardingData
 * Response: OnboardingData
 * 
 * @param data - Datos de onboarding a guardar
 */
export const saveOnboarding = async (data: OnboardingData): Promise<OnboardingData> => {
  // TODO: Descomentar cuando el backend esté disponible
  // const response = await httpClient.post<OnboardingData>('/onboarding', data);
  // return response.data;

  throw new Error('Backend no disponible. Conectar con NestJS cuando esté listo.');
};

