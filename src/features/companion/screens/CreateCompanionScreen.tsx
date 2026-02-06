import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInDown,
  ZoomIn,
  Layout,
} from 'react-native-reanimated';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/shared/types/navigation';
import { OnboardingData, Gender } from '@/features/onboarding/types';
import {
  GradientBackground,
  SummaryList,
  PrimaryCTA,
  CardSurface,
  ContentContainer,
  Button,
  CompanionAvatar,
  ChoiceChip,
} from '@/shared/components';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';
import { styles } from './CreateCompanionScreen.styles';
import { useGenderedTextWithGender } from '@/shared/hooks/useGenderedText';

// Imágenes placeholder según género y estilo
const PLACEHOLDER_IMAGES = {
  realista: {
    femenino: require('../../../../public/IMG/arquetipos/La Musa.jpg'),
    masculino: require('../../../../public/IMG/arquetipos/Ejecutivo.png'),
  },
  anime: {
    femenino: require('../../../../public/IMG/anime/Anime_musa.png'),
    masculino: require('../../../../public/IMG/anime/anime_ejecutivo.png'),
  },
};

type CreateCompanionScreenRouteProp = RouteProp<RootStackParamList, 'CreateCompanion'>;
type CreateCompanionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateCompanion'>;

export const CreateCompanionScreen: React.FC = () => {
  const navigation = useNavigation<CreateCompanionScreenNavigationProp>();
  const route = useRoute<CreateCompanionScreenRouteProp>();
  const [isCreating, setIsCreating] = useState(false);

  const onboardingData = route.params?.onboardingData;
  
  // Hook para textos con género dinámico
  const genderedText = useGenderedTextWithGender(
    (onboardingData?.gender || '') as Gender | ''
  );

  // Obtener imagen placeholder basada en género y estilo visual
  const getPlaceholderImage = () => {
    const style = onboardingData?.visualStyle || 'realista';
    const gender = onboardingData?.gender || 'femenino';
    return PLACEHOLDER_IMAGES[style]?.[gender] || PLACEHOLDER_IMAGES.realista.femenino;
  };

  const handleCreateCompanion = async () => {
    if (!onboardingData) {
      return;
    }

    setIsCreating(true);

    try {
      // Navegar a la pantalla Home (vacía por ahora)
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('Error creating companion:', error);
      // TODO: Mostrar error al usuario
    } finally {
      setIsCreating(false);
    }
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
        <ContentContainer>
          <Animated.View 
            style={styles.header}
            entering={FadeInDown.duration(500).springify()}
          >
            <Text style={styles.title}>
              Crea tu {genderedText.companion()}
            </Text>
            <Text style={styles.subtitle}>
              Revisa la configuración y crea tu {genderedText.companion()} virtual
            </Text>
          </Animated.View>

          {/* Card 1: Apariencia */}
          <Animated.View entering={FadeInUp.delay(100).duration(400)}>
            <CardSurface variant="glass" padding="lg" radius={16}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Apariencia</Text>
                <Button
                  title="Editar"
                  onPress={() => handleEdit(1)}
                  variant="outline"
                  style={styles.editButton}
                />
              </View>
              <View style={styles.personalitySection}>
                <View style={styles.personalityRow}>
                  <Text style={styles.personalityLabel}>Estilo visual:</Text>
                </View>
                <View style={styles.personalityRow}>
                  <Text style={styles.personalityValue}>
                    {onboardingData.visualStyle === 'realista' ? 'Realista' : 
                     onboardingData.visualStyle === 'anime' ? 'Anime' : 'No seleccionado'}
                  </Text>
                </View>
                <View style={{ height: Spacing.gapSm }} />
                <View style={styles.personalityRow}>
                  <Text style={styles.personalityLabel}>Género:</Text>
                </View>
                <View style={styles.personalityRow}>
                  <Text style={styles.personalityValue}>
                    {onboardingData.gender === 'femenino' ? 'Femenino' : 
                     onboardingData.gender === 'masculino' ? 'Masculino' : 'No seleccionado'}
                  </Text>
                </View>
              </View>
            </CardSurface>
          </Animated.View>

          <View style={{ height: Spacing.gapLg }} />

          {/* Card 2: Identidad */}
          <Animated.View entering={FadeInUp.delay(200).duration(400)}>
            <CardSurface variant="glass" padding="lg" radius={16}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Identidad</Text>
                <Button
                  title="Editar"
                  onPress={() => handleEdit(9)}
                  variant="outline"
                  style={styles.editButton}
                />
              </View>
              <View style={styles.identityContent}>
                <Animated.View 
                  style={styles.avatarWrapper}
                  entering={ZoomIn.delay(400).duration(500).springify()}
                >
                  <Image
                    source={getPlaceholderImage()}
                    style={styles.avatarImage}
                    resizeMode="cover"
                  />
                </Animated.View>
                <Text style={styles.companionName}>
                  {onboardingData.companionName || 'Sin nombre'}
                </Text>
              </View>
            </CardSurface>
          </Animated.View>

          <View style={{ height: Spacing.gapLg }} />

          {/* Card 3: Personalidad/Tono/Estilo */}
          <Animated.View entering={FadeInUp.delay(300).duration(400)}>
            <CardSurface variant="glass" padding="lg" radius={16}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Personalidad</Text>
                <Button
                  title="Editar"
                  onPress={() => handleEdit(3)}
                  variant="outline"
                  style={styles.editButton}
                />
              </View>
              <View style={styles.personalitySection}>
                <View style={styles.personalityRow}>
                  <Text style={styles.personalityLabel}>Personalidad:</Text>
                </View>
                <View style={styles.personalityRow}>
                  <Text style={styles.personalityValue}>{onboardingData.persona}</Text>
                </View>
                <View style={{ height: Spacing.gapSm }} />
                <View style={styles.personalityRow}>
                  <Text style={styles.personalityLabel}>Tono:</Text>
                </View>
                <View style={styles.personalityRow}>
                  <Text style={styles.personalityValue}>{onboardingData.tone}</Text>
                </View>
                {onboardingData.interactionStyle && (
                  <>
                    <View style={{ height: Spacing.gapSm }} />
                    <View style={styles.personalityRow}>
                      <Text style={styles.personalityLabel}>Estilo:</Text>
                    </View>
                    <View style={styles.personalityRow}>
                      <Text style={styles.personalityValue}>{onboardingData.interactionStyle}</Text>
                    </View>
                  </>
                )}
                {onboardingData.conversationDepth && (
                  <>
                    <View style={{ height: Spacing.gapSm }} />
                    <View style={styles.personalityRow}>
                      <Text style={styles.personalityLabel}>Profundidad:</Text>
                    </View>
                    <View style={styles.personalityRow}>
                      <Text style={styles.personalityValue}>{onboardingData.conversationDepth}</Text>
                    </View>
                  </>
                )}
              </View>
            </CardSurface>
          </Animated.View>

          <View style={{ height: Spacing.gapLg }} />

          {/* Card 4: Intereses + Límites */}
          <Animated.View entering={FadeInUp.delay(400).duration(400)}>
            <CardSurface variant="glass" padding="lg" radius={16}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Intereses</Text>
                <Button
                  title="Editar"
                  onPress={() => handleEdit(7)}
                  variant="outline"
                  style={styles.editButton}
                />
              </View>
              {onboardingData.interests.length > 0 ? (
                <Animated.View 
                  style={styles.chipsContainer}
                  entering={FadeIn.delay(500).duration(300)}
                >
                  {onboardingData.interests.slice(0, 5).map((interest, index) => (
                    <Animated.View
                      key={interest}
                      entering={FadeIn.delay(500 + index * 50).duration(200)}
                    >
                      <ChoiceChip
                        label={interest}
                        selected={true}
                        onPress={() => {}}
                        size="sm"
                      />
                    </Animated.View>
                  ))}
                  {onboardingData.interests.length > 5 && (
                    <ChoiceChip
                      label={`+${onboardingData.interests.length - 5}`}
                      selected={false}
                      onPress={() => {}}
                      size="sm"
                    />
                  )}
                </Animated.View>
              ) : (
                <Text style={styles.emptyText}>Sin intereses seleccionados</Text>
              )}

              <View style={{ height: Spacing.gapLg }} />

              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Límites</Text>
                <Button
                  title="Editar"
                  onPress={() => handleEdit(8)}
                  variant="outline"
                  style={styles.editButton}
                />
              </View>
              {onboardingData.boundaries.length > 0 ? (
                <View style={styles.boundariesList}>
                  {onboardingData.boundaries.map((boundary, index) => (
                    <Animated.Text 
                      key={index} 
                      style={styles.boundaryItem}
                      entering={FadeInDown.delay(600 + index * 50).duration(200)}
                    >
                      • {boundary}
                    </Animated.Text>
                  ))}
                </View>
              ) : (
                <Text style={styles.emptyText}>Sin límites definidos</Text>
              )}
            </CardSurface>
          </Animated.View>
        </ContentContainer>
      </ScrollView>

      <Animated.View entering={SlideInDown.delay(600).duration(400).springify()}>
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

