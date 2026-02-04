import React, { useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/shared/types/navigation';
import { OnboardingData } from '@/features/onboarding/types';
import { useCompanionStore } from '../store/companion.store';
import { Companion } from '../types';
import { GradientBackground, CreatingAnimation } from '@/shared/components';

type CreandoCompanionScreenRouteProp = RouteProp<RootStackParamList, 'CreandoCompanion'>;
type CreandoCompanionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreandoCompanion'>;

export const CreandoCompanionScreen: React.FC = () => {
  const navigation = useNavigation<CreandoCompanionScreenNavigationProp>();
  const route = useRoute<CreandoCompanionScreenRouteProp>();
  const { setCompanion } = useCompanionStore();
  const onboardingData = route.params?.onboardingData;

  const handleDone = async () => {
    if (onboardingData) {
      // TODO: Llamar a API para crear la compañera
      // const response = await createCompanionAPI(onboardingData);
      
      // Por ahora, crear compañera mock
      const newCompanion: Companion = {
        id: `companion-${Date.now()}`,
        name: onboardingData.companionName || 'Tu Compañera',
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
  };

  return (
    <GradientBackground variant="creating" safeArea>
      <CreatingAnimation
        durationMs={4000}
        messages={[
          'Sintetizando personalidad...',
          'Integrando intereses...',
          'Aplicando límites...',
          '¡Casi listo!',
        ]}
        onDone={handleDone}
      />
    </GradientBackground>
  );
};

