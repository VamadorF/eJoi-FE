import React, { useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Pressable } from 'react-native';
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
import { useSocket } from '@/app/providers/SocketProvider';
import {
  joinConversation,
  leaveConversation,
  onMessageNew,
  onMessageSent,
  onTypingStart,
  onTypingStop,
  sendMessageEvent,
} from '../services/chat.socket';
import { ChatHistoryPage, Message } from '../types';
import { queryKeys } from '@/shared/lib/queryKeys';
import { useQueryClient, InfiniteData } from '@tanstack/react-query';

type ChatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Chat'>;

export const ChatScreen: React.FC = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const { companion } = useCompanionStore();
  const genderedText = useGenderedText();
  const isSubscribed = useSubscriptionStore((s) => s.isSubscribed);
  const [draftMessage, setDraftMessage] = React.useState('');
  const [sendState, setSendState] = React.useState<'idle' | 'pending' | 'failed'>('idle');
  const [typingByCompanion, setTypingByCompanion] = React.useState(false);
  const {
    data,
    isLoading: isMessagesLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useChatMessages(companion?.id, 30);
  const sendMessageMutation = useSendMessage();
  const { socket, isConnected, connect } = useSocket();
  const queryClient = useQueryClient();
  const messages = React.useMemo(() => {
    const messageMap = new Map<string, Message>();
    (data?.flatMessages ?? []).forEach((message) => {
      messageMap.set(message.id, message);
    });
    return Array.from(messageMap.values()).sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [data?.flatMessages]);

  useEffect(() => {
    if (!companion?.id) {
      return;
    }
    if (!isConnected) {
      void connect();
      return;
    }

    joinConversation(socket, companion.id);

    const appendIncomingMessage = (incomingMessage: Message) => {
      if (incomingMessage.companionId !== companion.id) {
        return;
      }
      queryClient.setQueryData<InfiniteData<ChatHistoryPage>>(
        queryKeys.chat.messages(companion.id),
        (currentData) => {
          if (!currentData || currentData.pages.length === 0) {
            return {
              pageParams: [undefined],
              pages: [{ messages: [incomingMessage], hasMore: false, nextCursor: null }],
            };
          }
          const alreadyExists = currentData.pages.some((page) =>
            page.messages.some(
              (message) =>
                message.id === incomingMessage.id ||
                (incomingMessage.clientMessageId &&
                  message.clientMessageId === incomingMessage.clientMessageId)
            )
          );
          if (alreadyExists) {
            return currentData;
          }

          const lastPageIndex = currentData.pages.length - 1;
          return {
            ...currentData,
            pages: currentData.pages.map((page, index) =>
              index === lastPageIndex
                ? { ...page, messages: [...page.messages, { ...incomingMessage, deliveryStatus: 'sent' }] }
                : page
            ),
          };
        }
      );
    };

    const unsubscribeMessageNew = onMessageNew(socket, appendIncomingMessage);
    const unsubscribeMessageSent = onMessageSent(socket, appendIncomingMessage);
    const unsubscribeTypingStart = onTypingStart(socket, ({ companionId }) => {
      if (companionId === companion.id) {
        setTypingByCompanion(true);
      }
    });
    const unsubscribeTypingStop = onTypingStop(socket, ({ companionId }) => {
      if (companionId === companion.id) {
        setTypingByCompanion(false);
      }
    });

    return () => {
      unsubscribeMessageNew();
      unsubscribeMessageSent();
      unsubscribeTypingStart();
      unsubscribeTypingStop();
      leaveConversation(socket, companion.id);
      setTypingByCompanion(false);
    };
  }, [companion?.id, connect, isConnected, queryClient, socket]);

  // Nota: no bloqueamos la navegación por suscripción para evitar un estado
  // de transición permanente mientras se estabiliza el flujo de pantallas.

  const handleStartOnboarding = () => {
    navigation.navigate('Onboarding');
  };

  const handleSendMessage = async () => {
    const trimmedMessage = draftMessage.trim();
    if (!trimmedMessage || sendMessageMutation.isPending) {
      return;
    }

    const clientMessageId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setSendState('pending');
    try {
      if (isConnected && companion?.id) {
        sendMessageEvent(socket, {
          companionId: companion.id,
          message: trimmedMessage,
          clientMessageId,
        });
      }
      await sendMessageMutation.mutateAsync({
        companionId: companion?.id,
        message: trimmedMessage,
        clientMessageId,
      });
      setDraftMessage('');
      setSendState('idle');
    } catch {
      // The mutation updates message-level state, this keeps explicit local transaction state in sync.
      setSendState('failed');
    }
  };

  const handleRetryMessage = async (item: Message) => {
    if (!item.message || sendMessageMutation.isPending) {
      return;
    }
    setSendState('pending');
    try {
      await sendMessageMutation.mutateAsync({
        companionId: companion?.id,
        message: item.message,
        clientMessageId: item.clientMessageId ?? item.id,
      });
      setSendState('idle');
    } catch {
      setSendState('failed');
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
            onScroll={({ nativeEvent }) => {
              const nearTop = nativeEvent.contentOffset.y <= 24;
              if (nearTop && hasNextPage && !isFetchingNextPage && !isMessagesLoading) {
                void fetchNextPage();
              }
            }}
            scrollEventThrottle={120}
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
                    {isUserMessage && item.deliveryStatus === 'pending' && (
                      <Text style={[styles.messageTime, isUserMessage && styles.messageTimeUser]}>
                        Enviando...
                      </Text>
                    )}
                    {isUserMessage && item.deliveryStatus === 'failed' && (
                      <Pressable onPress={() => void handleRetryMessage(item)}>
                        <Text style={[styles.messageTime, isUserMessage && styles.messageTimeUser]}>
                          Fallo al enviar. Reintentar
                        </Text>
                      </Pressable>
                    )}
                  </View>
                );
              })
            )}
            {isFetchingNextPage && (
              <Text style={styles.loadingText}>Cargando mensajes anteriores...</Text>
            )}
            {typingByCompanion && (
              <Text style={styles.loadingText}>{companion.name} esta escribiendo...</Text>
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
            {(sendMessageMutation.isError || sendState === 'failed') && (
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
