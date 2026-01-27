import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/app/providers/ThemeProvider';
import { AuthProvider } from './src/app/providers/AuthProvider';
import { QueryProvider } from './src/app/providers/QueryProvider';
import { SocketProvider } from './src/app/providers/SocketProvider';
import { RootNavigator } from './src/app/navigation/RootNavigator';

/**
 * Entry point de la aplicación
 * Envuelve la app con todos los providers necesarios
 */
export default function App() {
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
