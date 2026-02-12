import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '@/shared/types/navigation';
import { useCompanionStore } from '../store/companion.store';
import { Companion } from '../types';
import { Gender } from '@/features/onboarding/types';
import { CreatingAnimation } from '@/shared/components';

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
  const onboardingData = route.params?.onboardingData;

    // TODO: Llamar a API para crear el/la compañer@
    // const response = await createCompanionAPI(onboardingData);

  const handleDone = async () => {
    if (!onboardingData) return;

    const newCompanion: Companion = {
      id: `companion-${Date.now()}`,
      name: onboardingData.companionName || 'Tu Compañer@',
      visualStyle: onboardingData.visualStyle || 'realista',
      gender: (onboardingData.gender as Gender) || 'femenino',
      personality: onboardingData.persona,
      tone: onboardingData.tone,
      interactionStyle: onboardingData.interactionStyle,
      conversationDepth: onboardingData.conversationDepth,
      interests: onboardingData.interests,
      traits: onboardingData.boundaries,
      avatar: onboardingData.avatar,
    };

    // Guardar en el store 
    await setCompanion(newCompanion);

  // TODO: Guardar en el backend
  // await saveCompanionToAPI(newCompanion);



    // Ir directo al paywall (sin pasar por CompanionReady)
    navigation.reset({
      index: 0,
      routes: [{ name: 'SubscriptionPaywall', params: { companion: newCompanion } }],
    });
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
