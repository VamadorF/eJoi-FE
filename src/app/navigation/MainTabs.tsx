import React from 'react';
import { View, Text } from 'react-native';
import { Screen } from '@/shared/components/Screen';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';

/**
 * Placeholder para tabs principales
 * TODO: Implementar tabs cuando las features estén disponibles
 * - Chat
 * - Companion
 * - Profile
 */
export const MainTabs: React.FC = () => {
  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ ...Typography.styles.h2, color: Colors.text.primary, marginBottom: 16 }}>
          Bienvenido a eJoi
        </Text>
        <Text style={{ ...Typography.styles.body, color: Colors.text.secondary, textAlign: 'center' }}>
          Esta es la pantalla principal. Las features de Chat, Companion y Onboarding se implementarán próximamente.
        </Text>
      </View>
    </Screen>
  );
};

