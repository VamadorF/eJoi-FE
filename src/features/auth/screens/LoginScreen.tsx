import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Alert, 
  Animated, 
  Modal, 
  Pressable, 
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '@/shared/components';
import { useAuth } from '../hooks/useAuth';
import { useCompanionStore } from '@/features/companion/store/companion.store';
import { RootStackParamList } from '@/shared/types/navigation';
import { styles } from './LoginScreen.styles';
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
  const logoScale = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
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
      Alert.alert('Éxito', 'Login con Google iniciado.');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error en login con Google:', error);
      Alert.alert('Login con Google', `Error: ${errorMessage}`);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    try {
      setIsAppleLoading(true);
      console.log('Intentando login con Apple...');
      await loginWithApple();
      Alert.alert('Éxito', 'Login con Apple iniciado.');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error en login con Apple:', error);
      Alert.alert('Login con Apple', `Error: ${errorMessage}`);
    } finally {
      setIsAppleLoading(false);
    }
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
    const blocks = raw.split('\n\n').map(s => s.trim()).filter(Boolean);
  
    return blocks.map((block, idx) => {
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
    await checkCompanion();
    const companionState = useCompanionStore.getState();
    
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
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Sección superior con imagen de fondo y logo */}
      <View style={styles.imageSection}>
        <Image
          source={require('../../../../public/IMG/eJoi_INTERFAZ-11.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
          accessibilityLabel="Background"
        />
        
        
      </View>

      {/* Sección inferior con botones */}
      <Animated.View style={[styles.bottomSection, { opacity: fadeAnim }]}>
        
        
        {/* Botones de Apple y Google */}
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonsRow}>
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={handleAppleLogin}
              disabled={isLoading || isAppleLoading}
              activeOpacity={0.7}
            >
              <Image
                source={require('../../../../public/logos/Apple_logo.png')}
                style={styles.socialButtonIcon}
                resizeMode="contain"
              />
              <Text style={styles.socialButtonText}>Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.socialButton}
              onPress={handleGoogleLogin}
              disabled={isLoading || isGoogleLoading}
              activeOpacity={0.7}
            >
              <Image
                source={require('../../../../public/logos/Android_logo.png')}
                style={styles.socialButtonIcon}
                resizeMode="contain"
              />
              <Text style={[styles.socialButtonText, styles.googleButtonText]}>Google</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Skip */}
        <View style={styles.skipContainer}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Explorar sin cuenta</Text>
          </TouchableOpacity>
        </View>

        {/* Términos */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            Al registrarte, aceptas los{' '}
            <Text style={styles.link} onPress={() => openModal('terms')}>
              Términos de Servicio
            </Text>
            {' y la '}
            <Text style={styles.link} onPress={() => openModal('privacy')}>
              Política de Privacidad
            </Text>
            .
          </Text>
        </View>
      </Animated.View>

      {/* Modal para Términos y Privacidad */}
      <Modal
        transparent
        visible={modalContent !== null}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <Pressable style={styles.sheetBackdrop} onPress={closeModal} />
        <SafeAreaView style={styles.sheetSafeArea} pointerEvents="box-none">
          <View style={styles.sheetContainer}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle} numberOfLines={1}>
                {modalContent?.title}
              </Text>
              <TouchableOpacity onPress={closeModal} style={styles.sheetCloseBtn}>
                <Text style={styles.sheetCloseText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sheetContent}>
              <ScrollView
                contentContainerStyle={styles.sheetScrollContent}
                showsVerticalScrollIndicator
              >
                {renderLegalText(modalContent?.content ?? '')}
              </ScrollView>
            </View>
            <View style={styles.sheetFooter}>
              <Button title="Entendido" onPress={closeModal} />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};
