import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { RootStackParamList } from '@/shared/types/navigation';
import { OnboardingData } from '@/features/onboarding/types';
import { useCompanionStore } from '../store/companion.store';
import { Companion } from '../types';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

type CreandoCompanionScreenRouteProp = RouteProp<RootStackParamList, 'CreandoCompanion'>;
type CreandoCompanionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreandoCompanion'>;

export const CreandoCompanionScreen: React.FC = () => {
  const navigation = useNavigation<CreandoCompanionScreenNavigationProp>();
  const route = useRoute<CreandoCompanionScreenRouteProp>();
  const { setCompanion } = useCompanionStore();
  const onboardingData = route.params?.onboardingData;

  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Animación de rotación continua
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 3000,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    // Animación de pulso
    scale.value = withRepeat(
      withTiming(1.1, {
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    // Simular creación de compañera
    const timer = setTimeout(async () => {
      if (onboardingData) {
        // TODO: Llamar a API para crear la compañera
        // const response = await createCompanionAPI(onboardingData);
        
        // Por ahora, crear compañera mock
        const newCompanion: Companion = {
          id: `companion-${Date.now()}`,
          name: 'Tu Compañera', // TODO: Permitir al usuario elegir nombre
          personality: onboardingData.persona,
          tone: onboardingData.tone,
          interactionStyle: onboardingData.interactionStyle,
          conversationDepth: onboardingData.conversationDepth,
          interests: onboardingData.interests,
          traits: onboardingData.boundaries,
          avatar: onboardingData.avatar,
        };

        // Guardar en el store (esto también persiste en almacenamiento local)
        await setCompanion(newCompanion);

        // TODO: Guardar en el backend
        // await saveCompanionToAPI(newCompanion);

        // Navegar a la pantalla de compañera lista
        navigation.replace('CompanionReady', { companion: newCompanion });
      }
    }, 3000); // Simular 3 segundos de carga

    return () => clearTimeout(timer);
  }, []);

  const animatedSpiralStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
    };
  });

  return (
    <LinearGradient
      colors={[Colors.base.primary, Colors.base.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.View style={[styles.spiralContainer, animatedSpiralStyle]}>
          {/* Usar imagen de estatua/espiral si está disponible, sino usar un círculo animado */}
          <View style={styles.spiralPlaceholder} />
        </Animated.View>
        
        <Text style={styles.title}>Creando a tu compañera</Text>
        <Text style={styles.subtitle}>
          Estamos personalizando cada detalle para ti...
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.screen.paddingHorizontal,
  },
  spiralContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  spiralPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.auxiliary.primary,
    opacity: 0.3,
    borderWidth: 4,
    borderColor: Colors.text.white,
  },
  title: {
    ...Typography.styles.h2,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.white,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.white,
    opacity: 0.9,
    textAlign: 'center',
  },
});

