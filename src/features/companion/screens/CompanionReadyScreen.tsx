import React from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/shared/types/navigation';
import { Companion } from '../types';
import { GradientBackground, ReadyHero } from '@/shared/components';

type CompanionReadyScreenRouteProp = RouteProp<RootStackParamList, 'CompanionReady'>;
type CompanionReadyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CompanionReady'>;

export const CompanionReadyScreen: React.FC = () => {
  const navigation = useNavigation<CompanionReadyScreenNavigationProp>();
  const route = useRoute<CompanionReadyScreenRouteProp>();
  const companion = route.params?.companion;

  const handleStartChat = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Chat' }],
    });
  };

  if (!companion) {
    return null;
  }

  return (
    <GradientBackground
      variant="ready"
      overlayImage={require('../../../../public/IMG/eJoi_INTERFAZ-16.png')}
      overlayOpacity={0.12}
    >
      <ReadyHero
        avatar={{ name: companion.name, uri: companion.avatar }}
        title={`¡${companion.name} está list@!`}
        subtitle={companion.personality}
        ctaLabel="Iniciar conversación"
        onCTA={handleStartChat}
        interests={companion.interests}
        boundaries={companion.traits}
      />
    </GradientBackground>
  );
};

