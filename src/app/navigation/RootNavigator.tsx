import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useCompanionStore } from '@/features/companion/store/companion.store';
import { AuthNavigator } from './AuthNavigator';
import { MainTabs } from './MainTabs';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';

/**
 * Navegador raíz que decide entre AuthNavigator y MainTabs
 * según el estado de autenticación y si tiene compañera
 */
export const RootNavigator: React.FC = () => {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const { hasCompanion, isLoading: isCompanionLoading, checkCompanion } = useCompanionStore();

  useEffect(() => {
    console.log('RootNavigator mounted, checking auth...');
    checkAuth();
  }, []);

  useEffect(() => {
    // Cuando el usuario se autentica, verificar si tiene compañera
    if (isAuthenticated && !isLoading) {
      console.log('User authenticated, checking companion...');
      checkCompanion();
    }
  }, [isAuthenticated, isLoading]);

  useEffect(() => {
    console.log('Auth state changed:', { isAuthenticated, isLoading, hasCompanion, isCompanionLoading });
  }, [isAuthenticated, isLoading, hasCompanion, isCompanionLoading]);

  // Mostrar loading mientras se verifica la autenticación o la compañera
  if (isLoading || (isAuthenticated && isCompanionLoading)) {
    console.log('Showing loading screen...');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background.white }}>
        <ActivityIndicator size="large" color={Colors.base.primary} />
        <Text style={{ marginTop: 16, fontFamily: Typography.fontFamily.regular, color: Colors.text.secondary }}>Cargando...</Text>
      </View>
    );
  }

  console.log('Rendering navigator:', isAuthenticated ? 'MainTabs' : 'AuthNavigator');

  // Si está autenticado, mostrar MainTabs, sino AuthNavigator
  // El flujo de navegación dentro de AuthNavigator manejará Onboarding vs Chat
  return isAuthenticated ? <MainTabs /> : <AuthNavigator />;
};

