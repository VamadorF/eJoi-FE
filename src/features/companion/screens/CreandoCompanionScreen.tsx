import React, { useRef, useEffect } from 'react';
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
import { getOrCreateImagePromise } from '../services/companionImageCache';

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
  const preGeneratedAvatarUrl = route.params?.preGeneratedAvatarUrl;

  const imagePromiseRef = useRef<Promise<string | null> | null>(null);

  // Si no hay avatar pre-generado válido, usar cache (reutiliza promesa de CreateCompanionScreen)
  // Importante: cuando el usuario pulsa "Crear" antes de que la imagen termine, preGeneratedAvatarUrl
  // viene como null; debemos tener imagePromiseRef para poder esperarla en handleDone
  useEffect(() => {
    if (!onboardingData) return;
    if (preGeneratedAvatarUrl?.trim()) return; // Ya tenemos URL válida
    imagePromiseRef.current = getOrCreateImagePromise(onboardingData);
  }, [onboardingData, preGeneratedAvatarUrl]);

  const handleDone = async () => {
    if (!onboardingData) return;

    let avatarUrl: string | null = preGeneratedAvatarUrl?.trim() ? preGeneratedAvatarUrl : null;
    if (!avatarUrl && imagePromiseRef.current) {
      try {
        avatarUrl = await imagePromiseRef.current;
      } catch {
        avatarUrl = null;
      }
    }

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
      // TODO: Descomentar cuando el backend soporte extra.ethnicity
      // extra: onboardingData.ethnicity ? { ethnicity: onboardingData.ethnicity } : undefined,
      ...(avatarUrl && { avatarUrl }),
    };

    try {
      const apiCompanion = await createCompanionMutation.mutateAsync(payload);
      // Merge payload con respuesta: si el backend solo devuelve id/name, usamos lo que enviamos
      const companion = {
        ...apiCompanion,
        name: apiCompanion.name || payload.name,
        visualStyle: apiCompanion.visualStyle || payload.visualStyle,
        gender: apiCompanion.gender || payload.gender,
        persona: apiCompanion.persona ?? payload.persona ?? '',
        tone: apiCompanion.tone ?? payload.tone ?? '',
        interactionStyle: apiCompanion.interactionStyle ?? payload.interactionStyle ?? '',
        conversationDepth: apiCompanion.conversationDepth ?? payload.conversationDepth ?? '',
        interests: apiCompanion.interests?.length ? apiCompanion.interests : payload.interests ?? [],
        boundaries: apiCompanion.boundaries?.length ? apiCompanion.boundaries : payload.boundaries ?? [],
        avatarUrl: apiCompanion.avatarUrl ?? avatarUrl ?? undefined,
        createdAt: apiCompanion.createdAt ?? new Date().toISOString(),
      };
      await setCompanion(companion);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
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
