import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WizardLayout } from '@/shared/components/WizardLayout';
import { OptionButton } from '@/shared/components/OptionButton';
import { ChoiceChip } from '@/shared/components/ChoiceChip';
import { Input } from '@/shared/components/Input';
import { RootStackParamList } from '@/shared/types/navigation';
import { OnboardingData } from '../types';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

type OnboardingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

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
  const [currentStep, setCurrentStep] = useState(1);
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Elige la personalidad</Text>
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
                  style={styles.optionButton}
                />
              ))}
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Elige el tono</Text>
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
                  style={styles.optionButton}
                />
              ))}
            </View>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Estilo de interacción</Text>
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
                  style={styles.optionButton}
                />
              ))}
            </View>
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Profundidad de conversación</Text>
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
                  style={styles.optionButton}
                />
              ))}
            </View>
          </View>
        );

      case 5:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Tus intereses</Text>
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
            <Text style={styles.stepTitle}>Define los límites</Text>
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
            <Text style={styles.stepTitle}>Elige un nombre</Text>
            <Text style={styles.stepSubtitle}>
              ¿Cómo quieres llamar a tu compañera?
            </Text>
            <View style={styles.inputContainer}>
              <Input
                placeholder="Ej: Luna, Alex, Maya..."
                value={onboardingData.companionName || ''}
                onChangeText={handleCompanionNameChange}
                containerStyle={styles.nameInputContainer}
                style={styles.nameInput}
                maxLength={20}
              />
              {errorMessage && onboardingData.companionName && onboardingData.companionName.trim().length < 2 && (
                <Text style={styles.errorText}>
                  El nombre debe tener al menos 2 caracteres
                </Text>
              )}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <WizardLayout
      currentStep={currentStep}
      totalSteps={TOTAL_STEPS}
      onNext={handleNext}
      onBack={handleBack}
      nextLabel={currentStep === TOTAL_STEPS ? 'Continuar' : 'Siguiente'}
      nextDisabled={!canProceed()}
      showBack={currentStep > 1}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {renderStepContent()}
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
      </ScrollView>
    </WizardLayout>
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
    flex: 1,
    paddingTop: Spacing.xl,
  },
  stepTitle: {
    ...Typography.styles.h2,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.white,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  stepSubtitle: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.white,
    opacity: 0.9,
    marginBottom: Spacing['2xl'],
    textAlign: 'center',
  },
  optionsContainer: {
    gap: Spacing.md,
  },
  optionButton: {
    width: '100%',
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
  nameInputContainer: {
    marginBottom: Spacing.md,
  },
  nameInput: {
    backgroundColor: Colors.background.white,
    opacity: 0.95,
  },
  errorMessage: {
    ...Typography.styles.bodySmall,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.error,
    textAlign: 'center',
    marginTop: Spacing.md,
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
