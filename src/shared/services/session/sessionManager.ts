/**
 * Session Manager — función centralizada de logout (FE-only)
 *
 * Limpia completamente el estado local:
 *   - Storage (SecureStore / localStorage)
 *   - Stores Zustand
 *   - React Query cache
 *
 * Al setear isAuthenticated = false, RootNavigator automáticamente
 * renderiza AuthNavigator (ruta inicial: Login).
 *
 * Preparado para BE: agregar llamada a endpoint sin cambiar UI.
 */

import { clearAuthStorage } from '@/shared/services/storage/secure';
import { useCompanionStore } from '@/features/companion/store/companion.store';
import { useSubscriptionStore } from '@/features/subscription/store/subscription.store';
import { cleanupPurchaseListeners } from '@/features/subscription/services/purchaseListener.service';
import { queryClient } from '@/app/providers/QueryProvider';

let isLoggingOut = false;

/**
 * Ejecuta logout completo: limpia storage, stores y cache.
 * Idempotente: si se llama 2+ veces simultáneamente, solo ejecuta una vez.
 *
 * @returns Promise<void>
 *
 * Para integrar con BE en el futuro, agregar aquí:
 *   await api.post('/auth/logout');
 * antes de limpiar el estado local.
 */
export const logout = async (): Promise<void> => {
  // Guard de idempotencia
  if (isLoggingOut) {
    console.log('[SessionManager] logout ya en curso, ignorando llamada duplicada');
    return;
  }

  isLoggingOut = true;

  try {
    console.log('[SessionManager] Iniciando logout...');

    // ──────────────────────────────────────────────
    // TODO: Llamar a endpoint de logout cuando el BE esté disponible
    // try {
    //   await api.post('/auth/logout');
    // } catch (apiError) {
    //   console.warn('[SessionManager] Error en logout BE (continuando con limpieza local):', apiError);
    // }
    // ──────────────────────────────────────────────

    // 1. Limpiar storage persistente (auth + user, NO companion)
    try {
      await clearAuthStorage();
      console.log('[SessionManager] Auth storage limpiado (companion preservado)');
    } catch (error) {
      console.warn('[SessionManager] Error limpiando storage:', error);
    }

    // 2. Resetear stores de Zustand
    try {
      const { useAuthStore } = await import('@/features/auth/store/auth.store');
      // Auth store: esto causa que RootNavigator muestre AuthNavigator (Login)
      useAuthStore.getState().setUser(null);
      useAuthStore.setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      console.log('[SessionManager] Auth store reseteado');
    } catch (error) {
      console.warn('[SessionManager] Error reseteando auth store:', error);
    }

    // Nota: companion store NO se resetea — se preserva para re-login

    try {
      useSubscriptionStore.getState().reset();
      console.log('[SessionManager] Subscription store reseteado');
    } catch (error) {
      console.warn('[SessionManager] Error reseteando subscription store:', error);
    }

    try {
      cleanupPurchaseListeners();
      console.log('[SessionManager] Purchase listeners limpiados');
    } catch (error) {
      console.warn('[SessionManager] Error limpiando purchase listeners:', error);
    }

    // 3. Limpiar React Query cache
    try {
      queryClient.clear();
      console.log('[SessionManager] React Query cache limpiado');
    } catch (error) {
      console.warn('[SessionManager] Error limpiando React Query cache:', error);
    }

    console.log('[SessionManager] Logout completado exitosamente');
  } finally {
    isLoggingOut = false;
  }
};
