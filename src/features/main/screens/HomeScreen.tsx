import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInDown,
  ZoomIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  withRepeat,
  withDelay,
  Easing,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
// import { Audio } from 'expo-av'; // Descomentar cuando se agreguen archivos de audio
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { useCompanionStore } from '@/features/companion/store/companion.store';
import { useGenderedText } from '@/shared/hooks/useGenderedText';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

// ============ TIPOS ============
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  date: string;
  readStatus?: 'sent' | 'read';
}

interface PhysicalAttribute {
  label: string;
  color?: string;
}

interface Badge {
  id: string;
  label: string;
  emoji: string;
  earned: boolean;
}

interface Memory {
  id: string;
  emoji: string;
  date: string;
}

// ============ CONSTANTES ============

// Placeholders contextuales rotativos
const INPUT_PLACEHOLDERS = [
  '¿Qué te gustaría decir ahora?',
  'Cuéntame algo',
  'Escribe aquí...',
  '¿Qué tienes en mente?',
  'Dime lo que piensas',
];

// Mensajes placeholder hardcodeados
const PLACEHOLDER_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Hola! estas?',
    isUser: false,
    timestamp: '18:01',
    date: 'Ayer',
  },
  {
    id: '2',
    text: 'Una relación continua, no un chatbot.',
    isUser: true,
    timestamp: '18:09',
    date: 'Ayer',
    readStatus: 'read',
  },
  {
    id: '3',
    text: 'Hola! estas?',
    isUser: false,
    timestamp: '18:01',
    date: 'Hoy',
  },
  {
    id: '4',
    text: 'Una relación continua, no un chatbot. Este es un mensaje más largo para probar la funcionalidad de "Leer más" que debería aparecer cuando el texto supera cierta cantidad de caracteres definida en el componente.',
    isUser: true,
    timestamp: '18:09',
    date: 'Hoy',
    readStatus: 'read',
  },
  {
    id: '5',
    text: 'Una relación',
    isUser: true,
    timestamp: '18:09',
    date: 'Hoy',
    readStatus: 'sent',
  },
];

// Atributos físicos placeholder
const PHYSICAL_ATTRIBUTES: PhysicalAttribute[] = [
  { label: 'Realista' },
  { label: 'Joven' },
  { label: 'Atlético' },
  { label: 'Tono piel', color: '#E8D4C4' },
  { label: 'Color ojos', color: '#40E0D0' },
  { label: 'Color cabello', color: '#8B6914' },
];

// Atributos de carácter placeholder
const CHARACTER_ATTRIBUTES = [
  'Inteligente y curiosa',
  'Empática',
  'Divertida',
  'Cariñosa',
  'Aventurera',
];

// Badges estéticos (fake, no persistente)
const BADGES: Badge[] = [
  { id: 'first-day', label: 'Primer día', emoji: '🌱', earned: true },
  { id: 'personality', label: 'Personalidad definida', emoji: '✨', earned: true },
  { id: 'deep-talk', label: 'Conversación profunda', emoji: '💫', earned: false },
];

// Galería de recuerdos (fake)
const FAKE_MEMORIES: Memory[] = [
  { id: '1', emoji: '☕', date: 'Hace 2 días' },
  { id: '2', emoji: '🌙', date: 'Ayer' },
  { id: '3', emoji: '💭', date: 'Hoy' },
];

// Imágenes placeholder según género y estilo
const AVATAR_IMAGES = {
  realista: {
    femenino: require('../../../../public/IMG/arquetipos/La Musa.jpg'),
    masculino: require('../../../../public/IMG/arquetipos/Ejecutivo.png'),
  },
  anime: {
    femenino: require('../../../../public/IMG/anime/Anime_musa.png'),
    masculino: require('../../../../public/IMG/anime/anime_ejecutivo.png'),
  },
};

// ============ COMPONENTE: Typing Indicator ============
const TypingIndicator: React.FC = () => {
  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);

  useEffect(() => {
    dot1.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 400, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
    dot2.value = withDelay(
      150,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 400, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );
    dot3.value = withDelay(
      300,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 400, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );
  }, []);

  const dotStyle1 = useAnimatedStyle(() => ({
    opacity: interpolate(dot1.value, [0, 1], [0.3, 1]),
    transform: [{ translateY: interpolate(dot1.value, [0, 1], [0, -2]) }],
  }));

  const dotStyle2 = useAnimatedStyle(() => ({
    opacity: interpolate(dot2.value, [0, 1], [0.3, 1]),
    transform: [{ translateY: interpolate(dot2.value, [0, 1], [0, -2]) }],
  }));

  const dotStyle3 = useAnimatedStyle(() => ({
    opacity: interpolate(dot3.value, [0, 1], [0.3, 1]),
    transform: [{ translateY: interpolate(dot3.value, [0, 1], [0, -2]) }],
  }));

  return (
    <View style={typingStyles.container}>
      <View style={typingStyles.bubble}>
        <Animated.View style={[typingStyles.dot, dotStyle1]} />
        <Animated.View style={[typingStyles.dot, dotStyle2]} />
        <Animated.View style={[typingStyles.dot, dotStyle3]} />
      </View>
    </View>
  );
};

const typingStyles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    marginLeft: 40,
    marginTop: 8,
  },
  bubble: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.text.secondary,
  },
});

// ============ COMPONENTE PRINCIPAL ============
export const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'perfil'>('chat');
  const [perfilSubTab, setPerfilSubTab] = useState<'caracter' | 'fisico'>('fisico');
  const [isEditingConducta, setIsEditingConducta] = useState(false);
  const [conductaText, setConductaText] = useState('');
  const [inputText, setInputText] = useState('');
  const [inputHeight, setInputHeight] = useState(24);
  const [messages, setMessages] = useState<Message[]>(PLACEHOLDER_MESSAGES);
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set());
  const [isTyping, setIsTyping] = useState(false);
  const [lastSentMessageId, setLastSentMessageId] = useState<string | null>(null);
  const [showSavedConfirmation, setShowSavedConfirmation] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const { companion } = useCompanionStore();
  const genderedText = useGenderedText();
  const lastInteractionTime = useRef(Date.now());

  // Placeholder contextual aleatorio (se selecciona al montar)
  const placeholder = useMemo(
    () => INPUT_PLACEHOLDERS[Math.floor(Math.random() * INPUT_PLACEHOLDERS.length)],
    []
  );

  // Animaciones
  const sendButtonScale = useSharedValue(1);
  const sendButtonOpacity = useSharedValue(0.5);
  const avatarScale = useSharedValue(1);
  const avatarScaleY = useSharedValue(1);
  const bondBarWidth = useSharedValue(0);
  const saveButtonScale = useSharedValue(1);
  const savedCheckOpacity = useSharedValue(0);
  const highlightOpacity = useSharedValue(0);

  // Efecto para botón de enviar reactivo
  useEffect(() => {
    if (inputText.trim()) {
      sendButtonOpacity.value = withSpring(1);
      sendButtonScale.value = withSpring(1.05);
    } else {
      sendButtonOpacity.value = withSpring(0.5);
      sendButtonScale.value = withSpring(1);
    }
  }, [inputText]);

  // Pulso del avatar al escribir
  useEffect(() => {
    if (inputText) {
      lastInteractionTime.current = Date.now();
      avatarScale.value = withSequence(
        withSpring(1.04, { damping: 15, stiffness: 400 }),
        withSpring(1, { damping: 12, stiffness: 300 })
      );
    }
  }, [inputText]);

  // Idle animation del avatar (respiración cada 10-15s)
  useEffect(() => {
    const idleInterval = setInterval(() => {
      const timeSinceLastInteraction = Date.now() - lastInteractionTime.current;
      if (timeSinceLastInteraction > 5000) {
        avatarScaleY.value = withSequence(
          withTiming(1.02, { duration: 600, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) })
        );
      }
    }, 12000);

    return () => clearInterval(idleInterval);
  }, []);

  // Animación de barra de vínculo al entrar al perfil
  useEffect(() => {
    if (activeTab === 'perfil') {
      bondBarWidth.value = withDelay(
        400,
        withSpring(65, { damping: 15, stiffness: 100 })
      );
    } else {
      bondBarWidth.value = 0;
    }
  }, [activeTab]);

  // Obtener avatar según configuración
  const getAvatarImage = () => {
    const style = (companion?.visualStyle as 'realista' | 'anime') || 'realista';
    const gender = (companion?.gender as 'femenino' | 'masculino') || 'femenino';
    return AVATAR_IMAGES[style]?.[gender] || AVATAR_IMAGES.realista.femenino;
  };

  const companionName = companion?.name || 'Clara';

  // Agrupar mensajes por fecha
  const groupMessagesByDate = () => {
    const groups: { date: string; messages: Message[] }[] = [];
    let currentDate = '';

    messages.forEach((message) => {
      if (message.date !== currentDate) {
        currentDate = message.date;
        groups.push({ date: currentDate, messages: [message] });
      } else {
        groups[groups.length - 1].messages.push(message);
      }
    });

    return groups;
  };

  // Reproducir sonido (placeholder - los archivos de audio se pueden agregar después)
  const playSound = useCallback(async (_type: 'send' | 'receive' | 'confirm') => {
    // Los sonidos están deshabilitados por ahora hasta agregar archivos de audio
    // Para habilitar: crear archivos en public/sounds/ (send.mp3, receive.mp3, confirm.mp3)
    // y descomentar el código siguiente:
    /*
    try {
      const soundFiles = {
        send: require('../../../../public/sounds/send.mp3'),
        receive: require('../../../../public/sounds/receive.mp3'),
        confirm: require('../../../../public/sounds/confirm.mp3'),
      };
      const { sound } = await Audio.Sound.createAsync(soundFiles[type], { volume: 0.3 });
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch {
      // Silenciar errores de audio
    }
    */
  }, []);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessageId = Date.now().toString();
      const newMessage: Message = {
        id: newMessageId,
        text: inputText.trim(),
        isUser: true,
        timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        date: 'Hoy',
        readStatus: 'sent',
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      setInputHeight(24);
      setLastSentMessageId(newMessageId);

      // Haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      
      // Sonido de envío
      playSound('send');

      // Highlight temporal del último mensaje
      highlightOpacity.value = withSequence(
        withTiming(0.15, { duration: 150 }),
        withTiming(0, { duration: 300 })
      );

      // Transición de sent a read después de delay
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessageId ? { ...msg, readStatus: 'read' as const } : msg
          )
        );
      }, 1500);

      // Mostrar typing indicator (fake)
      setTimeout(() => {
        setIsTyping(true);
      }, 800);

      // Ocultar typing y simular respuesta
      setTimeout(() => {
        setIsTyping(false);
        playSound('receive');
      }, 2500);

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleSaveConducta = () => {
    // Haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    playSound('confirm');

    // Animación del botón
    saveButtonScale.value = withSequence(
      withSpring(0.9, { damping: 15, stiffness: 400 }),
      withSpring(1.1, { damping: 8, stiffness: 350 }),
      withSpring(1, { damping: 12, stiffness: 300 })
    );

    // Mostrar confirmación
    setShowSavedConfirmation(true);
    savedCheckOpacity.value = withSequence(
      withTiming(1, { duration: 200 }),
      withDelay(1500, withTiming(0, { duration: 300 }))
    );

    setTimeout(() => {
      setShowSavedConfirmation(false);
      setIsEditingConducta(false);
    }, 2000);
  };

  const toggleMessageExpanded = (messageId: string) => {
    setExpandedMessages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  const handleInputContentSizeChange = (
    event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
  ) => {
    const newHeight = Math.min(Math.max(event.nativeEvent.contentSize.height, 24), 100);
    setInputHeight(newHeight);
  };

  // Estilos animados
  const sendButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sendButtonScale.value }],
    opacity: sendButtonOpacity.value,
  }));

  const avatarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: avatarScale.value },
      { scaleY: avatarScaleY.value },
    ],
  }));

  const bondBarAnimatedStyle = useAnimatedStyle(() => ({
    width: `${bondBarWidth.value}%`,
  }));

  const saveButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: saveButtonScale.value }],
  }));

  const savedConfirmationStyle = useAnimatedStyle(() => ({
    opacity: savedCheckOpacity.value,
  }));

  const highlightAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(255, 255, 255, ${highlightOpacity.value})`,
  }));

  // ============ RENDER: Mensaje ============
  const renderMessage = (message: Message, index: number, isLastUserMessage: boolean) => {
    const isExpanded = expandedMessages.has(message.id);
    const shouldTruncate = message.text.length > 200 && !isExpanded;
    const displayText = shouldTruncate
      ? message.text.substring(0, 200) + '...'
      : message.text;

    return (
      <Animated.View
        key={message.id}
        entering={FadeInDown.delay(index * 40).duration(250).springify()}
        style={[
          styles.messageContainer,
          message.isUser ? styles.userMessageContainer : styles.companionMessageContainer,
          isLastUserMessage && message.id === lastSentMessageId && highlightAnimatedStyle,
        ]}
      >
        <Pressable
          onPress={() => shouldTruncate || isExpanded ? toggleMessageExpanded(message.id) : null}
          style={[
            styles.messageBubble,
            message.isUser ? styles.userBubble : styles.companionBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              message.isUser ? styles.userMessageText : styles.companionMessageText,
            ]}
          >
            {displayText}
          </Text>
          {message.text.length > 200 && (
            <Text style={styles.readMoreText}>
              {isExpanded ? 'Ver menos' : 'Leer más...'}
            </Text>
          )}
        </Pressable>
        <View style={styles.timestampContainer}>
          <Text
            style={[
              styles.timestamp,
              message.isUser ? styles.userTimestamp : styles.companionTimestamp,
            ]}
          >
            {message.timestamp}
          </Text>
          {message.isUser && message.readStatus && (
            <Text style={styles.readStatus}>
              {message.readStatus === 'read' ? '✓✓' : '✓'}
            </Text>
          )}
        </View>
      </Animated.View>
    );
  };

  const renderDateSeparator = (date: string) => (
    <View style={styles.dateSeparator}>
      <View style={styles.datePill}>
        <Text style={styles.dateText}>{date}</Text>
      </View>
    </View>
  );

  // ============ RENDER: Perfil ============
  const renderPerfilContent = () => (
    <ScrollView
      style={styles.perfilScrollView}
      contentContainerStyle={styles.perfilScrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Imagen grande del companion */}
      <Animated.View
        style={styles.profileImageContainer}
        entering={ZoomIn.duration(500).springify()}
      >
        <Image
          source={getAvatarImage()}
          style={styles.profileImage}
          resizeMode="cover"
        />
      </Animated.View>

      {/* Nombre */}
      <Animated.Text
        style={styles.profileName}
        entering={FadeInUp.delay(200).duration(400)}
      >
        {companionName}
      </Animated.Text>

      {/* Barra de Vínculo */}
      <Animated.View
        style={styles.bondContainer}
        entering={FadeInUp.delay(250).duration(400)}
      >
        <Text style={styles.bondLabel}>Vínculo</Text>
        <View style={styles.bondBarBg}>
          <AnimatedLinearGradient
            colors={[Colors.base.primary, Colors.base.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.bondBarFill, bondBarAnimatedStyle]}
          />
        </View>
      </Animated.View>

      {/* Badges */}
      <Animated.View
        style={styles.badgesContainer}
        entering={FadeInUp.delay(300).duration(400)}
      >
        {BADGES.map((badge, index) => (
          <Animated.View
            key={badge.id}
            entering={FadeIn.delay(350 + index * 100).duration(300)}
            style={[
              styles.badge,
              !badge.earned && styles.badgeNotEarned,
            ]}
          >
            <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
            <Text style={[styles.badgeLabel, !badge.earned && styles.badgeLabelNotEarned]}>
              {badge.label}
            </Text>
          </Animated.View>
        ))}
      </Animated.View>

      {/* Galería de Recuerdos */}
      <Animated.View
        style={styles.memoriesContainer}
        entering={FadeInUp.delay(400).duration(400)}
      >
        <Text style={styles.memoriesTitle}>Recuerdos</Text>
        <View style={styles.memoriesGrid}>
          {FAKE_MEMORIES.map((memory, index) => (
            <Animated.View
              key={memory.id}
              entering={FadeIn.delay(450 + index * 80).duration(300).springify()}
              style={styles.memoryCard}
            >
              <LinearGradient
                colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.6)']}
                style={styles.memoryCardGradient}
              >
                <Text style={styles.memoryEmoji}>{memory.emoji}</Text>
                <Text style={styles.memoryDate}>{memory.date}</Text>
              </LinearGradient>
            </Animated.View>
          ))}
        </View>
      </Animated.View>

      {/* Card de atributos */}
      <Animated.View
        style={styles.attributesCard}
        entering={FadeInUp.delay(500).duration(400)}
      >
        {/* Sub-tabs Carácter / Físico */}
        <View style={styles.subTabContainer}>
          <Pressable
            onPress={() => setPerfilSubTab('caracter')}
            style={styles.subTabWrapper}
          >
            {perfilSubTab === 'caracter' ? (
              <LinearGradient
                colors={[Colors.base.primary, Colors.base.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.subTabActive}
              >
                <Text style={styles.subTabTextWhite}>Carácter</Text>
              </LinearGradient>
            ) : (
              <View style={styles.subTabInactive}>
                <Text style={styles.subTabTextInactive}>Carácter</Text>
              </View>
            )}
          </Pressable>

          <Pressable
            onPress={() => setPerfilSubTab('fisico')}
            style={styles.subTabWrapper}
          >
            {perfilSubTab === 'fisico' ? (
              <LinearGradient
                colors={[Colors.base.primary, Colors.base.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.subTabActive}
              >
                <Text style={styles.subTabTextWhite}>Físico</Text>
              </LinearGradient>
            ) : (
              <View style={styles.subTabInactive}>
                <Text style={styles.subTabTextInactive}>Físico</Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* Lista de atributos */}
        <View style={styles.attributesList}>
          {perfilSubTab === 'fisico' ? (
            PHYSICAL_ATTRIBUTES.map((attr, index) => (
              <View key={index} style={styles.attributeRow}>
                {attr.color && (
                  <View style={[styles.colorDot, { backgroundColor: attr.color }]} />
                )}
                <Text
                  style={[
                    styles.attributeText,
                    !attr.color && styles.attributeTextNoColor,
                  ]}
                >
                  {attr.label}
                </Text>
              </View>
            ))
          ) : (
            CHARACTER_ATTRIBUTES.map((attr, index) => (
              <View key={index} style={styles.attributeRow}>
                <Text style={styles.attributeTextNoColor}>{attr}</Text>
              </View>
            ))
          )}
        </View>
      </Animated.View>

      {/* Botón Editar conducta */}
      <Animated.View entering={FadeInUp.delay(600).duration(400)}>
        <Pressable
          style={styles.editConductaButton}
          onPress={() => setIsEditingConducta(true)}
        >
          <Text style={styles.editConductaText}>Editar conducta</Text>
        </Pressable>
      </Animated.View>
    </ScrollView>
  );

  // ============ RENDER: Editar Conducta ============
  const renderEditConductaContent = () => (
    <ScrollView
      style={styles.perfilScrollView}
      contentContainerStyle={styles.perfilScrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Imagen grande del companion */}
      <View style={styles.profileImageContainer}>
        <Image
          source={getAvatarImage()}
          style={styles.profileImage}
          resizeMode="cover"
        />
      </View>

      {/* Nombre */}
      <Text style={styles.profileName}>{companionName}</Text>

      {/* Botón Editar conducta (header) */}
      <View style={styles.editConductaHeader}>
        <LinearGradient
          colors={[Colors.base.primary, Colors.base.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.editConductaHeaderButton}
        >
          <Text style={styles.editConductaHeaderText}>Editar conducta</Text>
        </LinearGradient>
      </View>

      {/* Helper text */}
      <Animated.View
        style={styles.helperTextContainer}
        entering={FadeIn.delay(100).duration(300)}
      >
        <Ionicons name="information-circle-outline" size={16} color={Colors.text.secondary} />
        <Text style={styles.helperText}>
          Esto define cómo se comporta {companionName}
        </Text>
      </Animated.View>

      {/* Card de edición */}
      <View style={styles.editCard}>
        <TextInput
          style={styles.editTextInput}
          placeholder="Escribe aquí las instrucciones de conducta..."
          placeholderTextColor="#999"
          value={conductaText}
          onChangeText={setConductaText}
          multiline
          textAlignVertical="top"
        />
      </View>

      {/* Botón de guardar */}
      <View style={styles.saveButtonContainer}>
        <AnimatedPressable
          style={[styles.saveButton, saveButtonAnimatedStyle]}
          onPress={handleSaveConducta}
        >
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={32} color="#fff" />
          </View>
        </AnimatedPressable>

        {/* Confirmación visual */}
        {showSavedConfirmation && (
          <Animated.View style={[styles.savedConfirmation, savedConfirmationStyle]}>
            <Text style={styles.savedConfirmationText}>¡Guardado!</Text>
          </Animated.View>
        )}
      </View>
    </ScrollView>
  );

  // ============ RENDER PRINCIPAL ============
  return (
    <LinearGradient
      colors={[Colors.auxiliary.primary, Colors.auxiliary.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header con Tabs */}
        <Animated.View style={styles.header} entering={FadeInDown.duration(400)}>
          <View style={styles.tabContainer}>
            <Pressable
              onPress={() => {
                setActiveTab('chat');
                setIsEditingConducta(false);
              }}
              style={styles.tabWrapper}
            >
              {activeTab === 'chat' ? (
                <LinearGradient
                  colors={[Colors.base.primary, Colors.base.secondary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.tabActive}
                >
                  <Text style={styles.tabTextActive}>Chat</Text>
                </LinearGradient>
              ) : (
                <View style={styles.tabInactive}>
                  <Text style={styles.tabTextInactive}>Chat</Text>
                </View>
              )}
            </Pressable>

            <Pressable
              onPress={() => {
                setActiveTab('perfil');
                setIsEditingConducta(false);
              }}
              style={styles.tabWrapper}
            >
              {activeTab === 'perfil' ? (
                <LinearGradient
                  colors={[Colors.base.primary, Colors.base.secondary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.tabActive}
                >
                  <Text style={styles.tabTextActive}>Perfil</Text>
                </LinearGradient>
              ) : (
                <View style={styles.tabInactive}>
                  <Text style={styles.tabTextInactive}>Perfil</Text>
                </View>
              )}
            </Pressable>
          </View>
        </Animated.View>

        {/* Avatar pequeño del companion (solo en chat) */}
        {activeTab === 'chat' && (
          <Animated.View
            style={[styles.avatarContainer, avatarAnimatedStyle]}
            entering={ZoomIn.delay(200).duration(400).springify()}
          >
            <Image
              source={getAvatarImage()}
              style={styles.avatar}
              resizeMode="cover"
            />
          </Animated.View>
        )}

        {/* Content */}
        {activeTab === 'chat' ? (
          <KeyboardAvoidingView
            style={styles.chatContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
          >
            <ScrollView
              ref={scrollViewRef}
              style={styles.messagesContainer}
              contentContainerStyle={styles.messagesContent}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
            >
              {groupMessagesByDate().map((group, groupIndex) => (
                <Animated.View
                  key={group.date}
                  entering={FadeIn.delay(groupIndex * 100).duration(300)}
                >
                  {renderDateSeparator(group.date)}
                  {group.messages.map((msg, idx) => {
                    const isLastUserMsg =
                      msg.isUser &&
                      idx === group.messages.length - 1 &&
                      groupIndex === groupMessagesByDate().length - 1;
                    return renderMessage(msg, idx, isLastUserMsg);
                  })}
                </Animated.View>
              ))}
              {isTyping && <TypingIndicator />}
            </ScrollView>

            {/* Input de mensaje */}
            <Animated.View
              style={styles.inputContainer}
              entering={SlideInDown.delay(200).duration(400).springify()}
            >
              <View style={[styles.inputWrapper, { minHeight: inputHeight + 24 }]}>
                <TextInput
                  style={[styles.textInput, { height: inputHeight }]}
                  placeholder={placeholder}
                  placeholderTextColor={Colors.text.light}
                  value={inputText}
                  onChangeText={(text) => {
                    setInputText(text);
                    lastInteractionTime.current = Date.now();
                  }}
                  onSubmitEditing={handleSendPress}
                  onContentSizeChange={handleInputContentSizeChange}
                  returnKeyType="send"
                  multiline
                  scrollEnabled={inputHeight >= 100}
                />
              </View>
              <AnimatedPressable
                style={[styles.sendButton, sendButtonAnimatedStyle]}
                onPress={handleSendPress}
              >
                <Ionicons
                  name={inputText.trim() ? 'send' : 'add'}
                  size={inputText.trim() ? 22 : 28}
                  color={Colors.text.white}
                />
              </AnimatedPressable>
            </Animated.View>
          </KeyboardAvoidingView>
        ) : isEditingConducta ? (
          renderEditConductaContent()
        ) : (
          renderPerfilContent()
        )}
      </SafeAreaView>
    </LinearGradient>
  );

  function handleSendPress() {
    sendButtonScale.value = withSequence(
      withSpring(0.85, { damping: 15, stiffness: 400 }),
      withSpring(1.15, { damping: 8, stiffness: 350 }),
      withSpring(1, { damping: 12, stiffness: 300 })
    );
    handleSend();
  }
};

// ============ ESTILOS ============
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.background.white,
    borderRadius: 25,
    padding: 4,
    shadowColor: Colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tabWrapper: {
    flex: 1,
  },
  tabActive: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 22,
    alignItems: 'center',
  },
  tabInactive: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 22,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  tabTextActive: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 16,
    color: Colors.text.white,
    lineHeight: 20,
  },
  tabTextInactive: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  avatarContainer: {
    position: 'absolute',
    top: 100,
    left: 16,
    zIndex: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.background.white,
  },
  chatContainer: {
    flex: 1,
    marginTop: 40,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  dateSeparator: {
    alignItems: 'center',
    marginVertical: 16,
  },
  datePill: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  dateText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: 12,
    color: Colors.text.secondary,
    lineHeight: 16,
  },
  messageContainer: {
    marginBottom: 8,
    maxWidth: '75%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  companionMessageContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 40,
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: Colors.base.primary,
    borderBottomRightRadius: 4,
  },
  companionBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 15,
    lineHeight: 20,
  },
  userMessageText: {
    color: Colors.text.white,
  },
  companionMessageText: {
    color: Colors.text.primary,
  },
  readMoreText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: 13,
    color: Colors.base.secondary,
    marginTop: 4,
    opacity: 0.8,
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  timestamp: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 11,
    color: Colors.text.secondary,
    lineHeight: 14,
  },
  userTimestamp: {
    marginRight: 4,
  },
  companionTimestamp: {
    marginLeft: 4,
  },
  readStatus: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 11,
    color: Colors.text.secondary,
    opacity: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: Colors.background.white,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
    shadowColor: Colors.text.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'center',
  },
  textInput: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 16,
    color: Colors.text.primary,
    minHeight: 24,
    maxHeight: 100,
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.base.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.base.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  // Perfil styles
  perfilScrollView: {
    flex: 1,
  },
  perfilScrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: Colors.text.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 12,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 24,
    color: Colors.base.primary,
    marginBottom: 12,
    lineHeight: 30,
  },

  // Bond bar
  bondContainer: {
    width: '100%',
    marginBottom: 16,
  },
  bondLabel: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: 13,
    color: Colors.text.secondary,
    marginBottom: 6,
  },
  bondBarBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  bondBarFill: {
    height: '100%',
    borderRadius: 4,
  },

  // Badges
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
    width: '100%',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    gap: 6,
  },
  badgeNotEarned: {
    opacity: 0.4,
  },
  badgeEmoji: {
    fontSize: 14,
  },
  badgeLabel: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: 12,
    color: Colors.text.primary,
  },
  badgeLabelNotEarned: {
    color: Colors.text.secondary,
  },

  // Memories
  memoriesContainer: {
    width: '100%',
    marginBottom: 20,
  },
  memoriesTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  memoriesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  memoryCard: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  memoryCardGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  memoryEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  memoryDate: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 11,
    color: Colors.text.secondary,
    textAlign: 'center',
  },

  attributesCard: {
    backgroundColor: Colors.background.white,
    borderRadius: 20,
    padding: 16,
    width: '100%',
    shadowColor: Colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  subTabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.background.light,
    borderRadius: 20,
    padding: 4,
    marginBottom: 16,
  },
  subTabWrapper: {
    flex: 1,
  },
  subTabActive: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  subTabInactive: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  subTabTextWhite: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 14,
    color: Colors.text.white,
    lineHeight: 18,
  },
  subTabTextInactive: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  attributesList: {
    paddingHorizontal: 8,
  },
  attributeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    minWidth: 0,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  attributeText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 16,
    color: Colors.text.primary,
    lineHeight: 22,
    flexShrink: 1,
    minWidth: 0,
  },
  attributeTextNoColor: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 16,
    color: Colors.text.primary,
    lineHeight: 22,
    flexShrink: 1,
    minWidth: 0,
  },
  editConductaButton: {
    borderWidth: 2,
    borderColor: Colors.base.primary,
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 40,
    backgroundColor: 'transparent',
  },
  editConductaText: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 18,
    color: Colors.base.primary,
    lineHeight: 22,
  },

  // Edit Conducta styles
  editConductaHeader: {
    marginBottom: 8,
  },
  editConductaHeaderButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  editConductaHeaderText: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 16,
    color: Colors.text.white,
    lineHeight: 20,
  },
  helperTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  helperText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  editCard: {
    backgroundColor: Colors.background.white,
    borderRadius: 20,
    padding: 16,
    width: '100%',
    minHeight: 200,
    shadowColor: Colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24,
  },
  editTextInput: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 16,
    color: Colors.text.primary,
    flex: 1,
    minHeight: 180,
  },
  saveButtonContainer: {
    alignItems: 'center',
  },
  saveButton: {
    alignItems: 'center',
  },
  checkCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.base.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.base.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  savedConfirmation: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.base.primary,
    borderRadius: 20,
  },
  savedConfirmationText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: 14,
    color: Colors.text.white,
  },
});
