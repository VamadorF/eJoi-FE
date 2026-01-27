import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './providers/ThemeProvider';
import { AuthProvider } from './providers/AuthProvider';
import { QueryProvider } from './providers/QueryProvider';
import { SocketProvider } from './providers/SocketProvider';
import { RootNavigator } from './navigation/RootNavigator';

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

