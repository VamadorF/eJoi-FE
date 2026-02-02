import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen } from '@/shared/components/Screen';
import { Button } from '@/shared/components/Button';
import { RootStackParamList } from '@/shared/types/navigation';
import { OnboardingData } from '@/features/onboarding/types';
import { useCompanionStore } from '../store/companion.store';
import { Companion } from '../types';
import { styles } from './CreateCompanionScreen.styles';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';

type CreateCompanionScreenRouteProp = RouteProp<RootStackParamList, 'CreateCompanion'>;
type CreateCompanionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateCompanion'>;

export const CreateCompanionScreen: React.FC = () => {
  const navigation = useNavigation<CreateCompanionScreenNavigationProp>();
  const route = useRoute<CreateCompanionScreenRouteProp>();
  const { setCompanion } = useCompanionStore();
  const [isCreating, setIsCreating] = useState(false);

  const onboardingData = route.params?.onboardingData;

  const handleCreateCompanion = async () => {
    if (!onboardingData) {
      return;
    }

    setIsCreating(true);

    try {
      // TODO: Llamar a API para crear la compañera
      // const response = await createCompanionAPI(onboardingData);
      
      // Por ahora, crear compañera mock
      const newCompanion: Companion = {
        id: `companion-${Date.now()}`,
        name: 'Tu Compañera', // TODO: Permitir al usuario elegir nombre
        personality: onboardingData.persona,
        traits: onboardingData.boundaries,
        avatar: onboardingData.avatar,
      };

      // Guardar en el store
      setCompanion(newCompanion);

      // TODO: Guardar en el backend
      // await saveCompanionToAPI(newCompanion);

      // Navegar a Chat
      navigation.reset({
        index: 0,
        routes: [{ name: 'Chat' }],
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
      <Screen>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No se encontraron datos de onboarding</Text>
          <Button
            title="Volver"
            onPress={() => navigation.goBack()}
            variant="outline"
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
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
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Personalidad:</Text>
            <Text style={styles.summaryValue}>{onboardingData.persona}</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Tono:</Text>
            <Text style={styles.summaryValue}>{onboardingData.tone}</Text>
          </View>

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
    </Screen>
  );
};

