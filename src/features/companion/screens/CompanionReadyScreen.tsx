import React from 'react';
import Animated, { FadeIn, FadeInUp, ZoomIn } from 'react-native-reanimated';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/shared/types/navigation';
import { Companion } from '../types';
import { GradientBackground, ReadyHero } from '@/shared/components';
import { createGenderedTextHelper, GenderKey } from '@/shared/utils/genderedText';

type CompanionReadyScreenRouteProp = RouteProp<RootStackParamList, 'CompanionReady'>;
type CompanionReadyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CompanionReady'>;

export const CompanionReadyScreen: React.FC = () => {
  const navigation = useNavigation<CompanionReadyScreenNavigationProp>();
  const route = useRoute<CompanionReadyScreenRouteProp>();
  const companion = route.params?.companion;

  // Crear helper de género basado en el companion
  const genderedText = createGenderedTextHelper(
    (companion?.gender || '') as GenderKey
  );

  const handleStartChat = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Chat' }],
    });
  };

  if (!companion) {
    return null;
  }

  // Generar título con género correcto
  const readyTitle = genderedText.gender === 'femenino'
    ? `¡${companion.name} está lista!`
    : genderedText.gender === 'masculino'
    ? `¡${companion.name} está listo!`
    : `¡${companion.name} está list@!`;

  return (
    <GradientBackground
      variant="ready"
      overlayImage={require('../../../../public/IMG/eJoi_INTERFAZ-16.png')}
      overlayOpacity={0.12}
    >
      <ReadyHero
        avatar={{ name: companion.name, uri: companion.avatar }}
        title={readyTitle}
        subtitle={companion.personality}
        ctaLabel="Iniciar conversación"
        onCTA={handleStartChat}
        interests={companion.interests}
        boundaries={companion.traits}
      />
    </GradientBackground>
  );
};

