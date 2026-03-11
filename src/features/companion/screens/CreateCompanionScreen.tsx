import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/shared/types/navigation';
import { OnboardingData, Gender } from '@/features/onboarding/types';
import { GradientBackground, PrimaryCTA, Button, CompanionCard } from '@/shared/components';
import { styles } from './CreateCompanionScreen.styles';
import { useGenderedTextWithGender } from '@/shared/hooks/useGenderedText';
import {
  generateAboutMePreview,
} from '@/shared/utils/companionTextGenerator';

// Imágenes placeholder según género y estilo
const PLACEHOLDER_IMAGES = {
  realista: {
    femenino: require('../../../../public/IMG/arquetipos/La Musa.jpg'),
    masculino: require('../../../../public/IMG/arquetipos/Ejecutivo.png'),
    neutro: require('../../../../public/IMG/arquetipos/Intelectual.png'),
  },
  anime: {
    femenino: require('../../../../public/IMG/anime/Anime_musa.png'),
    masculino: require('../../../../public/IMG/anime/anime_ejecutivo.png'),
    neutro: require('../../../../public/IMG/anime/Anime_intelectual.png'),
  },
};

type CreateCompanionScreenRouteProp = RouteProp<RootStackParamList, 'CreateCompanion'>;
type CreateCompanionScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CreateCompanion'
>;

export const CreateCompanionScreen: React.FC = () => {
  const navigation = useNavigation<CreateCompanionScreenNavigationProp>();
  const route = useRoute<CreateCompanionScreenRouteProp>();
  const [isCreating, setIsCreating] = useState(false);

  const onboardingData = route.params?.onboardingData;

  const genderedText = useGenderedTextWithGender(
    (onboardingData?.gender || '') as Gender | ''
  );

  const getPlaceholderImage = () => {
    const style = onboardingData?.visualStyle || 'realista';
    const gender = onboardingData?.gender || 'femenino';
    return PLACEHOLDER_IMAGES[style]?.[gender] || PLACEHOLDER_IMAGES.realista.femenino;
  };

  const getAboutText = () => {
    const persona = onboardingData?.persona || '';
    const tone = onboardingData?.tone || '';
    const gender = (onboardingData?.gender || 'femenino') as Gender;
    const interests = onboardingData?.interests || [];
    const interactionStyle = onboardingData?.interactionStyle;
    return generateAboutMePreview(persona, tone, gender, interests, interactionStyle);
  };

  const handleCreateCompanion = async () => {
    if (!onboardingData) return;
    setIsCreating(true);
    navigation.navigate('CreandoCompanion', { onboardingData });
  };

  const handleEdit = (step: number) => {
    navigation.navigate('Onboarding', { initialStep: step });
  };

  if (!onboardingData) {
    return (
      <GradientBackground variant="wizard">
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No se encontraron datos de onboarding</Text>
          <Button
            title="Volver"
            onPress={() => navigation.goBack()}
            variant="outline"
          />
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground
      variant="wizard"
      overlayImage={require('../../../../public/IMG/eJoi_INTERFAZ-14.png')}
      overlayOpacity={0.05}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <CompanionCard
          mode="preview"
          name={onboardingData.companionName || 'Sin nombre'}
          image={getPlaceholderImage()}
          persona={onboardingData.persona}
          tone={onboardingData.tone}
          aboutText={getAboutText()}
          interests={onboardingData.interests}
          boundaries={onboardingData.boundaries}
          visualStyle={onboardingData.visualStyle}
          gender={onboardingData.gender}
          interactionStyle={onboardingData.interactionStyle}
          conversationDepth={onboardingData.conversationDepth}
          ethnicity={onboardingData.ethnicity}
          onEditImage={() => handleEdit(2)}
          onEditName={() => handleEdit(10)}
          onEditPersona={() => handleEdit(4)}
          onEditInterests={() => handleEdit(8)}
          onEditBoundaries={() => handleEdit(9)}
        />
      </ScrollView>

      <Animated.View entering={SlideInDown.delay(800).duration(400).springify()}>
        <PrimaryCTA
          label={isCreating ? 'Creando...' : `Crear ${genderedText.companion()}`}
          onPress={handleCreateCompanion}
          loading={isCreating}
          disabled={isCreating}
        />
      </Animated.View>
    </GradientBackground>
  );
};
