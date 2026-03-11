import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeIn,
  FadeInUp,
  SlideInDown,
  ZoomIn,
} from 'react-native-reanimated';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/shared/types/navigation';
import { OnboardingData, Gender } from '@/features/onboarding/types';
import {
  GradientBackground,
  PrimaryCTA,
  Button,
} from '@/shared/components';
import { styles } from './CreateCompanionScreen.styles';
import { useGenderedTextWithGender } from '@/shared/hooks/useGenderedText';
import { generateAboutMePreview } from '@/shared/utils/companionTextGenerator';
import { getOrCreateImagePromise } from '../services/companionImageCache';

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

// Mapeo de tonos a emojis
const TONE_EMOJIS: Record<string, string> = {
  'Cálido': '🌸',
  'Profesional': '💼',
  'Juguetón': '✨',
  'Romántico': '💕',
  'Serio': '📚',
  'Amigable': '😊',
  'Misterioso': '🌙',
  'Energético': '⚡',
};

type CreateCompanionScreenRouteProp = RouteProp<RootStackParamList, 'CreateCompanion'>;
type CreateCompanionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateCompanion'>;

export const CreateCompanionScreen: React.FC = () => {
  const navigation = useNavigation<CreateCompanionScreenNavigationProp>();
  const route = useRoute<CreateCompanionScreenRouteProp>();
  const [isCreating, setIsCreating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const onboardingData = route.params?.onboardingData;

  // Iniciar generación de imagen al montar
  useEffect(() => {
    if (!onboardingData) return;
    setIsImageLoading(true);
    setGeneratedImageUrl(null);
    getOrCreateImagePromise(onboardingData)
      .then((url) => {
        setGeneratedImageUrl(url);
      })
      .finally(() => {
        setIsImageLoading(false);
      });
  }, [onboardingData]);

  // Hook para textos con género dinámico
  const genderedText = useGenderedTextWithGender(
    (onboardingData?.gender || '') as Gender | ''
  );

  // Obtener fuente de imagen: generada por IA o placeholder estático
  const getImageSource = (): { uri: string } | number => {
    if (generatedImageUrl?.trim()) {
      return { uri: generatedImageUrl };
    }
    const style = onboardingData?.visualStyle || 'realista';
    const gender = onboardingData?.gender || 'femenino';
    return PLACEHOLDER_IMAGES[style]?.[gender] || PLACEHOLDER_IMAGES.realista.femenino;
  };

  // Generar descripción "Sobre mí" basada en personalidad usando el generador dinámico
  const getAboutText = () => {
    const persona = onboardingData?.persona || '';
    const tone = onboardingData?.tone || '';
    const gender = (onboardingData?.gender || 'femenino') as Gender;
    const interests = onboardingData?.interests || [];
    const interactionStyle = onboardingData?.interactionStyle;

    // Usar el generador dinámico de textos
    return generateAboutMePreview(persona, tone, gender, interests, interactionStyle);
  };

  const handleCreateCompanion = async () => {
    if (!onboardingData) {
      return;
    }

    setIsCreating(true);
    navigation.navigate('CreandoCompanion', {
      onboardingData,
      preGeneratedAvatarUrl: generatedImageUrl,
    });
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

  const handleEdit = (step: number) => {
    navigation.navigate('Onboarding', { initialStep: step });
  };

  const toneEmoji = TONE_EMOJIS[onboardingData.tone] || '💫';

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
        {/* TINDER CARD */}
        <Animated.View
          style={styles.tinderCard}
          entering={FadeInUp.duration(600).springify()}
        >
          {/* IMAGEN DEL COMPANION */}
          <Animated.View
            style={styles.imageContainer}
            entering={FadeIn.delay(200).duration(400)}
          >
            <Image
              source={getImageSource()}
              style={styles.companionImage}
              resizeMode="cover"
            />
            {/* Overlay de carga mientras se genera la imagen */}
            {isImageLoading && (
              <Animated.View style={styles.imageLoadingOverlay}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.imageLoadingText}>
                  Generando imagen de tu {genderedText.companion().toLowerCase()}...
                </Text>
              </Animated.View>
            )}
            {/* Gradiente sobre la imagen */}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.3)']}
              style={styles.imageGradient}
            />
            {/* Botón editar imagen */}
            <TouchableOpacity
              style={styles.editImageButton}
              onPress={() => handleEdit(2)}
            >
              <Text style={styles.editImageButtonText}>✏️ Editar</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* HEADER: NOMBRE + VERIFICADO */}
          <Animated.View
            style={styles.headerSection}
            entering={FadeInUp.delay(300).duration(400)}
          >
            <View style={styles.nameRow}>
              <Text style={styles.companionName}>
                {onboardingData.companionName || 'Sin nombre'}
              </Text>
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedIcon}>✓</Text>
              </View>
              <TouchableOpacity onPress={() => handleEdit(10)}>
                <Text style={styles.editLink}>Editar</Text>
              </TouchableOpacity>
            </View>

            {/* BADGE DE PERSONALIDAD */}
            <TouchableOpacity
              style={styles.personalityBadge}
              onPress={() => handleEdit(4)}
            >
              <Text style={styles.personalityBadgeIcon}>{toneEmoji}</Text>
              <Text style={styles.personalityBadgeText}>
                {onboardingData.persona || 'Personalidad'}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* SOBRE MÍ */}
          <Animated.View
            style={styles.aboutSection}
            entering={FadeInUp.delay(400).duration(400)}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Sobre mí</Text>
              <TouchableOpacity onPress={() => handleEdit(4)}>
                <Text style={styles.editLink}>Editar</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.aboutText}>
              {getAboutText()}
            </Text>
          </Animated.View>

          {/* INTERESES */}
          <Animated.View
            style={styles.interestsSection}
            entering={FadeInUp.delay(500).duration(400)}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Intereses</Text>
              <TouchableOpacity onPress={() => handleEdit(8)}>
                <Text style={styles.editLink}>Editar</Text>
              </TouchableOpacity>
            </View>
            {onboardingData.interests.length > 0 ? (
              <View style={styles.interestChipsContainer}>
                {onboardingData.interests.map((interest, index) => (
                  <Animated.View
                    key={interest}
                    entering={FadeIn.delay(550 + index * 50).duration(200)}
                  >
                    <View style={[styles.interestChip, styles.interestChipSelected]}>
                      <Text style={[styles.interestChipText, styles.interestChipTextSelected]}>
                        {interest}
                      </Text>
                    </View>
                  </Animated.View>
                ))}
              </View>
            ) : (
              <Text style={styles.emptyText}>Sin intereses seleccionados</Text>
            )}
          </Animated.View>

          {/* MÁS SOBRE MÍ (Detalles adicionales) */}
          <Animated.View
            style={styles.moreSection}
            entering={FadeInUp.delay(600).duration(400)}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Más sobre mí</Text>
            </View>
            <View style={styles.moreChipsContainer}>
              {/* Estilo visual */}
              <View style={styles.moreChip}>
                <Text style={styles.moreChipIcon}>
                  {onboardingData.visualStyle === 'anime' ? '🎨' : '📷'}
                </Text>
                <Text style={styles.moreChipText}>
                  {onboardingData.visualStyle === 'realista' ? 'Realista' : 'Anime'}
                </Text>
              </View>
              {/* Género */}
              <View style={styles.moreChip}>
                <Text style={styles.moreChipIcon}>
                  {onboardingData.gender === 'femenino' ? '♀️' : onboardingData.gender === 'neutro' ? '⚧️' : '♂️'}
                </Text>
                <Text style={styles.moreChipText}>
                  {onboardingData.gender === 'femenino' ? 'Femenino' : onboardingData.gender === 'neutro' ? 'Neutro' : 'Masculino'}
                </Text>
              </View>
              {/* Tono */}
              <View style={styles.moreChip}>
                <Text style={styles.moreChipIcon}>{toneEmoji}</Text>
                <Text style={styles.moreChipText}>{onboardingData.tone}</Text>
              </View>
              {/* Estilo de interacción */}
              {onboardingData.interactionStyle && (
                <View style={styles.moreChip}>
                  <Text style={styles.moreChipIcon}>💬</Text>
                  <Text style={styles.moreChipText}>{onboardingData.interactionStyle}</Text>
                </View>
              )}
              {/* Profundidad de conversación */}
              {onboardingData.conversationDepth && (
                <View style={styles.moreChip}>
                  <Text style={styles.moreChipIcon}>🧠</Text>
                  <Text style={styles.moreChipText}>{onboardingData.conversationDepth}</Text>
                </View>
              )}
              {/* Etnia (si fue seleccionada) */}
              {onboardingData.ethnicity && (
                <View style={styles.moreChip}>
                  <Text style={styles.moreChipIcon}>🌍</Text>
                  <Text style={styles.moreChipText}>{onboardingData.ethnicity}</Text>
                </View>
              )}
            </View>
          </Animated.View>

          {/* LÍMITES */}
          {onboardingData.boundaries.length > 0 && (
            <Animated.View
              style={styles.boundariesSection}
              entering={FadeInUp.delay(700).duration(400)}
            >
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Límites</Text>
                <TouchableOpacity onPress={() => handleEdit(9)}>
                  <Text style={styles.editLink}>Editar</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.interestChipsContainer}>
                {onboardingData.boundaries.map((boundary, index) => (
                  <Animated.View
                    key={index}
                    entering={FadeIn.delay(750 + index * 50).duration(200)}
                  >
                    <View style={styles.boundaryTag}>
                      <Text style={styles.boundaryTagText}>{boundary}</Text>
                    </View>
                  </Animated.View>
                ))}
              </View>
            </Animated.View>
          )}
        </Animated.View>
      </ScrollView>

      <Animated.View entering={SlideInDown.delay(800).duration(400).springify()}>
        <PrimaryCTA
          label={isCreating ? 'Creando...' : `Crear ${genderedText.companion()}`}
          onPress={handleCreateCompanion}
          loading={isCreating}
          disabled={isCreating || isImageLoading}
        />
      </Animated.View>
    </GradientBackground>
  );
};
