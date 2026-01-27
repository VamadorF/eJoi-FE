/**
 * Tipos para navegación
 */

export type RootStackParamList = {
  // Auth
  Login: undefined;
  
  // Main (placeholder)
  Main: undefined;
  
  // Chat (placeholder)
  ChatList: undefined;
  ChatRoom: { roomId: string };
  
  // Companion (placeholder)
  CompanionProfile: { companionId: string };
  
  // Onboarding (placeholder)
  OnboardingStart: undefined;
  StepPersona: undefined;
  StepTone: undefined;
  StepBoundaries: undefined;
  StepAvatar: undefined;
  StepSummary: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

