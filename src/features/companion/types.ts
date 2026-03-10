/**
 * Tipos para feature Companion
 */

import { VisualStyle, Gender } from '@/features/onboarding/types';

export interface Companion {
  id: string;
  name: string;
  visualStyle: VisualStyle;
  gender: Gender;
  persona: string;
  tone: string;
  interactionStyle: string;
  conversationDepth: string;
  interests: string[];
  boundaries: string[];
  description?: string;
  dob?: string;
  physicalRules?: string[];
  psychologicalRules?: string[];
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCompanionRequest {
  name: string;
  visualStyle?: VisualStyle | string;
  gender?: Gender | string;
  persona?: string;
  tone?: string;
  interactionStyle?: string;
  conversationDepth?: string;
  interests?: string[];
  boundaries?: string[];
  avatarUrl?: string;
  dob?: string;
  extra?: Record<string, unknown>;
}

export type UpdateCompanionRequest = Partial<CreateCompanionRequest>;
