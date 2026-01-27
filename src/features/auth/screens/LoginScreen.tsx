import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking, Alert, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GoogleButton } from '../components/GoogleButton';
import { AppleButton } from '../components/AppleButton';
import { Button } from '@/shared/components/Button';
import { useAuth } from '../hooks/useAuth';
import { styles } from './LoginScreen.styles';
import { Colors } from '@/shared/theme/colors';

export const LoginScreen: React.FC = () => {
  const { loginWithGoogle, loginWithApple, isLoading } = useAuth();
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const [isAppleLoading, setIsAppleLoading] = React.useState(false);
  
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

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Error opening URL:', err));
  };

  return (
    <LinearGradient
      colors={['#4A90E2', '#5B9BD5', '#6BA3D6']}
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

          {/* Separador */}
          <Animated.View 
            style={[
              styles.separator,
              { opacity: fadeAnim },
            ]}
          >
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>Or</Text>
            <View style={styles.separatorLine} />
          </Animated.View>

          {/* Botón Create Account */}
          <Animated.View style={{ opacity: fadeAnim }}>
            <Button
              title="Create account"
              onPress={handleCreateAccount}
              variant="primary"
              disabled={isLoading}
              style={styles.createAccountButton}
            />
          </Animated.View>

          {/* Links de términos */}
          <Animated.View 
            style={[
              styles.termsContainer,
              { opacity: fadeAnim },
            ]}
          >
            <Text style={styles.termsText}>
              By signing up, you agree to the{' '}
              <Text
                style={styles.link}
                onPress={() => handleLinkPress('https://example.com/terms')}
              >
                Terms of Service
              </Text>
              {', '}
              <Text
                style={styles.link}
                onPress={() => handleLinkPress('https://example.com/privacy')}
              >
                Privacy Policy
              </Text>
              {', and '}
              <Text
                style={styles.link}
                onPress={() => handleLinkPress('https://example.com/cookies')}
              >
                Cookie Use
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
            <Text style={styles.loginLinkText}>
              Have an account already?{' '}
              <Text style={styles.link} onPress={handleLogin}>
                Log in
              </Text>
            </Text>
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
};
