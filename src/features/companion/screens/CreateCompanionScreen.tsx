import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '@/shared/components/Screen';
import { Button } from '@/shared/components/Button';
import { RootStackParamList } from '@/shared/types/navigation';
import { OnboardingData } from '@/features/onboarding/types';
import { styles } from './CreateCompanionScreen.styles';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

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
      <Screen>
        <LinearGradient
          colors={[Colors.base.primary, Colors.base.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>No se encontraron datos de onboarding</Text>
            <Button
              title="Volver"
              onPress={() => navigation.goBack()}
              variant="outline"
            />
          </View>
        </LinearGradient>
      </Screen>
    );
  }

  return (
    <Screen>
      <LinearGradient
        colors={[Colors.base.primary, Colors.base.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Image
          source={require('../../../../public/IMG/eJoi_INTERFAZ-14.png')}
          style={styles.decorativeHand}
          resizeMode="contain"
        />
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Crea tu compañera</Text>
            <Text style={styles.subtitle}>
              Revisa la configuración y crea tu compañera virtual
            </Text>
          </View>

          <View style={styles.summary}>
            {onboardingData.companionName && (
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Nombre:</Text>
                <Text style={styles.summaryValue}>{onboardingData.companionName}</Text>
              </View>
            )}

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Personalidad:</Text>
              <Text style={styles.summaryValue}>{onboardingData.persona}</Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Tono:</Text>
              <Text style={styles.summaryValue}>{onboardingData.tone}</Text>
            </View>

            {onboardingData.interactionStyle && (
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Estilo de interacción:</Text>
                <Text style={styles.summaryValue}>{onboardingData.interactionStyle}</Text>
              </View>
            )}

            {onboardingData.conversationDepth && (
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Profundidad:</Text>
                <Text style={styles.summaryValue}>{onboardingData.conversationDepth}</Text>
              </View>
            )}

            {onboardingData.interests.length > 0 && (
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Intereses:</Text>
                <Text style={styles.summaryValue}>
                  {onboardingData.interests.join(', ')}
                </Text>
              </View>
            )}

            {onboardingData.boundaries.length > 0 && (
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Límites:</Text>
                <Text style={styles.summaryValue}>
                  {onboardingData.boundaries.join(', ')}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.footer}>
            <Button
              title={isCreating ? "Creando..." : "Crear Compañera"}
              onPress={handleCreateCompanion}
              variant="primary"
              loading={isCreating}
              disabled={isCreating}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </Screen>
  );
};

