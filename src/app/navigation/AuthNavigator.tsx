import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '@/features/auth/screens/LoginScreen';
import { OnboardingScreen } from '@/features/onboarding/screens/OnboardingScreen';
import { CreateCompanionScreen } from '@/features/companion/screens/CreateCompanionScreen';
import { CreandoCompanionScreen } from '@/features/companion/screens/CreandoCompanionScreen';
import { CompanionReadyScreen } from '@/features/companion/screens/CompanionReadyScreen';
import { ChatScreen } from '@/features/chat/screens/ChatScreen';
import { RootStackParamList } from '@/shared/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Navegador para flujos de autenticación, onboarding, creación de compañera y chat
 * Chat está aquí para permitir acceso desde skip login
 */
export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 300,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{
          animation: 'slide_from_right',
          animationDuration: 300,
        }}
      />
      <Stack.Screen
        name="CreateCompanion"
        component={CreateCompanionScreen}
        options={{
          animation: 'slide_from_right',
          animationDuration: 300,
        }}
      />
      <Stack.Screen
        name="CreandoCompanion"
        component={CreandoCompanionScreen}
        options={{
          animation: 'fade',
          animationDuration: 400,
        }}
      />
      <Stack.Screen
        name="CompanionReady"
        component={CompanionReadyScreen}
        options={{
          animation: 'fade',
          animationDuration: 500,
        }}
      />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

