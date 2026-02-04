import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/shared/types/navigation';
import { OnboardingData } from '@/features/onboarding/types';
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

type CreateCompanionScreenRouteProp = RouteProp<RootStackParamList, 'CreateCompanion'>;
type CreateCompanionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateCompanion'>;

export const CreateCompanionScreen: React.FC = () => {
  const navigation = useNavigation<CreateCompanionScreenNavigationProp>();
  const route = useRoute<CreateCompanionScreenRouteProp>();
  const [isCreating, setIsCreating] = useState(false);

  const onboardingData = route.params?.onboardingData;

  const handleCreateCompanion = async () => {
    if (!onboardingData) {
      return;
    }

    setIsCreating(true);

    try {
      // Navegar a la pantalla de creación con animación
      navigation.navigate('CreandoCompanion', { onboardingData });
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
      overlayOpacity={0.12}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <ContentContainer>
          <View style={styles.header}>
            <Text style={styles.title}>Crea tu compañera</Text>
            <Text style={styles.subtitle}>
              Revisa la configuración y crea tu compañera virtual
            </Text>
          </View>

          {/* Card 1: Identidad */}
          <CardSurface variant="glass" padding="lg" radius={16}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Identidad</Text>
              <Button
                title="Editar"
                onPress={() => handleEdit(7)}
                variant="outline"
                style={styles.editButton}
              />
            </View>
            <View style={styles.identityContent}>
              {onboardingData.avatar && (
                <CompanionAvatar
                  name={onboardingData.companionName || 'Compañera'}
                  uri={onboardingData.avatar}
                  size={80}
                />
              )}
              <Text style={styles.companionName}>
                {onboardingData.companionName || 'Sin nombre'}
              </Text>
            </View>
          </CardSurface>

          <View style={{ height: Spacing.gapLg }} />

          {/* Card 2: Personalidad/Tono/Estilo */}
          <CardSurface variant="glass" padding="lg" radius={16}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Personalidad</Text>
              <Button
                title="Editar"
                onPress={() => handleEdit(1)}
                variant="outline"
                style={styles.editButton}
              />
            </View>
            <View style={styles.personalityRow}>
              <Text style={styles.personalityLabel}>Personalidad:</Text>
              <Text style={styles.personalityValue}>{onboardingData.persona}</Text>
            </View>
            <View style={styles.personalityRow}>
              <Text style={styles.personalityLabel}>Tono:</Text>
              <Text style={styles.personalityValue}>{onboardingData.tone}</Text>
            </View>
            {onboardingData.interactionStyle && (
              <View style={styles.personalityRow}>
                <Text style={styles.personalityLabel}>Estilo:</Text>
                <Text style={styles.personalityValue}>{onboardingData.interactionStyle}</Text>
              </View>
            )}
            {onboardingData.conversationDepth && (
              <View style={styles.personalityRow}>
                <Text style={styles.personalityLabel}>Profundidad:</Text>
                <Text style={styles.personalityValue}>{onboardingData.conversationDepth}</Text>
              </View>
            )}
          </CardSurface>

          <View style={{ height: Spacing.gapLg }} />

          {/* Card 3: Intereses + Límites */}
          <CardSurface variant="glass" padding="lg" radius={16}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Intereses</Text>
              <Button
                title="Editar"
                onPress={() => handleEdit(5)}
                variant="outline"
                style={styles.editButton}
              />
            </View>
            {onboardingData.interests.length > 0 ? (
              <View style={styles.chipsContainer}>
                {onboardingData.interests.map((interest) => (
                  <ChoiceChip
                    key={interest}
                    label={interest}
                    selected={true}
                    onPress={() => {}}
                    size="sm"
                  />
                ))}
              </View>
            ) : (
              <Text style={styles.emptyText}>Sin intereses seleccionados</Text>
            )}

            <View style={{ height: Spacing.gapLg }} />

            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Límites</Text>
              <Button
                title="Editar"
                onPress={() => handleEdit(6)}
                variant="outline"
                style={styles.editButton}
              />
            </View>
            {onboardingData.boundaries.length > 0 ? (
              <View style={styles.boundariesList}>
                {onboardingData.boundaries.map((boundary, index) => (
                  <Text key={index} style={styles.boundaryItem}>
                    • {boundary}
                  </Text>
                ))}
              </View>
            ) : (
              <Text style={styles.emptyText}>Sin límites definidos</Text>
            )}
          </CardSurface>
        </ContentContainer>
      </ScrollView>

      <PrimaryCTA
        label={isCreating ? 'Creando...' : 'Crear Compañera'}
        onPress={handleCreateCompanion}
        loading={isCreating}
        disabled={isCreating}
      />
    </GradientBackground>
  );
};

