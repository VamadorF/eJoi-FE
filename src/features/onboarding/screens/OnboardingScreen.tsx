import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
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

// Imágenes para los selectores de estilo visual
// Usando imágenes reales de las carpetas anime/ y arquetipos/
const REALISTA_IMAGE = require('../../../../public/IMG/arquetipos/La Musa.jpg');
const ANIME_IMAGE = require('../../../../public/IMG/anime/Anime_musa.png');

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
] as const;

const TOTAL_STEPS = 9;

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

  const handleGenderSelect = (gender: 'femenino' | 'masculino') => {
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

  const handleRandomName = () => {
    const persona = onboardingData.persona;
    const gender = onboardingData.gender as 'femenino' | 'masculino';
    if (persona && gender) {
      const newName = getRandomCompanionName(persona, gender);
      if (newName) {
        setOnboardingData({ ...onboardingData, companionName: newName });
      }
    }
  };
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!onboardingData.visualStyle;
      case 2:
        return !!onboardingData.gender;
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
        return 'Elige el estilo visual';
      case 2:
        return 'Elige el género';
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
                  { id: 'realista', label: 'Realista', image: REALISTA_IMAGE },
                  { id: 'anime', label: 'Anime', image: ANIME_IMAGE },
                ]}
                selectedId={onboardingData.visualStyle}
                onSelect={(id) => handleVisualStyleSelect(id as 'realista' | 'anime')}
              />
            </Animated.View>
          </Animated.View>
        );

      case 2:
        return (
          <Animated.View 
            key={`step-2-${animationKey}`}
            style={styles.stepContainer}
            entering={FadeInDown.duration(400).springify()}
          >
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
                ]}
                selectedId={onboardingData.gender}
                onSelect={(id) => handleGenderSelect(id as 'femenino' | 'masculino')}
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
              <TextField
                label={genderedText.t('Nombre de tu compañer@')}
                placeholder="Ej: Luna, Alex, Maya..."
                value={onboardingData.companionName || ''}
                onChangeText={handleCompanionNameChange}
                maxLength={20}
                error={getCompanionNameError()}
                helperText="Solo letras, sin números ni símbolos"
              />
              <Animated.View 
                style={localStyles.randomRow}
                entering={FadeInUp.delay(300).duration(300)}
              >
                <Text style={localStyles.randomHint}>¿Sin ideas?</Text>
                <Pressable
                  onPress={handleRandomName}
                  hitSlop={10}
                  style={({ pressed }) => [
                    localStyles.randomButton,
                    pressed && { opacity: 0.6 },
                  ]}
                >
                  <Text style={localStyles.randomButtonText}>🎲 Generar nombre</Text>
                </Pressable>
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
});
