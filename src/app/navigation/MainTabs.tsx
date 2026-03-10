import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@/features/main/screens/HomeScreen';
import { RootStackParamList } from '@/shared/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainTabs: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
