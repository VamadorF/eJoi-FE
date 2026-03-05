/**
 * Purchase Listener Service
 *
 * Implementa el flujo post-compra para Android (y iOS):
 * 1. purchaseUpdatedListener - recibe compras completadas/restauradas
 * 2. purchaseErrorListener - maneja errores (cancelación, red, etc.)
 * 3. Envía purchaseToken al backend
 * 4. Ejecuta acknowledge (finishTransaction) en Android
 * 5. Evita doble procesamiento con Set de tokens procesados
 *
 * Los listeners deben montarse al iniciar la app, antes de cualquier requestPurchase.
 */

import { Platform } from 'react-native';
import {
  initConnection,
  purchaseUpdatedListener,
  purchaseErrorListener,
  finishTransaction,
  endConnection,
  type Purchase,
  type PurchaseError,
  ErrorCode,
} from 'expo-iap';
import { validatePurchaseOnBackend } from '../api/subscription.api';
import { useSubscriptionStore } from '../store/subscription.store';
import { ANDROID_PACKAGE_NAME } from '../config/subscriptionProducts';

/** Tokens ya procesados en esta sesión - evita doble procesamiento */
const processedTokens = new Set<string>();

/** Indica si los listeners están activos */
let listenersActive = false;

/** Función de cleanup para remover subscriptions */
let removeSubscriptions: (() => void) | null = null;

/**
 * Obtiene el purchaseToken según plataforma
 */
function getPurchaseToken(purchase: Purchase): string | null {
  if (Platform.OS === 'android') {
    return purchase.purchaseToken ?? purchase.purchaseTokenAndroid ?? null;
  }
  // iOS: transactionId se usa para verificación; purchaseToken puede ser JWS
  return purchase.purchaseToken ?? purchase.transactionId ?? null;
}

/**
 * Procesa una compra: envía al backend y ejecuta acknowledge
 */
async function processPurchase(purchase: Purchase): Promise<void> {
  const token = getPurchaseToken(purchase);
  if (!token) {
    console.warn('[PurchaseListener] Sin purchaseToken, no se puede procesar:', purchase.productId);
    return;
  }

  if (processedTokens.has(token)) {
    console.log('[PurchaseListener] Token ya procesado, omitiendo:', token.slice(0, 20) + '...');
    await finishTransaction({ purchase, isConsumable: false });
    return;
  }

  try {
    const response = await validatePurchaseOnBackend({
      purchaseToken: token,
      productId: purchase.productId,
      transactionId: purchase.transactionId ?? undefined,
      platform: Platform.OS as 'android' | 'ios',
      packageName: purchase.packageNameAndroid ?? ANDROID_PACKAGE_NAME,
    });

    if (!response.valid) {
      console.error('[PurchaseListener] Backend rechazó la validación:', purchase.productId);
      return;
    }

    processedTokens.add(token);

    await finishTransaction({ purchase, isConsumable: false });
    console.log('[PurchaseListener] Compra procesada y acknowledge ejecutado:', purchase.productId);

    useSubscriptionStore.getState().confirmSubscription();
  } catch (error) {
    console.error('[PurchaseListener] Error procesando compra:', error);
    // No hacemos finishTransaction si falla - se reintentará en próximo launch
  }
}

/**
 * Inicializa la conexión IAP y monta los listeners.
 * Llamar al iniciar la app (ej: en App.tsx o AuthProvider tras login).
 */
export async function initPurchaseListeners(): Promise<void> {
  if (listenersActive) {
    return;
  }

  if (Platform.OS !== 'android' && Platform.OS !== 'ios') {
    console.log('[PurchaseListener] IAP no disponible en esta plataforma');
    return;
  }

  try {
    await initConnection();
    listenersActive = true;

    const purchaseUpdateSub = purchaseUpdatedListener(async (purchase: Purchase) => {
      if (purchase.purchaseState === 'pending') {
        console.log('[PurchaseListener] Compra pendiente (ej: aprobación parental):', purchase.productId);
        return;
      }
      await processPurchase(purchase);
    });

    const purchaseErrorSub = purchaseErrorListener((error: PurchaseError) => {
      if (error.code === ErrorCode.UserCancelled) {
        return;
      }
      if (error.code === ErrorCode.NetworkError) {
        console.warn('[PurchaseListener] Error de red:', error.message);
        return;
      }
      if (error.code === ErrorCode.AlreadyOwned) {
        console.log('[PurchaseListener] Item ya comprado');
        return;
      }
      console.warn('[PurchaseListener] purchaseError:', error.code, error.message);
    });

    removeSubscriptions = () => {
      purchaseUpdateSub.remove();
      purchaseErrorSub.remove();
      removeSubscriptions = null;
    };
  } catch (error) {
    console.error('[PurchaseListener] Error inicializando IAP:', error);
  }
}

/**
 * Limpia los listeners (ej: al cerrar sesión).
 */
export function cleanupPurchaseListeners(): void {
  if (removeSubscriptions) {
    removeSubscriptions();
  }
  listenersActive = false;
  processedTokens.clear();
  removeSubscriptions = null;
  endConnection().catch(() => {});
}
