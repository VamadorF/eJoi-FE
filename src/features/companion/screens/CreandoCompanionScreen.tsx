import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '@/shared/types/navigation';
import { useCompanionStore } from '../store/companion.store';
import { Gender } from '@/features/onboarding/types';
import { CreatingAnimation } from '@/shared/components';
import { logger } from '@/shared/utils/logger';
import { useCreateCompanion } from '../hooks/useCreateCompanion';

type CreandoCompanionScreenRouteProp = RouteProp<
  RootStackParamList,
  'CreandoCompanion'
>;
type CreandoCompanionScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CreandoCompanion'
>;

export const CreandoCompanionScreen: React.FC = () => {
  const navigation = useNavigation<CreandoCompanionScreenNavigationProp>();
  const route = useRoute<CreandoCompanionScreenRouteProp>();
  const { setCompanion } = useCompanionStore();
  const createCompanionMutation = useCreateCompanion();
  const onboardingData = route.params?.onboardingData;

  const handleDone = async () => {
    if (!onboardingData) return;

    const payload = {
      name: onboardingData.companionName || 'Tu Compañer@',
      visualStyle: onboardingData.visualStyle || 'realista',
      gender: (onboardingData.gender as Gender) || 'femenino',
      persona: onboardingData.persona,
      tone: onboardingData.tone,
      interactionStyle: onboardingData.interactionStyle,
      conversationDepth: onboardingData.conversationDepth,
      interests: onboardingData.interests,
      boundaries: onboardingData.boundaries,
    };

    try {
      const companion = await createCompanionMutation.mutateAsync(payload);
      await setCompanion(companion);

      navigation.reset({
        index: 0,
        routes: [{ name: 'SubscriptionPaywall', params: { companion } }],
      });
    } catch (error) {
      logger.error('Error creando companion:', error);
      Alert.alert(
        'Error',
        'No se pudo crear tu compañer@. Inténtalo de nuevo.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <SafeAreaView style={localStyles.container} edges={['top']}>
      <CreatingAnimation durationMs={4000} onDone={handleDone} />
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
