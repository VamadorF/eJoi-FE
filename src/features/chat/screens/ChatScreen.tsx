import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '@/shared/components/Screen';
import { Button } from '@/shared/components/Button';
import { EmptyState } from '@/shared/components/EmptyState';
import { useCompanionStore } from '@/features/companion/store/companion.store';
import { RootStackParamList } from '@/shared/types/navigation';
import { styles } from './ChatScreen.styles';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

type ChatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Chat'>;

export const ChatScreen: React.FC = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const { companion } = useCompanionStore();

  const handleStartOnboarding = () => {
    navigation.navigate('Onboarding');
  };

  if (!companion) {
    return (
      <Screen>
        <LinearGradient
          colors={[Colors.base.primary, Colors.base.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.emptyContainer}>
            <EmptyState
              title="No tienes un/a compañer@ aún"
              message="Completa el onboarding para crear tu compañer@ virtual y comenzar a chatear."
              icon="💬"
            />
            <View style={styles.emptyActions}>
              <Button
                title="Crear mi compañer@"
                onPress={handleStartOnboarding}
                variant="primary"
                style={styles.emptyButton}
              />
            </View>
          </View>
        </LinearGradient>
      </Screen>
    );
  }

  return (
    <Screen>
      <LinearGradient
        colors={[Colors.base.primary, Colors.base.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {companion.name}
            </Text>
            {companion.personality && (
              <Text style={styles.subtitle}>
                {companion.personality}
              </Text>
            )}
          </View>

          <ScrollView 
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
          >
            <View style={styles.welcomeMessage}>
              <Text style={styles.welcomeText}>
                ¡Hola! Soy {companion.name}. 👋
              </Text>
              <Text style={styles.welcomeSubtext}>
                {companion.personality}
              </Text>
              <Text style={styles.welcomeSubtext}>
                Estoy aquí para conversar contigo. ¿En qué puedo ayudarte hoy?
              </Text>
            </View>
          </ScrollView>

          {/* TODO: Agregar input de mensaje y funcionalidad de chat */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputPlaceholder}>
              Próximamente: Envía un mensaje...
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Screen>
  );
};
