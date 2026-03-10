/**
 * Generador de prompts para DALL-E basado en datos del onboarding
 * Produce descripciones en inglés para mejor calidad de imagen
 */

import { OnboardingData } from '@/features/onboarding/types';

const GENDER_TO_ENGLISH: Record<string, string> = {
  femenino: 'woman',
  masculino: 'man',
  neutro: 'androgynous person',
};

const VISUAL_STYLE_TO_ENGLISH: Record<string, string> = {
  realista: 'photorealistic, realistic',
  anime: 'anime style, Japanese animation',
};

/**
 * Genera un prompt para DALL-E basado en los datos del companion
 */
export function generateCompanionImagePrompt(onboardingData: OnboardingData): string {
  const gender = GENDER_TO_ENGLISH[onboardingData.gender as string] || 'person';
  const visualStyle = VISUAL_STYLE_TO_ENGLISH[onboardingData.visualStyle as string] || 'photorealistic';
  const persona = onboardingData.persona || 'friendly';
  const tone = onboardingData.tone || 'warm';
  const interests = onboardingData.interests?.length
    ? onboardingData.interests.slice(0, 3).join(', ')
    : '';

  const parts: string[] = [
    `Portrait of a ${gender}`,
    `${visualStyle} style`,
    `personality: ${persona}`,
    `tone: ${tone}`,
  ];

  if (interests) {
    parts.push(`interests: ${interests}`);
  }

  parts.push('Professional headshot, clean neutral background, soft lighting, high quality');

  return parts.join(', ');
}
