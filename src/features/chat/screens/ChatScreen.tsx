import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInDown,
} from 'react-native-reanimated';
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
import { useGenderedText } from '@/shared/hooks/useGenderedText';

type ChatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Chat'>;

export const ChatScreen: React.FC = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const { companion } = useCompanionStore();
  const genderedText = useGenderedText();

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
            <Animated.View entering={FadeIn.duration(500)}>
              <EmptyState
                title={genderedText.t('No tienes un/a compañer@ aún')}
                message={genderedText.t('Completa el onboarding para crear tu compañer@ virtual y comenzar a chatear.')}
                icon="💬"
              />
            </Animated.View>
            <Animated.View 
              style={styles.emptyActions}
              entering={SlideInDown.delay(200).duration(400).springify()}
            >
              <Button
                title={genderedText.t('Crear mi compañer@')}
                onPress={handleStartOnboarding}
                variant="primary"
                style={styles.emptyButton}
              />
            </Animated.View>
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
          <Animated.View 
            style={styles.header}
            entering={FadeInDown.duration(400)}
          >
            <Text style={styles.title}>
              {companion.name}
            </Text>
            {companion.personality && (
              <Text style={styles.subtitle}>
                {companion.personality}
              </Text>
            )}
          </Animated.View>

          <ScrollView 
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
          >
            <Animated.View 
              style={styles.welcomeMessage}
              entering={FadeInUp.delay(200).duration(500)}
            >
              <Text style={styles.welcomeText}>
                ¡Hola! Soy {companion.name}. 👋
              </Text>
              <Text style={styles.welcomeSubtext}>
                {companion.personality}
              </Text>
              <Text style={styles.welcomeSubtext}>
                {genderedText.gender === 'femenino' 
                  ? 'Estoy aquí para conversar contigo. ¿En qué puedo ayudarte hoy?'
                  : 'Estoy aquí para conversar contigo. ¿En qué puedo ayudarte hoy?'}
              </Text>
            </Animated.View>
          </ScrollView>

          {/* TODO: Agregar input de mensaje y funcionalidad de chat */}
          <Animated.View 
            style={styles.inputContainer}
            entering={SlideInDown.delay(400).duration(400).springify()}
          >
            <Text style={styles.inputPlaceholder}>
              Próximamente: Envía un mensaje...
            </Text>
          </Animated.View>
        </View>
      </LinearGradient>
    </Screen>
  );
};
