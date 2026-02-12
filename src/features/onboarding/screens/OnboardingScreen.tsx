import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
  ZoomIn,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  SharedValue,
  withSpring,
  withTiming,
  withSequence,
  interpolate,
} from 'react-native-reanimated';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  GradientBackground,
  WizardHeader,
  CardSurface,
  ContentContainer,
  OptionButton,
  ChoiceChip,
  TextField,
  PrimaryCTA,
  CircleSelector,
  CategoryPill,
} from '@/shared/components';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '@/shared/types/navigation';
import { OnboardingData, Gender } from '../types';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';
import { styles } from './OnboardingScreen.styles';
import { validators } from '@/shared/utils/validators';
import { getRandomCompanionName } from '../data/getRandomCompanionName';
import { useGenderedTextWithGender } from '@/shared/hooks/useGenderedText';

// Imágenes para los selectores de estilo visual, indexadas por género
const STYLE_IMAGES = {
  femenino: {
    realista: require('../../../../public/IMG/arquetipos/La Musa.jpg'),
    anime: require('../../../../public/IMG/anime/Anime_musa.png'),
  },
  masculino: {
    realista: require('../../../../public/IMG/arquetipos/Ejecutivo.png'),
    anime: require('../../../../public/IMG/anime/anime_ejecutivo.png'),
  },
  neutro: {
    realista: require('../../../../public/IMG/arquetipos/Intelectual.png'),
    anime: require('../../../../public/IMG/anime/Anime_intelectual.png'),
  },
};

type OnboardingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
type OnboardingScreenRouteProp = RouteProp<RootStackParamList, 'Onboarding'>;

// Opciones predefinidas
const PERSONALITY_OPTIONS = [
  'Amigable y empática',
  'Divertida y desenfadada',
  'Inteligente y curiosa',
  'Cariñosa y comprensiva',
  'Energética y motivadora',
  'Tranquila y reflexiva',
  'Analítica y lógica',
  'Creativa y artística',
];

const TONE_OPTIONS = [
  'Casual y relajado',
  'Formal y profesional',
  'Cariñoso y cercano',
  'Divertido y juguetón',
  'Serio y directo',
  'Inspirador y positivo',
  'Coloquial y natural',
  'Elegante y sofisticado',
];

const INTERACTION_STYLE_OPTIONS = [
  'Conversación profunda',
  'Charla ligera y casual',
  'Apoyo emocional',
  'Compañía y entretenimiento',
  'Aprendizaje y crecimiento',
  'Motivación y coaching',
  'Amistad y complicidad',
  'Mentoría y guía',
];

const CONVERSATION_DEPTH_OPTIONS = [
  'Superficial y ligera',
  'Moderada y equilibrada',
  'Profunda y reflexiva',
  'Muy profunda y filosófica',
];

const INTEREST_OPTIONS = [
  'Tecnología',
  'Arte y cultura',
  'Ciencia',
  'Deportes',
  'Música',
  'Literatura',
  'Cine y series',
  'Viajes',
  'Cocina',
  'Filosofía',
  'Psicología',
  'Historia',
  'Negocios',
  'Salud y bienestar',
  'Moda y estilo',
];

const BOUNDARY_OPTIONS = [
  'No temas sexuales',
  'Mantener respeto',
  'No lenguaje ofensivo',
  'Conversaciones apropiadas',
  'Límites emocionales claros',
  'Evitar temas políticos',
  'No discusiones religiosas',
];

// Opciones de estilo visual y género
const VISUAL_STYLE_OPTIONS = [
  { id: 'realista', label: 'Realista', icon: '👤' },
  { id: 'anime', label: 'Anime', icon: '🎨' },
] as const;

const GENDER_OPTIONS = [
  { id: 'femenino', label: 'Femenino', icon: '♀' },
  { id: 'masculino', label: 'Masculino', icon: '♂' },
  { id: 'neutro', label: 'Neutro', icon: '⚧' },
] as const;

const TOTAL_STEPS = 9;

// Configuración de partículas sparkle para el botón "Generar nombre"
const SPARKLE_CONFIGS = [
  { angle: 20, distance: 70, emoji: '✨' },
  { angle: 80, distance: 55, emoji: '⭐' },
  { angle: 140, distance: 65, emoji: '💫' },
  { angle: 200, distance: 60, emoji: '✨' },
  { angle: 260, distance: 50, emoji: '🌟' },
  { angle: 320, distance: 72, emoji: '⭐' },
];

// Componente de partícula sparkle animada
const SparkleParticle: React.FC<{
  progress: SharedValue<number>;
  angle: number;
  distance: number;
  emoji: string;
  index: number;
}> = ({ progress, angle, distance, emoji, index }) => {
  const radians = (angle * Math.PI) / 180;
  const dx = Math.cos(radians) * distance;
  const dy = Math.sin(radians) * distance;

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(progress.value, [0, 1], [0, dx]) },
      { translateY: interpolate(progress.value, [0, 1], [0, dy]) },
      { scale: interpolate(progress.value, [0, 0.25, 0.55, 1], [0, 1.4, 1, 0]) },
      { rotate: `${interpolate(progress.value, [0, 1], [0, 200 + index * 40])}deg` },
    ],
    opacity: interpolate(progress.value, [0, 0.15, 0.55, 1], [0, 1, 0.8, 0]),
  }));

  return (
    <Animated.Text style={[sparkleStyles.particle, animStyle]}>
      {emoji}
    </Animated.Text>
  );
};

// Componente animado para wraps
const AnimatedView = Animated.createAnimatedComponent(View);

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const route = useRoute<OnboardingScreenRouteProp>();
  const initialStep = route.params?.initialStep || 1;
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [animationKey, setAnimationKey] = useState(0);
  
  useEffect(() => {
    if (route.params?.initialStep) {
      setCurrentStep(route.params.initialStep);
    }
  }, [route.params?.initialStep]);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    visualStyle: '',
    gender: '',
    persona: '',
    tone: '',
    interactionStyle: '',
    conversationDepth: '',
    interests: [],
    boundaries: [],
    companionName: '',
    avatar: undefined,
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // Hook para textos con género dinámico
  const genderedText = useGenderedTextWithGender(onboardingData.gender as Gender | '');

  // === Glow effect for visual steps (1 & 2) ===
  const glowScale = useSharedValue(0);
  const glowOpacity = useSharedValue(0);
  const ringScale = useSharedValue(0);
  const ringOpacity = useSharedValue(0);

  const triggerSelectionEffect = () => {
    // Main glow orb: scale up then settle
    glowScale.value = 0.3;
    glowOpacity.value = 0;
    glowScale.value = withSequence(
      withSpring(1.5, { damping: 6, stiffness: 100 }),
      withSpring(1, { damping: 12, stiffness: 80 })
    );
    glowOpacity.value = withSequence(
      withTiming(0.5, { duration: 250 }),
      withTiming(0.18, { duration: 1200 })
    );
    // Expanding ring: grows outward and fades
    ringScale.value = 0.5;
    ringOpacity.value = 0;
    ringScale.value = withTiming(2.8, { duration: 900 });
    ringOpacity.value = withSequence(
      withTiming(0.4, { duration: 200 }),
      withTiming(0, { duration: 700 })
    );
  };

  useEffect(() => {
    if (onboardingData.gender) triggerSelectionEffect();
  }, [onboardingData.gender]);

  useEffect(() => {
    if (onboardingData.visualStyle) triggerSelectionEffect();
  }, [onboardingData.visualStyle]);

  const glowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glowScale.value }],
    opacity: glowOpacity.value,
  }));

  const ringAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
    opacity: ringOpacity.value,
  }));

  const handleNext = () => {
    setErrorMessage('');
    
    if (!canProceed()) {
      setErrorMessage('Por favor completa este paso antes de continuar');
      return;
    }

    if (currentStep < TOTAL_STEPS) {
      setAnimationKey(prev => prev + 1);
      setCurrentStep(currentStep + 1);
    } else {
      // Validar que los campos requeridos estén llenos
      if (!onboardingData.persona || !onboardingData.tone || !onboardingData.companionName) {
        setErrorMessage('Por favor completa todos los campos requeridos');
        return;
      }
      // Navegar a la pantalla de crear compañer@
      navigation.navigate('CreateCompanion', { onboardingData });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setAnimationKey(prev => prev + 1);
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleVisualStyleSelect = (style: 'realista' | 'anime') => {
    setOnboardingData({ ...onboardingData, visualStyle: style });
  };

  const handleGenderSelect = (gender: Gender) => {
    setOnboardingData({ ...onboardingData, gender: gender });
  };

  const handlePersonalitySelect = (option: string) => {
    setOnboardingData({ ...onboardingData, persona: option });
  };

  const handleToneSelect = (option: string) => {
    setOnboardingData({ ...onboardingData, tone: option });
  };

  const handleInteractionStyleSelect = (option: string) => {
    setOnboardingData({ ...onboardingData, interactionStyle: option });
  };

  const handleConversationDepthSelect = (option: string) => {
    setOnboardingData({ ...onboardingData, conversationDepth: option });
  };

  const handleInterestToggle = (interest: string) => {
    const interests = onboardingData.interests.includes(interest)
      ? onboardingData.interests.filter(i => i !== interest)
      : [...onboardingData.interests, interest];
    setOnboardingData({ ...onboardingData, interests });
  };

  const handleBoundaryToggle = (boundary: string) => {
    const boundaries = onboardingData.boundaries.includes(boundary)
      ? onboardingData.boundaries.filter(b => b !== boundary)
      : [...onboardingData.boundaries, boundary];
    setOnboardingData({ ...onboardingData, boundaries });
  };

  const handleCompanionNameChange = (text: string) => {
    setOnboardingData({ ...onboardingData, companionName: text });
    // Limpiar error general al escribir
    if (errorMessage === 'Por favor completa este paso antes de continuar') {
      setErrorMessage('');
    }
  };

  // Obtener el error de validación del nombre
  const getCompanionNameError = (): string | undefined => {
    const name = onboardingData.companionName;
    if (!name || name.trim() === '') return undefined;
    return validators.getNameError(name) || undefined;
  };

  // === Sparkle effect for "Generar nombre" button ===
  const sparkleProgress = useSharedValue(0);
  const nameBounce = useSharedValue(1);

  const triggerSparkleEffect = () => {
    // Burst of sparkle particles
    sparkleProgress.value = 0;
    sparkleProgress.value = withSequence(
      withTiming(1, { duration: 600 }),
      withTiming(0, { duration: 1 })
    );
    // Bounce on the text field
    nameBounce.value = withSequence(
      withSpring(1.05, { damping: 4, stiffness: 400 }),
      withSpring(0.97, { damping: 6, stiffness: 300 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    );
  };

  const nameBounceStyle = useAnimatedStyle(() => ({
    transform: [{ scale: nameBounce.value }],
  }));

  const handleRandomName = () => {
    const persona = onboardingData.persona;
    const gender = onboardingData.gender as Gender;
    if (persona && gender) {
      const newName = getRandomCompanionName(persona, gender);
      if (newName) {
        setOnboardingData({ ...onboardingData, companionName: newName });
        triggerSparkleEffect();
      }
    }
  };
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!onboardingData.gender;
      case 2:
        return !!onboardingData.visualStyle;
      case 3:
        return !!onboardingData.persona;
      case 4:
        return !!onboardingData.tone;
      case 5:
        return !!onboardingData.interactionStyle;
      case 6:
        return !!onboardingData.conversationDepth;
      case 7:
        return onboardingData.interests.length > 0; // Al menos un interés
      case 8:
        return true; // Los límites son opcionales
      case 9:
        // Validar que el nombre tenga al menos 2 caracteres y sea un nombre válido
        return !!onboardingData.companionName && 
               onboardingData.companionName.trim().length >= 2 && 
               validators.name(onboardingData.companionName);
      default:
        return false;
    }
  };

  const getStepContext = (step: number): string => {
    switch (step) {
      case 1:
        return 'Elige el género';
      case 2:
        return 'Elige el estilo visual';
      case 3:
        return genderedText.t('Define cómo quieres que sea tu compañer@');
      case 4:
        return 'Define cómo te habla';
      case 5:
        return 'Elige el tipo de relación';
      case 6:
        return 'Define la profundidad';
      case 7:
        return 'Elige intereses';
      case 8:
        return 'Establece límites';
      case 9:
        return 'Elige un nombre';
      default:
        return '';
    }
  };

  const getCTALabel = (step: number): string => {
    switch (step) {
      case 9:
        return 'Crear';
      default:
        return 'Siguiente';
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Animated.View 
            key={`step-1-${animationKey}`}
            style={styles.stepContainer}
            entering={FadeInDown.duration(400).springify()}
          >
            {/* Background glow on gender selection */}
            {onboardingData.gender !== '' && (
              <View style={localStyles.glowContainer} pointerEvents="none">
                <Animated.View style={[
                  localStyles.glowOrb,
                  glowAnimatedStyle,
                  { backgroundColor: onboardingData.gender === 'femenino'
                      ? 'rgba(242, 10, 100, 0.28)'
                      : onboardingData.gender === 'neutro'
                      ? 'rgba(107, 191, 138, 0.28)'
                      : 'rgba(123, 104, 238, 0.28)' },
                ]} />
                <Animated.View style={[
                  localStyles.glowRing,
                  ringAnimatedStyle,
                  { borderColor: onboardingData.gender === 'femenino'
                      ? 'rgba(242, 10, 100, 0.22)'
                      : onboardingData.gender === 'neutro'
                      ? 'rgba(107, 191, 138, 0.22)'
                      : 'rgba(123, 104, 238, 0.22)' },
                ]} />
              </View>
            )}
            <Animated.View 
              style={styles.visualStepHeader}
              entering={FadeInUp.delay(100).duration(300)}
            >
              <Text style={styles.visualStepTitle}>
                Elige tu <Text style={styles.highlightText}>{genderedText.companion()}</Text>
              </Text>
              <CategoryPill label="Físico" />
            </Animated.View>
            <Animated.View 
              style={styles.circleSelectorWrapper}
              entering={FadeIn.delay(200).duration(400)}
            >
              <CircleSelector
                options={[
                  { id: 'femenino', label: 'Femenino', icon: '♀' },
                  { id: 'masculino', label: 'Masculino', icon: '♂' },
                  { id: 'neutro', label: 'Neutro', icon: '⚧' },
                ]}
                selectedId={onboardingData.gender}
                onSelect={(id) => handleGenderSelect(id as Gender)}
              />
            </Animated.View>
          </Animated.View>
        );

      case 2:
        const selectedGender = (onboardingData.gender || 'femenino') as Gender;
        return (
          <Animated.View 
            key={`step-2-${animationKey}`}
            style={styles.stepContainer}
            entering={FadeInDown.duration(400).springify()}
          >
            {/* Background glow on visual style selection */}
            {onboardingData.visualStyle !== '' && (
              <View style={localStyles.glowContainer} pointerEvents="none">
                <Animated.View style={[
                  localStyles.glowOrb,
                  glowAnimatedStyle,
                  { backgroundColor: onboardingData.visualStyle === 'realista'
                      ? 'rgba(247, 191, 216, 0.4)'
                      : 'rgba(186, 176, 237, 0.4)' },
                ]} />
                <Animated.View style={[
                  localStyles.glowRing,
                  ringAnimatedStyle,
                  { borderColor: onboardingData.visualStyle === 'realista'
                      ? 'rgba(247, 191, 216, 0.3)'
                      : 'rgba(186, 176, 237, 0.3)' },
                ]} />
              </View>
            )}
            <Animated.View 
              style={styles.visualStepHeader}
              entering={FadeInUp.delay(100).duration(300)}
            >
              <Text style={styles.visualStepTitle}>
                Elige tu <Text style={styles.highlightText}>{genderedText.companion()}</Text>
              </Text>
              <CategoryPill label="Estilo" />
            </Animated.View>
            <Animated.View 
              style={styles.circleSelectorWrapper}
              entering={FadeIn.delay(200).duration(400)}
            >
              <CircleSelector
                options={[
                  { id: 'realista', label: 'Realista', image: STYLE_IMAGES[selectedGender].realista },
                  { id: 'anime', label: 'Anime', image: STYLE_IMAGES[selectedGender].anime },
                ]}
                selectedId={onboardingData.visualStyle}
                onSelect={(id) => handleVisualStyleSelect(id as 'realista' | 'anime')}
              />
            </Animated.View>
          </Animated.View>
        );

      case 3:
        return (
          <Animated.View 
            key={`step-3-${animationKey}`}
            style={styles.stepContainer}
            entering={FadeInDown.duration(400).springify()}
          >
            <Animated.Text 
              style={styles.stepIndicator}
              entering={FadeIn.delay(50).duration(200)}
            >
              Paso {currentStep} de {TOTAL_STEPS}
            </Animated.Text>
            <Animated.Text 
              style={styles.stepTitle}
              entering={FadeInUp.delay(100).duration(300)}
            >
              Elige la personalidad
            </Animated.Text>
            <Text style={styles.stepContext}>{getStepContext(currentStep)}</Text>
            <Text style={styles.stepSubtitle}>
              {genderedText.t('Selecciona cómo quieres que sea tu compañer@')}
            </Text>
            <Animated.View 
              style={styles.optionsContainer}
              entering={FadeIn.delay(200).duration(400)}
            >
              {PERSONALITY_OPTIONS.map((option, index) => (
                <Animated.View
                  key={option}
                  entering={FadeInDown.delay(150 + index * 50).duration(300)}
                >
                  <OptionButton
                    title={option}
                    onPress={() => handlePersonalitySelect(option)}
                    selected={onboardingData.persona === option}
                    leftIcon={<Ionicons name="person" size={20} color={onboardingData.persona === option ? Colors.text.white : Colors.text.secondary} />}
                    rightIcon="check"
                  />
                </Animated.View>
              ))}
            </Animated.View>
          </Animated.View>
        );

      case 4:
        return (
          <Animated.View 
            key={`step-4-${animationKey}`}
            style={styles.stepContainer}
            entering={FadeInDown.duration(400).springify()}
          >
            <Animated.Text 
              style={styles.stepIndicator}
              entering={FadeIn.delay(50).duration(200)}
            >
              Paso {currentStep} de {TOTAL_STEPS}
            </Animated.Text>
            <Animated.Text 
              style={styles.stepTitle}
              entering={FadeInUp.delay(100).duration(300)}
            >
              Elige el tono
            </Animated.Text>
            <Text style={styles.stepContext}>{getStepContext(currentStep)}</Text>
            <Text style={styles.stepSubtitle}>
              ¿Cómo quieres que hable contigo?
            </Text>
            <Animated.View 
              style={styles.optionsContainer}
              entering={FadeIn.delay(200).duration(400)}
            >
              {TONE_OPTIONS.map((option, index) => (
                <Animated.View
                  key={option}
                  entering={FadeInDown.delay(150 + index * 50).duration(300)}
                >
                  <OptionButton
                    title={option}
                    onPress={() => handleToneSelect(option)}
                    selected={onboardingData.tone === option}
                    leftIcon={<Ionicons name="chatbubbles" size={20} color={onboardingData.tone === option ? Colors.text.white : Colors.text.secondary} />}
                    rightIcon="check"
                  />
                </Animated.View>
              ))}
            </Animated.View>
          </Animated.View>
        );

      case 5:
        return (
          <Animated.View 
            key={`step-5-${animationKey}`}
            style={styles.stepContainer}
            entering={FadeInDown.duration(400).springify()}
          >
            <Animated.Text 
              style={styles.stepIndicator}
              entering={FadeIn.delay(50).duration(200)}
            >
              Paso {currentStep} de {TOTAL_STEPS}
            </Animated.Text>
            <Animated.Text 
              style={styles.stepTitle}
              entering={FadeInUp.delay(100).duration(300)}
            >
              Estilo de interacción
            </Animated.Text>
            <Text style={styles.stepContext}>{getStepContext(currentStep)}</Text>
            <Text style={styles.stepSubtitle}>
              {genderedText.t('¿Qué tipo de relación buscas con tu compañer@?')}
            </Text>
            <Animated.View 
              style={styles.optionsContainer}
              entering={FadeIn.delay(200).duration(400)}
            >
              {INTERACTION_STYLE_OPTIONS.map((option, index) => (
                <Animated.View
                  key={option}
                  entering={FadeInDown.delay(150 + index * 50).duration(300)}
                >
                  <OptionButton
                    title={option}
                    onPress={() => handleInteractionStyleSelect(option)}
                    selected={onboardingData.interactionStyle === option}
                    leftIcon={<Ionicons name="people" size={20} color={onboardingData.interactionStyle === option ? Colors.text.white : Colors.text.secondary} />}
                    rightIcon="check"
                  />
                </Animated.View>
              ))}
            </Animated.View>
          </Animated.View>
        );

      case 6:
        return (
          <Animated.View 
            key={`step-6-${animationKey}`}
            style={styles.stepContainer}
            entering={FadeInDown.duration(400).springify()}
          >
            <Animated.Text 
              style={styles.stepIndicator}
              entering={FadeIn.delay(50).duration(200)}
            >
              Paso {currentStep} de {TOTAL_STEPS}
            </Animated.Text>
            <Animated.Text 
              style={styles.stepTitle}
              entering={FadeInUp.delay(100).duration(300)}
            >
              Profundidad de conversación
            </Animated.Text>
            <Text style={styles.stepContext}>{getStepContext(currentStep)}</Text>
            <Text style={styles.stepSubtitle}>
              ¿Qué tan profundas quieres que sean las conversaciones?
            </Text>
            <Animated.View 
              style={styles.optionsContainer}
              entering={FadeIn.delay(200).duration(400)}
            >
              {CONVERSATION_DEPTH_OPTIONS.map((option, index) => (
                <Animated.View
                  key={option}
                  entering={FadeInDown.delay(150 + index * 50).duration(300)}
                >
                  <OptionButton
                    title={option}
                    onPress={() => handleConversationDepthSelect(option)}
                    selected={onboardingData.conversationDepth === option}
                    leftIcon={<Ionicons name="layers" size={20} color={onboardingData.conversationDepth === option ? Colors.text.white : Colors.text.secondary} />}
                    rightIcon="check"
                  />
                </Animated.View>
              ))}
            </Animated.View>
          </Animated.View>
        );

      case 7:
        return (
          <Animated.View 
            key={`step-7-${animationKey}`}
            style={styles.stepContainer}
            entering={FadeInDown.duration(400).springify()}
          >
            <Animated.Text 
              style={styles.stepIndicator}
              entering={FadeIn.delay(50).duration(200)}
            >
              Paso {currentStep} de {TOTAL_STEPS}
            </Animated.Text>
            <Animated.Text 
              style={styles.stepTitle}
              entering={FadeInUp.delay(100).duration(300)}
            >
              Tus intereses
            </Animated.Text>
            <Text style={styles.stepContext}>{getStepContext(currentStep)}</Text>
            <Text style={styles.stepSubtitle}>
              Selecciona los temas que te interesan (puedes elegir varios)
            </Text>
            <Animated.View 
              style={styles.chipsContainer}
              entering={FadeIn.delay(200).duration(400)}
            >
              {INTEREST_OPTIONS.map((option, index) => (
                <Animated.View
                  key={option}
                  entering={FadeIn.delay(100 + index * 30).duration(200)}
                >
                  <ChoiceChip
                    label={option}
                    onPress={() => handleInterestToggle(option)}
                    selected={onboardingData.interests.includes(option)}
                  />
                </Animated.View>
              ))}
            </Animated.View>
          </Animated.View>
        );

      case 8:
        return (
          <Animated.View 
            key={`step-8-${animationKey}`}
            style={styles.stepContainer}
            entering={FadeInDown.duration(400).springify()}
          >
            <Animated.Text 
              style={styles.stepIndicator}
              entering={FadeIn.delay(50).duration(200)}
            >
              Paso {currentStep} de {TOTAL_STEPS}
            </Animated.Text>
            <Animated.Text 
              style={styles.stepTitle}
              entering={FadeInUp.delay(100).duration(300)}
            >
              Define los límites
            </Animated.Text>
            <Text style={styles.stepContext}>{getStepContext(currentStep)}</Text>
            <Text style={styles.stepSubtitle}>
              Establece qué temas prefieres evitar (opcional)
            </Text>
            <Animated.View 
              style={styles.chipsContainer}
              entering={FadeIn.delay(200).duration(400)}
            >
              {BOUNDARY_OPTIONS.map((option, index) => (
                <Animated.View
                  key={option}
                  entering={FadeIn.delay(100 + index * 30).duration(200)}
                >
                  <ChoiceChip
                    label={option}
                    onPress={() => handleBoundaryToggle(option)}
                    selected={onboardingData.boundaries.includes(option)}
                  />
                </Animated.View>
              ))}
            </Animated.View>
          </Animated.View>
        );

      case 9:
        return (
          <Animated.View 
            key={`step-9-${animationKey}`}
            style={styles.stepContainer}
            entering={FadeInDown.duration(400).springify()}
          >
            <Animated.Text 
              style={styles.stepIndicator}
              entering={FadeIn.delay(50).duration(200)}
            >
              Paso {currentStep} de {TOTAL_STEPS}
            </Animated.Text>
            <Animated.Text 
              style={styles.stepTitle}
              entering={FadeInUp.delay(100).duration(300)}
            >
              Elige un nombre
            </Animated.Text>
            <Text style={styles.stepContext}>{getStepContext(currentStep)}</Text>
            <Text style={styles.stepSubtitle}>
              {genderedText.t('¿Cómo quieres llamar a tu compañer@?')}
            </Text>
            <Animated.View 
              style={styles.inputContainer}
              entering={FadeIn.delay(200).duration(400)}
            >
              <Animated.View style={nameBounceStyle}>
                <TextField
                  label={genderedText.t('Nombre de tu compañer@')}
                  placeholder="Ej: Luna, Alex, Maya..."
                  value={onboardingData.companionName || ''}
                  onChangeText={handleCompanionNameChange}
                  maxLength={20}
                  error={getCompanionNameError()}
                  helperText="Solo letras, sin números ni símbolos"
                />
              </Animated.View>
              <Animated.View 
                style={localStyles.randomRow}
                entering={FadeInUp.delay(300).duration(300)}
              >
                <Text style={localStyles.randomHint}>¿Sin ideas?</Text>
                <View style={sparkleStyles.buttonWrapper}>
                  {/* Sparkle particles */}
                  <View style={sparkleStyles.particleContainer} pointerEvents="none">
                    {SPARKLE_CONFIGS.map((config, i) => (
                      <SparkleParticle
                        key={i}
                        progress={sparkleProgress}
                        angle={config.angle}
                        distance={config.distance}
                        emoji={config.emoji}
                        index={i}
                      />
                    ))}
                  </View>
                  <Pressable
                    onPress={handleRandomName}
                    hitSlop={10}
                    style={({ pressed }) => [
                      localStyles.randomButton,
                      pressed && { opacity: 0.6 },
                    ]}
                  >
                    <Text style={localStyles.randomButtonText}> Generar nombre✨ </Text>
                  </Pressable>
                </View>
              </Animated.View>
            </Animated.View>
          </Animated.View>
        );

      default:
        return null;
    }
  };

  return (
      <GradientBackground
        variant="wizard"
        overlayImage={require('../../../../public/IMG/eJoi_INTERFAZ-12.png')}
        overlayOpacity={0.08}
      >
      <WizardHeader
        step={currentStep}
        total={TOTAL_STEPS}
        onBack={currentStep > 1 ? handleBack : undefined}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ContentContainer>
          {/* Pasos visuales (1 y 2) sin tarjeta para diseño más abierto */}
          {currentStep <= 2 ? (
            <View style={styles.visualStepContainer}>
              {renderStepContent()}
              {errorMessage && (
                <Text style={styles.errorText}>{errorMessage}</Text>
              )}
            </View>
          ) : (
            <CardSurface variant="glass" padding="lg" textColor={Colors.text.primary}>
              {renderStepContent()}
              {errorMessage && (
                <Text style={styles.errorText}>{errorMessage}</Text>
              )}
            </CardSurface>
          )}
        </ContentContainer>
      </ScrollView>
      <PrimaryCTA
        label={getCTALabel(currentStep)}
        onPress={handleNext}
        disabled={!canProceed()}
      />
    </GradientBackground>
  );
};

// TODO: Mover estos estilos a OnboardingScreen.styles.ts
const localStyles = StyleSheet.create({
  randomRow: {
    marginTop: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  randomHint: {
    color: Colors.text.secondary,
    fontSize: 13,
  },
  randomButton: {
    // Container for the button text
  },
  randomButtonText: {
    color: Colors.text.primary,
    fontSize: 13,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  // Glow effect styles for visual steps
  glowContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    zIndex: 0,
  },
  glowOrb: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
  },
  glowRing: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2.5,
    backgroundColor: 'transparent',
  },
});

// Estilos para el efecto sparkle del botón "Generar nombre"
const sparkleStyles = StyleSheet.create({
  buttonWrapper: {
    position: 'relative',
  },
  particleContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 0,
    height: 0,
    zIndex: 10,
    overflow: 'visible',
  },
  particle: {
    position: 'absolute',
    fontSize: 16,
    textAlign: 'center',
  },
});
