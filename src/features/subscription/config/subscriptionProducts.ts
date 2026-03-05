/**
 * Mapeo PlanId → product ID en Google Play / App Store Connect
 * Actualizar según los IDs configurados en las consolas de cada plataforma
 */
import type { PlanId } from '../store/subscription.store';

/** Package name de Android (app.json android.package). Requerido por el backend para validar con Google Play API. */
export const ANDROID_PACKAGE_NAME = 'com.ejoi.app';

export const PLAN_TO_PRODUCT_ID: Record<PlanId, string> = {
  Amigo: 'com.ejoi.app.sub_amigo',
  'Amigo Cercano': 'com.ejoi.app.sub_amigo_cercano',
  'Mejor Amigo': 'com.ejoi.app.sub_mejor_amigo',
};
