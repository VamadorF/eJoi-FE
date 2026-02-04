import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
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
} from '@/shared/components';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '@/shared/types/navigation';
import { OnboardingData } from '../types';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

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

const TOTAL_STEPS = 7;

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const route = useRoute<OnboardingScreenRouteProp>();
  const initialStep = route.params?.initialStep || 1;
  const [currentStep, setCurrentStep] = useState(initialStep);
  
  useEffect(() => {
    if (route.params?.initialStep) {
      setCurrentStep(route.params.initialStep);
    }
  }, [route.params?.initialStep]);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
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

  const handleNext = () => {
    setErrorMessage('');
    
    if (!canProceed()) {
      setErrorMessage('Por favor completa este paso antes de continuar');
      return;
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      // Validar que los campos requeridos estén llenos
      if (!onboardingData.persona || !onboardingData.tone || !onboardingData.companionName) {
        setErrorMessage('Por favor completa todos los campos requeridos');
        return;
      }
      // Navegar a la pantalla de crear compañera
      navigation.navigate('CreateCompanion', { onboardingData });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
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
    setErrorMessage('');
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!onboardingData.persona;
      case 2:
        return !!onboardingData.tone;
      case 3:
        return !!onboardingData.interactionStyle;
      case 4:
        return !!onboardingData.conversationDepth;
      case 5:
        return onboardingData.interests.length > 0; // Al menos un interés
      case 6:
        return true; // Los límites son opcionales
      case 7:
        return !!onboardingData.companionName && onboardingData.companionName.trim().length >= 2;
      default:
        return false;
    }
  };

  const getStepContext = (step: number): string => {
    switch (step) {
      case 1:
        return 'Define cómo quieres que sea tu compañera';
      case 2:
        return 'Define cómo te habla';
      case 3:
        return 'Elige el tipo de relación';
      case 4:
        return 'Define la profundidad';
      case 5:
        return 'Elige intereses';
      case 6:
        return 'Establece límites';
      case 7:
        return 'Elige un nombre';
      default:
        return '';
    }
  };

  const getCTALabel = (step: number): string => {
    switch (step) {
      case 7:
        return 'Crear';
      default:
        return 'Siguiente';
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepIndicator}>Paso {currentStep} de {TOTAL_STEPS}</Text>
            <Text style={styles.stepTitle}>Elige la personalidad</Text>
            <Text style={styles.stepContext}>{getStepContext(currentStep)}</Text>
            <Text style={styles.stepSubtitle}>
              Selecciona cómo quieres que sea tu compañera
            </Text>
            <View style={styles.optionsContainer}>
              {PERSONALITY_OPTIONS.map((option) => (
                <OptionButton
                  key={option}
                  title={option}
                  onPress={() => handlePersonalitySelect(option)}
                  selected={onboardingData.persona === option}
                  leftIcon={<Ionicons name="person" size={20} color={onboardingData.persona === option ? Colors.text.white : Colors.text.secondary} />}
                  rightIcon="check"
                />
              ))}
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepIndicator}>Paso {currentStep} de {TOTAL_STEPS}</Text>
            <Text style={styles.stepTitle}>Elige el tono</Text>
            <Text style={styles.stepContext}>{getStepContext(currentStep)}</Text>
            <Text style={styles.stepSubtitle}>
              ¿Cómo quieres que hable contigo?
            </Text>
            <View style={styles.optionsContainer}>
              {TONE_OPTIONS.map((option) => (
                <OptionButton
                  key={option}
                  title={option}
                  onPress={() => handleToneSelect(option)}
                  selected={onboardingData.tone === option}
                  leftIcon={<Ionicons name="chatbubbles" size={20} color={onboardingData.tone === option ? Colors.text.white : Colors.text.secondary} />}
                  rightIcon="check"
                />
              ))}
            </View>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepIndicator}>Paso {currentStep} de {TOTAL_STEPS}</Text>
            <Text style={styles.stepTitle}>Estilo de interacción</Text>
            <Text style={styles.stepContext}>{getStepContext(currentStep)}</Text>
            <Text style={styles.stepSubtitle}>
              ¿Qué tipo de relación buscas con tu compañera?
            </Text>
            <View style={styles.optionsContainer}>
              {INTERACTION_STYLE_OPTIONS.map((option) => (
                <OptionButton
                  key={option}
                  title={option}
                  onPress={() => handleInteractionStyleSelect(option)}
                  selected={onboardingData.interactionStyle === option}
                  leftIcon={<Ionicons name="people" size={20} color={onboardingData.interactionStyle === option ? Colors.text.white : Colors.text.secondary} />}
                  rightIcon="check"
                />
              ))}
            </View>
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepIndicator}>Paso {currentStep} de {TOTAL_STEPS}</Text>
            <Text style={styles.stepTitle}>Profundidad de conversación</Text>
            <Text style={styles.stepContext}>{getStepContext(currentStep)}</Text>
            <Text style={styles.stepSubtitle}>
              ¿Qué tan profundas quieres que sean las conversaciones?
            </Text>
            <View style={styles.optionsContainer}>
              {CONVERSATION_DEPTH_OPTIONS.map((option) => (
                <OptionButton
                  key={option}
                  title={option}
                  onPress={() => handleConversationDepthSelect(option)}
                  selected={onboardingData.conversationDepth === option}
                  leftIcon={<Ionicons name="layers" size={20} color={onboardingData.conversationDepth === option ? Colors.text.white : Colors.text.secondary} />}
                  rightIcon="check"
                />
              ))}
            </View>
          </View>
        );

      case 5:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepIndicator}>Paso {currentStep} de {TOTAL_STEPS}</Text>
            <Text style={styles.stepTitle}>Tus intereses</Text>
            <Text style={styles.stepContext}>{getStepContext(currentStep)}</Text>
            <Text style={styles.stepSubtitle}>
              Selecciona los temas que te interesan (puedes elegir varios)
            </Text>
            <View style={styles.chipsContainer}>
              {INTEREST_OPTIONS.map((option) => (
                <ChoiceChip
                  key={option}
                  label={option}
                  onPress={() => handleInterestToggle(option)}
                  selected={onboardingData.interests.includes(option)}
                />
              ))}
            </View>
          </View>
        );

      case 6:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepIndicator}>Paso {currentStep} de {TOTAL_STEPS}</Text>
            <Text style={styles.stepTitle}>Define los límites</Text>
            <Text style={styles.stepContext}>{getStepContext(currentStep)}</Text>
            <Text style={styles.stepSubtitle}>
              Establece qué temas prefieres evitar (opcional)
            </Text>
            <View style={styles.chipsContainer}>
              {BOUNDARY_OPTIONS.map((option) => (
                <ChoiceChip
                  key={option}
                  label={option}
                  onPress={() => handleBoundaryToggle(option)}
                  selected={onboardingData.boundaries.includes(option)}
                />
              ))}
            </View>
          </View>
        );

      case 7:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepIndicator}>Paso {currentStep} de {TOTAL_STEPS}</Text>
            <Text style={styles.stepTitle}>Elige un nombre</Text>
            <Text style={styles.stepContext}>{getStepContext(currentStep)}</Text>
            <Text style={styles.stepSubtitle}>
              ¿Cómo quieres llamar a tu compañera?
            </Text>
            <View style={styles.inputContainer}>
              <TextField
                label="Nombre de tu compañera"
                placeholder="Ej: Luna, Alex, Maya..."
                value={onboardingData.companionName || ''}
                onChangeText={handleCompanionNameChange}
                maxLength={20}
                error={
                  errorMessage && onboardingData.companionName && onboardingData.companionName.trim().length < 2
                    ? 'El nombre debe tener al menos 2 caracteres'
                    : undefined
                }
                helperText="Máximo 20 caracteres"
              />
            </View>
          </View>
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
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ContentContainer>
          <CardSurface variant="glass" padding="lg" textColor={Colors.text.primary}>
            {renderStepContent()}
            {errorMessage && (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}
          </CardSurface>
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

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  stepContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  stepIndicator: {
    ...Typography.styles.caption,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.base.secondary,
    marginBottom: Spacing.gapSm,
    textAlign: 'center',
  },
  stepTitle: {
    ...Typography.styles.h2,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.gapSm,
    textAlign: 'center',
  },
  stepContext: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.primary,
    marginBottom: Spacing.gapSm,
    textAlign: 'center',
  },
  stepSubtitle: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    marginBottom: Spacing.gapLg,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: Spacing.gapSm,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Spacing.lg,
  },
  inputContainer: {
    width: '100%',
    marginTop: Spacing.lg,
  },
  errorMessage: {
    ...Typography.styles.caption,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.error,
    textAlign: 'center',
    marginTop: Spacing.gapMd,
    paddingHorizontal: Spacing.md,
  },
  errorText: {
    ...Typography.styles.caption,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.error,
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
});
