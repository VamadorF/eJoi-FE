/**
 * Tipos para navegación
 */

export type RootStackParamList = {
  // Auth
  Login: undefined;
  
  // Onboarding
  Onboarding: { initialStep?: number; onboardingData?: import('@/features/onboarding/types').OnboardingData } | undefined;
  
  // Companion
  CreateCompanion: { onboardingData?: import('@/features/onboarding/types').OnboardingData };
  CreandoCompanion: {
    onboardingData?: import('@/features/onboarding/types').OnboardingData;
    preGeneratedAvatarUrl?: string | null;
  };
  CompanionReady: { companion: import('@/features/companion/types').Companion };
  CompanionProfile: { companionId: string };
  
  // Chat
  Chat: undefined;
  ChatRoom: { roomId: string };
  
  // Main
  Main: undefined;
  Home: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

