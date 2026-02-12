import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '@/features/auth/screens/LoginScreen';
import { OnboardingScreen } from '@/features/onboarding/screens/OnboardingScreen';
import { CreateCompanionScreen } from '@/features/companion/screens/CreateCompanionScreen';
import { CreandoCompanionScreen } from '@/features/companion/screens/CreandoCompanionScreen';
import { ChatScreen } from '@/features/chat/screens/ChatScreen';
import { HomeScreen } from '@/features/main/screens/HomeScreen';
import { RootStackParamList } from '@/shared/types/navigation';
import { SubscriptionPaywallScreen } from '@/features/subscription/screens/SubscriptionPaywallScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Navegador para flujos de autenticación, onboarding, creación de compañer@ y chat
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
        name="SubscriptionPaywall"
        component={SubscriptionPaywallScreen}
        options={{
          animation: 'slide_from_right',
          animationDuration: 300,
        }}
      />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          animation: 'fade',
          animationDuration: 400,
        }}
      />
    </Stack.Navigator>
  );
};

