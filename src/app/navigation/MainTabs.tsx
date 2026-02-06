import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatScreen } from '@/features/chat/screens/ChatScreen';
import { SubscriptionPaywallScreen } from '@/features/subscription/screens/SubscriptionPaywallScreen';
import { RootStackParamList } from '@/shared/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainTabs: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Chat"
    >
      <Stack.Screen name="Chat" component={ChatScreen} />

      {/*Paywall dentro del flujo autenticado */}
      <Stack.Screen
        name="SubscriptionPaywall"
        component={SubscriptionPaywallScreen}
        options={{
          // opcional: que se vea más como paywall/modal
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};
