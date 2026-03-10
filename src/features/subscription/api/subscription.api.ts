/**
 * API de suscripciones / compras in-app
 * Envía purchaseToken al backend para validación y registro
 */

import { httpClient } from '@/shared/services/http/client';
import { API_ENDPOINTS } from '@/app/config/constants';
import { ENABLE_SUBSCRIPTION_MOCK } from '@/app/config/env';

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
  if (ENABLE_SUBSCRIPTION_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      valid: true,
      platform: payload.platform,
      productId: payload.productId,
      status: 'ACTIVE',
      message: 'Validation mocked on frontend',
      expiryTimeMillis: String(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };
  }

  const response = await httpClient.post<ValidatePurchaseResponse>(
    API_ENDPOINTS.SUBSCRIPTION.VALIDATE,
    payload
  );
  return response.data;
};
