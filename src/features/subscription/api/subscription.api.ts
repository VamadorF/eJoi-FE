/**
 * API de suscripciones / compras in-app
 * Envía purchaseToken al backend para validación y registro
 */

import { httpClient } from '@/shared/services/http/client';
import { API_ENDPOINTS } from '@/app/config/constants';

export interface ValidatePurchaseRequest {
  purchaseToken: string;
  productId: string;
  transactionId?: string;
  platform: 'android' | 'ios';
  /** Android: package name para verificación con Google Play API */
  packageName?: string;
}

/** Contrato alineado con ValidatePurchaseResponseDto del backend */
export interface ValidatePurchaseResponse {
  valid: boolean;
  platform: 'android' | 'ios';
  productId: string;
  status: 'ACTIVE' | 'INACTIVE' | 'UNKNOWN';
  message?: string;
  expiryTimeMillis?: string;
  linkedPurchaseToken?: string;
}

/**
 * Envía el purchaseToken al backend para:
 * - Validar contra Google Play Developer API (Android) o App Store (iOS)
 * - Registrar la orden como pagada/activa
 * - Fuente de verdad del servidor
 *
 * Endpoint esperado: POST /subscription/validate
 * El backend debe implementar idempotencia por purchaseToken (unique constraint)
 */
export const validatePurchaseOnBackend = async (
  payload: ValidatePurchaseRequest
): Promise<ValidatePurchaseResponse> => {
  const response = await httpClient.post<ValidatePurchaseResponse>(
    API_ENDPOINTS.SUBSCRIPTION.VALIDATE,
    payload
  );
  return response.data;
};
