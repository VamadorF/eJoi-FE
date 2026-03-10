/**
 * Mapeo PlanId → product ID en Google Play / App Store Connect
 * TODO: actualizar con product IDs reales cuando estén creados en las consolas
 */
import type { PlanId } from '../store/subscription.store';

/** Package name de Android (app.json android.package). Requerido por el backend para validar con Google Play API. */
export const ANDROID_PACKAGE_NAME = 'com.ejoi.app';

export const PLAN_TO_PRODUCT_ID: Record<PlanId, string> = {
  // TODO: actualizar con product IDs reales de Google Play / App Store Connect
  starter: 'com.ejoi.app.sub_starter_encuentro',
  conexion: 'com.ejoi.app.sub_standard_conexion',
  plus: 'com.ejoi.app.sub_plus_siempre_contigo',
};
