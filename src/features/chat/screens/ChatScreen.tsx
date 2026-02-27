import React, { useEffect } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
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
import { useSubscriptionStore } from '@/features/subscription/store/subscription.store';
import { RootStackParamList } from '@/shared/types/navigation';

import { styles } from './ChatScreen.styles';
import { Colors } from '@/shared/theme/colors';
import { useGenderedText } from '@/shared/hooks/useGenderedText';
import { generateGreeting, generateChatWelcome, generateAboutMe } from '@/shared/utils/companionTextGenerator';
import { useChatMessages } from '../hooks/useChatMessages';
import { useSendMessage } from '../hooks/useSendMessage';

type ChatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Chat'>;

export const ChatScreen: React.FC = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const { companion } = useCompanionStore();
  const genderedText = useGenderedText();
  const isSubscribed = useSubscriptionStore((s) => s.isSubscribed);
  const [draftMessage, setDraftMessage] = React.useState('');
  const { data: messages = [], isLoading: isMessagesLoading } = useChatMessages(companion?.id, 50);
  const sendMessageMutation = useSendMessage();

  // Guard: si hay companion pero no hay suscripción -> manda al paywall
  useEffect(() => {
    if (companion && !isSubscribed) {
      navigation.replace('SubscriptionPaywall', { companion });
    }
  }, [companion, isSubscribed, navigation]);

  const handleStartOnboarding = () => {
    navigation.navigate('Onboarding');
  };

  const handleSendMessage = async () => {
    const trimmedMessage = draftMessage.trim();
    if (!trimmedMessage || sendMessageMutation.isPending) {
      return;
    }

    try {
      await sendMessageMutation.mutateAsync({
        companionId: companion?.id,
        message: trimmedMessage,
      });
      setDraftMessage('');
    } catch {
      // Error surfaces through mutation state if needed.
    }
  };

  // Sin companion 
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
                message={genderedText.t(
                  'Completa el onboarding para crear tu compañer@ virtual y comenzar a chatear.'
                )}
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

  // ✅ Evita "flash" del chat si va a redirigir al paywall
  if (!isSubscribed) {
    return null;
  }

  // ✅ Mockup ORIGINAL intacto
  return (
    <Screen>
      <LinearGradient
        colors={[Colors.base.primary, Colors.base.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <Animated.View style={styles.header} entering={FadeInDown.duration(400)}>
            <Text style={styles.title}>{companion.name}</Text>

            {companion.persona && (
              <Text style={styles.subtitle}>{companion.persona}</Text>
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
                {generateGreeting(companion)}
              </Text>
              <Text style={styles.welcomeSubtext}>
                {generateAboutMe(companion)}
              </Text>
              <Text style={styles.welcomeSubtext}>
                {generateChatWelcome(companion)}
              </Text>
            </Animated.View>
            {isMessagesLoading ? (
              <Text style={styles.loadingText}>Cargando historial...</Text>
            ) : (
              messages.map((item) => {
                const isUserMessage = item.role === 'user';
                return (
                  <View
                    key={item.id}
                    style={[
                      styles.messageBubble,
                      isUserMessage ? styles.messageBubbleUser : styles.messageBubbleAssistant,
                    ]}
                  >
                    <Text style={[styles.messageText, isUserMessage && styles.messageTextUser]}>
                      {item.message}
                    </Text>
                    <Text style={[styles.messageTime, isUserMessage && styles.messageTimeUser]}>
                      {new Date(item.createdAt).toLocaleTimeString()}
                    </Text>
                  </View>
                );
              })
            )}
          </ScrollView>

          <Animated.View
            style={styles.inputContainer}
            entering={SlideInDown.delay(400).duration(400).springify()}
          >
            <View style={styles.composerRow}>
              <TextInput
                style={styles.composerInput}
                value={draftMessage}
                onChangeText={setDraftMessage}
                placeholder="Escribe un mensaje"
                onSubmitEditing={handleSendMessage}
                returnKeyType="send"
              />
              <Button
                title="Enviar"
                onPress={handleSendMessage}
                style={styles.composerButton}
                loading={sendMessageMutation.isPending}
                disabled={!draftMessage.trim()}
              />
            </View>
            {sendMessageMutation.isError && (
              <Text style={styles.inputPlaceholder}>
                No se pudo enviar el mensaje. Intenta nuevamente.
              </Text>
            )}
          </Animated.View>
        </View>
      </LinearGradient>
    </Screen>
  );
};
