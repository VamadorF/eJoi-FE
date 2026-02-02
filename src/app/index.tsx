import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './providers/ThemeProvider';
import { AuthProvider } from './providers/AuthProvider';
import { QueryProvider } from './providers/QueryProvider';
import { SocketProvider } from './providers/SocketProvider';
import { RootNavigator } from './navigation/RootNavigator';
import { Colors } from '@/shared/theme/colors';

/**
 * Entry point de la aplicación
 * Envuelve la app con todos los providers necesarios
 * Carga las fuentes Apis antes de renderizar
 */
export default function App() {
  const [fontsLoaded] = useFonts({
    'Copia de Apis-Light': require('../../public/Tipografia/Copia de Apis-Light.ttf'),
    'Copia de Apis-Regular': require('../../public/Tipografia/Copia de Apis-Regular.ttf'),
    'Copia de Apis-Medium': require('../../public/Tipografia/Copia de Apis-Medium.ttf'),
    'Copia de Apis-Bold': require('../../public/Tipografia/Copia de Apis-Bold.ttf'),
    'Copia de Apis-ExtraBold': require('../../public/Tipografia/Copia de Apis-ExtraBold.ttf'),
    'Copia de Apis-Black': require('../../public/Tipografia/Copia de Apis-Black.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background.white }}>
        <ActivityIndicator size="large" color={Colors.base.primary} />
        <Text style={{ marginTop: 16, color: Colors.text.secondary }}>Cargando fuentes...</Text>
      </View>
    );
  }

  return (
    <ThemeProvider>
      <QueryProvider>
        <SocketProvider>
          <AuthProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </AuthProvider>
        </SocketProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}

