import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, Animated, Modal, Pressable, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { GoogleButton } from '../components/GoogleButton';
import { AppleButton } from '../components/AppleButton';
import { Button } from '@/shared/components/Button';
import { useAuth } from '../hooks/useAuth';
import { useCompanionStore } from '@/features/companion/store/companion.store';
import { RootStackParamList } from '@/shared/types/navigation';
import { styles } from './LoginScreen.styles';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import terminosContenido from '../assets/terminos.json';
import privacidadContenido from '../assets/privacidad.json';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { loginWithGoogle, loginWithApple, isLoading } = useAuth();
  const { checkCompanion } = useCompanionStore();
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const [isAppleLoading, setIsAppleLoading] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<{ title: string; content: string } | null>(null);
  
  // Animaciones
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;
  const logoScale = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      console.log('Intentando login con Google...');
      await loginWithGoogle();
      Alert.alert('Éxito', 'Login con Google iniciado. Las credenciales OAuth deben configurarse para completar el proceso.');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error en login con Google:', error);
      Alert.alert(
        'Login con Google',
        errorMessage.includes('no configurado') 
          ? 'Las credenciales de Google OAuth no están configuradas. Por favor, agrega EXPO_PUBLIC_GOOGLE_CLIENT_ID en tu archivo .env'
          : `Error: ${errorMessage}`
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    try {
      setIsAppleLoading(true);
      console.log('Intentando login con Apple...');
      await loginWithApple();
      Alert.alert('Éxito', 'Login con Apple iniciado. Las credenciales OAuth deben configurarse para completar el proceso.');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error en login con Apple:', error);
      Alert.alert(
        'Login con Apple',
        errorMessage.includes('no configurado')
          ? 'Las credenciales de Apple OAuth no están configuradas. Por favor, agrega EXPO_PUBLIC_APPLE_CLIENT_ID en tu archivo .env'
          : `Error: ${errorMessage}`
      );
    } finally {
      setIsAppleLoading(false);
    }
  };

  const handleCreateAccount = () => {
    // TODO: Navegar a pantalla de creación de cuenta cuando esté disponible
    console.log('Create account pressed');
  };

  const handleLogin = () => {
    // TODO: Navegar a pantalla de login cuando esté disponible
    console.log('Login pressed');
  };

  const legalContent = {
    terms: terminosContenido,
    privacy: privacidadContenido,
  };

  const openModal = (type: keyof typeof legalContent) => {
    setModalContent(legalContent[type]);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const renderLegalText = (raw: string) => {
    // Mejora MUCHO la legibilidad: separa por párrafos y respeta bullets
    const blocks = raw.split('\n\n').map(s => s.trim()).filter(Boolean);
  
    return blocks.map((block, idx) => {
      // bullets simples (líneas con "•")
      if (block.includes('•')) {
        const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
        return (
          <View key={idx} style={{ marginBottom: 14 }}>
            {lines.map((line, i) => {
              const isBullet = line.startsWith('•');
              if (!isBullet) {
                return (
                  <Text key={i} style={styles.sheetParagraph}>
                    {line}
                  </Text>
                );
              }
              return (
                <View key={i} style={styles.sheetBulletRow}>
                  <Text style={styles.sheetBulletSymbol}>•</Text>
                  <Text style={styles.sheetBulletText}>{line.replace(/^•\s*/, '')}</Text>
                </View>
              );
            })}
          </View>
        );
      }
  
      return (
        <Text key={idx} style={styles.sheetParagraph}>
          {block}
        </Text>
      );
    });
  };

  const handleSkip = async () => {
    // Verificar si tiene compañera
    await checkCompanion();
    
    // Obtener el estado actualizado después de checkCompanion
    const companionState = useCompanionStore.getState();
    
    // Navegar según el estado de la compañera
    if (companionState.hasCompanion) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Chat' }],
      });
    } else {
      navigation.navigate('Onboarding');
    }
  };

  return (
    <LinearGradient
      colors={Colors.background.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.loginCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Logo eJoi con animación */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                transform: [{ scale: logoScale }],
              },
            ]}
          >
            <Image
              source={require('../../../../public/logos/eJoi_logos-01.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>

          {/* Botones de autenticación social */}
          <Animated.View style={{ opacity: fadeAnim }}>
            <GoogleButton 
              onPress={handleGoogleLogin} 
              disabled={isLoading || isGoogleLoading}
              loading={isGoogleLoading}
            />
            <AppleButton 
              onPress={handleAppleLogin} 
              disabled={isLoading || isAppleLoading}
              loading={isAppleLoading}
            />
          </Animated.View>

          {/* Botón Skip */}
          <Animated.View style={[styles.skipContainer, { opacity: fadeAnim }]}>
            <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
              <Text style={styles.skipText}>Continuar sin login</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Separador */}
          

          {/* Botón Create Account */}
          

          {/* Links de términos */}
          <Animated.View 
            style={[
              styles.termsContainer,
              { opacity: fadeAnim },
            ]}
          >
            <Text style={styles.termsText}>
              Al registrarte, aceptas los{' '}
              <Text
                style={styles.link}
                onPress={() => openModal('terms')}
              >
                Términos de Servicio
              </Text>
              {' y la '}
              <Text
                style={styles.link}
                onPress={() => openModal('privacy')}
              >
                Política de Privacidad
              </Text>
              .
            </Text>
          </Animated.View>

          {/* Link de login */}
          <Animated.View 
            style={[
              styles.loginLinkContainer,
              { opacity: fadeAnim },
            ]}
          >
            
          </Animated.View>
        </Animated.View>
      </ScrollView>

      {/* Modal para Términos y Privacidad */}
      <Modal
        transparent
        visible={modalContent !== null}
        animationType="fade"
        onRequestClose={closeModal}
      >
        {/* Backdrop */}
        <Pressable style={styles.sheetBackdrop} onPress={closeModal} />

        {/* Sheet */}
        <SafeAreaView style={styles.sheetSafeArea} pointerEvents="box-none">
          <View style={styles.sheetContainer}>
            {/* Header fijo */}
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle} numberOfLines={1}>
                {modalContent?.title}
              </Text>

              <TouchableOpacity onPress={closeModal} style={styles.sheetCloseBtn}>
                <Text style={styles.sheetCloseText}>Cerrar</Text>
                {/*
                  Alternativa con icono:
                  <Ionicons name="close" size={20} color={Colors.text.primary} />
                */}
              </TouchableOpacity>
            </View>

            {/* Contenido scrolleable */}
            <View style={styles.sheetContent}>
              <ScrollView
                contentContainerStyle={styles.sheetScrollContent}
                showsVerticalScrollIndicator
              >
                {renderLegalText(modalContent?.content ?? '')}
              </ScrollView>
            </View>

            {/* Acción inferior opcional */}
            <View style={styles.sheetFooter}>
              <Button title="Entendido" onPress={closeModal} />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </LinearGradient>
  );
};
