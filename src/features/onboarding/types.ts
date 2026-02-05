/**
 * Tipos para feature Onboarding
 */

export type VisualStyle = 'realista' | 'anime';
export type Gender = 'femenino' | 'masculino';

export interface OnboardingData {
  visualStyle: VisualStyle | '';
  gender: Gender | '';
  persona: string;
  tone: string;
  interactionStyle: string;
  conversationDepth: string;
  interests: string[];
  boundaries: string[];
  companionName?: string;
  avatar?: string;
}

