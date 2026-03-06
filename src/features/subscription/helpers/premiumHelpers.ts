/**
 * Premium Helpers
 *
 * Funciones desacopladas para la lógica premium.
 * Mantienen HomeScreen.tsx limpio y facilitan testing.
 *
 * TODO: [BACKEND] Conectar con estado premium real del usuario
 * TODO: [BACKEND] Implementar trigger remoto del paywall
 * TODO: [ANALYTICS] Trackear eventos de conversión premium
 */

import { PREMIUM_PLANS, PremiumPlan } from '../config/premiumPlans';

// ============================================================
// Constantes
// ============================================================

/**
 * Número mínimo de mensajes del usuario antes de mostrar la pantalla premium.
 *
 * TODO: [BACKEND] Este umbral podría configurarse remotamente para A/B testing.
 */
export const PREMIUM_MESSAGE_THRESHOLD = 3;

// ============================================================
// shouldShowPremiumScreen
// ============================================================

export interface ShouldShowPremiumParams {
    /** Número de mensajes enviados por el usuario en la sesión actual */
    userMessageCount: number;
    /** Si el usuario ya tiene una suscripción premium activa */
    isPremium: boolean;
    /**
     * Override remoto para forzar/bloquear el paywall.
     * TODO: [BACKEND] Conectar con Remote Config o feature flag
     */
    remoteOverride?: boolean | null;
}

/**
 * Evalúa si se debe mostrar la pantalla premium.
 *
 * Retorna `true` cuando:
 * - El usuario NO es premium
 * - Ha enviado más de PREMIUM_MESSAGE_THRESHOLD mensajes
 * - No hay un override remoto que lo bloquee
 *
 * TODO: [BACKEND] Integrar con estado premium real (verificación de recibo)
 * TODO: [BACKEND] Integrar con Remote Config para trigger remoto
 * TODO: [ANALYTICS] Registrar cuándo se muestra el paywall
 */
export function shouldShowPremiumScreen(params: ShouldShowPremiumParams): boolean {
    const { userMessageCount, isPremium, remoteOverride } = params;

    // Si ya es premium, nunca mostrar
    if (isPremium) return false;

    // Si hay override remoto explícito, respetar
    if (remoteOverride === true) return true;
    if (remoteOverride === false) return false;

    // Mostrar tras umbral de mensajes
    return userMessageCount >= PREMIUM_MESSAGE_THRESHOLD;
}

// ============================================================
// getDisplayPrice
// ============================================================

/**
 * Cache local de precios obtenidos del billing SDK.
 *
 * TODO: [BILLING] Poblar este cache con los precios reales de
 *       react-native-iap / Play Billing al inicializar la app.
 */
const priceCache: Record<string, string> = {};

/**
 * Retorna el precio formateado para un productId dado.
 *
 * - Busca primero en el cache local (que sería poblado por el billing SDK).
 * - Si no hay precio cacheado, retorna null (el componente mostrará loader).
 *
 * TODO: [BILLING] Integrar con react-native-iap para obtener precios reales
 *       desde Google Play / App Store.
 * TODO: [BILLING] Implementar refresh periódico de precios.
 *
 * @param productId - El ID del producto en la tienda
 * @returns Precio formateado (ej: "$12.990 / mes") o null si no disponible
 */
export function getDisplayPrice(productId: string): string | null {
    // Verificar que el productId corresponde a un plan válido
    const plan = PREMIUM_PLANS.find((p) => p.productId === productId);
    if (!plan) return null;

    // Retornar precio del cache si existe
    if (priceCache[productId]) {
        return priceCache[productId];
    }

    // TODO: [BILLING] Cuando react-native-iap esté integrado, el cache
    // se poblará al inicio de la app con los precios reales.
    // Por ahora retornamos null para que la UI muestre un loader.
    return null;
}

/**
 * Actualiza el cache de precios. Llamar cuando se obtienen
 * precios del billing SDK.
 *
 * TODO: [BILLING] Llamar desde el listener de react-native-iap
 *       cuando se resuelvan los productos.
 */
export function updatePriceCache(productId: string, formattedPrice: string): void {
    priceCache[productId] = formattedPrice;
}

/**
 * Limpia el cache de precios. Útil para forzar refresh.
 */
export function clearPriceCache(): void {
    Object.keys(priceCache).forEach((key) => delete priceCache[key]);
}

// ============================================================
// handleSubscribe
// ============================================================

export interface SubscribeResult {
    success: boolean;
    error?: string;
    /** TODO: [BILLING] Agregar transactionId, receiptData, etc. */
}

/**
 * Inicia el flujo de compra para un producto.
 *
 * TODO: [BILLING] Integrar con react-native-iap requestPurchase()
 * TODO: [BACKEND] Enviar recibo al backend para validación server-side
 * TODO: [BACKEND] Actualizar estado premium del usuario tras compra exitosa
 * TODO: [ANALYTICS] Trackear inicio de compra, éxito, error, cancelación
 * TODO: [BACKEND] Implementar refresh de suscripción periódico
 * TODO: [BACKEND] Implementar unlock persistente de features
 *
 * @param productId - El ID del producto a comprar
 * @returns Resultado de la compra
 */
export async function handleSubscribe(productId: string): Promise<SubscribeResult> {
    // Verificar que el productId corresponde a un plan válido
    const plan = PREMIUM_PLANS.find((p) => p.productId === productId);
    if (!plan) {
        return { success: false, error: 'Plan no encontrado' };
    }

    try {
        // TODO: [BILLING] Reemplazar este mock con:
        // import { requestPurchase } from 'react-native-iap';
        // const purchase = await requestPurchase({ sku: productId });
        // ... validar recibo con backend ...

        // Mock: simular delay de compra
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mock: siempre exitoso por ahora
        // TODO: [BILLING] Retornar resultado real de la compra
        return { success: true };
    } catch (error) {
        // TODO: [BILLING] Manejar errores específicos de IAP:
        // - E_USER_CANCELLED
        // - E_ITEM_UNAVAILABLE
        // - E_NETWORK_ERROR
        const message = error instanceof Error ? error.message : 'Error desconocido';
        return { success: false, error: message };
    }
}
