import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Screen } from '@/shared/components/Screen';
import { useCompanionStore } from '@/features/companion/store/companion.store';
import { styles } from './ChatScreen.styles';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';

export const ChatScreen: React.FC = () => {
  const { companion } = useCompanionStore();

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {companion ? `Chat con ${companion.name}` : 'Chat'}
          </Text>
          {companion && (
            <Text style={styles.subtitle}>
              {companion.personality}
            </Text>
          )}
        </View>

        <ScrollView 
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
        >
          {companion ? (
            <View style={styles.welcomeMessage}>
              <Text style={styles.welcomeText}>
                ¡Hola! Soy {companion.name}. {companion.personality}
              </Text>
              <Text style={styles.welcomeSubtext}>
                Estoy aquí para conversar contigo. ¿En qué puedo ayudarte hoy?
              </Text>
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                No tienes una compañera configurada aún.
              </Text>
              <Text style={styles.emptySubtext}>
                Completa el onboarding para crear tu compañera virtual.
              </Text>
            </View>
          )}
        </ScrollView>

        {/* TODO: Agregar input de mensaje y funcionalidad de chat */}
      </View>
    </Screen>
  );
};

