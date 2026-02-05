import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from './src/app/providers/ThemeProvider';
import { AuthProvider } from './src/app/providers/AuthProvider';
import { QueryProvider } from './src/app/providers/QueryProvider';
import { SocketProvider } from './src/app/providers/SocketProvider';
import { RootNavigator } from './src/app/navigation/RootNavigator';
import { Colors } from './src/shared/theme/colors';

// Mantener splash screen mientras se cargan las fuentes
SplashScreen.preventAutoHideAsync();

/**
 * Entry point de la aplicación
 * Envuelve la app con todos los providers necesarios
 * Carga las fuentes Apis antes de mostrar la app
 */
export default function App() {
  const [fontsLoaded] = useFonts({
    'Copia de Apis-Light': require('./public/Tipografia/Copia de Apis-Light.ttf'),
    'Copia de Apis-Regular': require('./public/Tipografia/Copia de Apis-Regular.ttf'),
    'Copia de Apis-Medium': require('./public/Tipografia/Copia de Apis-Medium.ttf'),
    'Copia de Apis-Bold': require('./public/Tipografia/Copia de Apis-Bold.ttf'),
    'Copia de Apis-ExtraBold': require('./public/Tipografia/Copia de Apis-ExtraBold.ttf'),
    'Copia de Apis-Black': require('./public/Tipografia/Copia de Apis-Black.ttf'),
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.base.primary }}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={{ marginTop: 16, color: '#FFFFFF', fontSize: 16 }}>Cargando...</Text>
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
