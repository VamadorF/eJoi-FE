/**
 * Cache compartido para la generación de imagen del companion.
 * Permite que CreateCompanionScreen inicie la generación y CreandoCompanionScreen
 * reutilice el mismo resultado sin duplicar llamadas al API.
 */

import { OnboardingData } from '@/features/onboarding/types';
import { generateCompanionImage } from '../api/image.api';
import { generateCompanionImagePrompt } from '@/shared/utils/companionImagePrompt';

const IMAGE_GENERATION_TIMEOUT_MS = 90000;

let cachedPromise: Promise<string | null> | null = null;
let cacheKey: string | null = null;

function getCacheKey(data: OnboardingData): string {
  return JSON.stringify({
    name: data.companionName,
    visualStyle: data.visualStyle,
    gender: data.gender,
    persona: data.persona,
    interests: data.interests,
  });
}

/**
 * Obtiene o crea la promesa de generación de imagen para el onboarding dado.
 * Si ya existe una generación en curso para los mismos datos, devuelve esa promesa.
 */
export function getOrCreateImagePromise(onboardingData: OnboardingData): Promise<string | null> {
  const key = getCacheKey(onboardingData);
  if (cacheKey === key && cachedPromise) {
    return cachedPromise;
  }
  cacheKey = key;
  const prompt = generateCompanionImagePrompt(onboardingData);
  cachedPromise = Promise.race([
    generateCompanionImage({ prompt }).then((r) => r.imageUrl),
    new Promise<string | null>((resolve) =>
      setTimeout(() => resolve(null), IMAGE_GENERATION_TIMEOUT_MS)
    ),
  ])
    .then((imageUrl) => {
      // If generation timed out/failed, clear cache so next screen/attempt can retry.
      if (!imageUrl && cacheKey === key) {
        clearImageCache();
      }
      return imageUrl;
    })
    .catch(() => {
      if (cacheKey === key) {
        clearImageCache();
      }
      return null;
    });
  return cachedPromise;
}

/**
 * Limpia el cache (útil al cambiar de cuenta o crear otro companion).
 */
export function clearImageCache(): void {
  cachedPromise = null;
  cacheKey = null;
}
