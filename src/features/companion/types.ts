/**
 * Tipos para feature Companion
 */

import { VisualStyle, Gender } from '@/features/onboarding/types';

export interface Companion {
  id: string;
  name: string;
  avatar?: string;
  visualStyle: VisualStyle;
  gender: Gender;
  personality: string;
  tone: string;
  interactionStyle?: string;
  conversationDepth?: string;
  interests: string[];
  traits: string[];
}

