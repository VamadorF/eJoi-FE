import React, { useState, useRef } from 'react';
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
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInDown,
  SlideInRight,
  ZoomIn,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { useCompanionStore } from '@/features/companion/store/companion.store';
import { useGenderedText } from '@/shared/hooks/useGenderedText';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Tipos
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  date: string;
}

interface PhysicalAttribute {
  label: string;
  color?: string;
}

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
    text: 'Una relación continua, no un chatbot.',
    isUser: true,
    timestamp: '18:09',
    date: 'Hoy',
  },
  {
    id: '5',
    text: 'Una relación',
    isUser: true,
    timestamp: '18:09',
    date: 'Hoy',
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

export const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'perfil'>('chat');
  const [perfilSubTab, setPerfilSubTab] = useState<'caracter' | 'fisico'>('fisico');
  const [isEditingConducta, setIsEditingConducta] = useState(false);
  const [conductaText, setConductaText] = useState('');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>(PLACEHOLDER_MESSAGES);
  const scrollViewRef = useRef<ScrollView>(null);
  const { companion } = useCompanionStore();
  const genderedText = useGenderedText();
  
  // Animación para botón de enviar
  const sendButtonScale = useSharedValue(1);

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

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        isUser: true,
        timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        date: 'Hoy',
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleSaveConducta = () => {
    // TODO: Guardar conducta en el backend
    setIsEditingConducta(false);
  };

  const sendButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sendButtonScale.value }],
  }));

  const handleSendPress = () => {
    sendButtonScale.value = withSequence(
      withSpring(0.9, { damping: 15, stiffness: 400 }),
      withSpring(1.1, { damping: 8, stiffness: 350 }),
      withSpring(1, { damping: 12, stiffness: 300 })
    );
    handleSend();
  };

  const renderMessage = (message: Message, index: number) => (
    <Animated.View
      key={message.id}
      entering={FadeInDown.delay(index * 50).duration(300)}
      style={[
        styles.messageContainer,
        message.isUser ? styles.userMessageContainer : styles.companionMessageContainer,
      ]}
    >
      <View
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
          {message.text}
        </Text>
      </View>
      <Text
        style={[
          styles.timestamp,
          message.isUser ? styles.userTimestamp : styles.companionTimestamp,
        ]}
      >
        {message.timestamp}
      </Text>
    </Animated.View>
  );

  const renderDateSeparator = (date: string) => (
    <View style={styles.dateSeparator}>
      <View style={styles.datePill}>
        <Text style={styles.dateText}>{date}</Text>
      </View>
    </View>
  );

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

      {/* Card de atributos */}
      <Animated.View 
        style={styles.attributesCard}
        entering={FadeInUp.delay(300).duration(400)}
      >
        {/* Sub-tabs Carácter / Físico */}
        <View style={styles.subTabContainer}>
          <Pressable
            onPress={() => setPerfilSubTab('caracter')}
            style={styles.subTabWrapper}
          >
            <View style={[
              styles.subTab,
              perfilSubTab === 'caracter' && styles.subTabInactive,
            ]}>
              <Text style={[
                styles.subTabText,
                perfilSubTab === 'caracter' ? styles.subTabTextInactive : styles.subTabTextActive,
              ]}>
                Carácter
              </Text>
            </View>
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
                <Text style={[
                  styles.attributeText,
                  !attr.color && styles.attributeTextNoColor,
                ]}>
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
      <Animated.View entering={FadeInUp.delay(400).duration(400)}>
        <Pressable
          style={styles.editConductaButton}
          onPress={() => setIsEditingConducta(true)}
        >
          <Text style={styles.editConductaText}>Editar conducta</Text>
        </Pressable>
      </Animated.View>
    </ScrollView>
  );

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
      <Pressable
        style={styles.saveButton}
        onPress={handleSaveConducta}
      >
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={32} color="#fff" />
        </View>
      </Pressable>
    </ScrollView>
  );

  return (
    <LinearGradient
      colors={[Colors.auxiliary.primary, Colors.auxiliary.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header con Tabs */}
        <Animated.View 
          style={styles.header}
          entering={FadeInDown.duration(400)}
        >
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
            style={styles.avatarContainer}
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
                  {group.messages.map((msg, idx) => renderMessage(msg, idx))}
                </Animated.View>
              ))}
            </ScrollView>

            {/* Input de mensaje */}
            <Animated.View 
              style={styles.inputContainer}
              entering={SlideInDown.delay(200).duration(400).springify()}
            >
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder=""
                  placeholderTextColor={Colors.text.light}
                  value={inputText}
                  onChangeText={setInputText}
                  onSubmitEditing={handleSendPress}
                  returnKeyType="send"
                />
              </View>
              <AnimatedPressable
                style={[styles.sendButton, sendButtonAnimatedStyle]}
                onPress={handleSendPress}
              >
                <Ionicons name="add" size={28} color={Colors.text.white} />
              </AnimatedPressable>
            </Animated.View>
          </KeyboardAvoidingView>
        ) : (
          isEditingConducta ? renderEditConductaContent() : renderPerfilContent()
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

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
  timestamp: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 11,
    color: Colors.text.secondary,
    marginTop: 4,
    lineHeight: 14,
  },
  userTimestamp: {
    marginRight: 4,
  },
  companionTimestamp: {
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  textInput: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 16,
    color: Colors.text.primary,
    minHeight: 24,
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
    marginBottom: 20,
    lineHeight: 30,
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
  subTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
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
  subTabText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: 14,
    lineHeight: 18,
  },
  subTabTextWhite: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 14,
    color: Colors.text.white,
    lineHeight: 18,
  },
  subTabTextActive: {
    color: Colors.text.secondary,
  },
  subTabTextInactive: {
    color: Colors.text.secondary,
  },
  attributesList: {
    paddingHorizontal: 8,
  },
  attributeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    minWidth: 0, // 🔧 permite encogimiento real en row
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
    flexShrink: 1, // 🔧 permite encogimiento
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
    marginBottom: 16,
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
});
