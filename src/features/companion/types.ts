/**
 * Tipos para feature Companion
 */

export interface Companion {
  id: string;
  name: string;
  avatar?: string;
  personality: string;
  tone: string;
  interactionStyle?: string;
  conversationDepth?: string;
  interests: string[];
  traits: string[];
}

