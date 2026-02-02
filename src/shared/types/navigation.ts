/**
 * Tipos para navegación
 */

export type RootStackParamList = {
  // Auth
  Login: undefined;
  
  // Onboarding
  Onboarding: undefined;
  
  // Companion
  CreateCompanion: { onboardingData?: import('@/features/onboarding/types').OnboardingData };
  CompanionProfile: { companionId: string };
  
  // Chat
  Chat: undefined;
  ChatRoom: { roomId: string };
  
  // Main (placeholder)
  Main: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

