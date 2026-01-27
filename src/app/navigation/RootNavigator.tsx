import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { AuthNavigator } from './AuthNavigator';
import { MainTabs } from './MainTabs';
import { Colors } from '@/shared/theme/colors';

/**
 * Navegador raíz que decide entre AuthNavigator y MainTabs
 * según el estado de autenticación
 */
export const RootNavigator: React.FC = () => {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    console.log('RootNavigator mounted, checking auth...');
    checkAuth();
  }, []);

  useEffect(() => {
    console.log('Auth state changed:', { isAuthenticated, isLoading });
  }, [isAuthenticated, isLoading]);

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    console.log('Showing loading screen...');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background.white }}>
        <ActivityIndicator size="large" color={Colors.primary.main} />
        <Text style={{ marginTop: 16, color: Colors.text.secondary }}>Cargando...</Text>
      </View>
    );
  }

  console.log('Rendering navigator:', isAuthenticated ? 'MainTabs' : 'AuthNavigator');

  // Si está autenticado, mostrar MainTabs, sino AuthNavigator
  return isAuthenticated ? <MainTabs /> : <AuthNavigator />;
};

