import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen } from '@/shared/components/Screen';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { RootStackParamList } from '@/shared/types/navigation';
import { OnboardingData } from '../types';
import { styles } from './OnboardingScreen.styles';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

type OnboardingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    persona: '',
    tone: '',
    boundaries: [],
    avatar: undefined,
  });

  const handleNext = () => {
    // Validar que los campos requeridos estén llenos
    if (!onboardingData.persona || !onboardingData.tone) {
      // TODO: Mostrar error
      return;
    }

    // Navegar a la pantalla de crear compañera con los datos del onboarding
    navigation.navigate('CreateCompanion', { onboardingData });
  };

  return (
    <Screen>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Configura tu compañera</Text>
          <Text style={styles.subtitle}>
            Personaliza la personalidad y características de tu compañera virtual
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Personalidad</Text>
            <Input
              placeholder="Ej: Amigable, divertida, empática..."
              value={onboardingData.persona}
              onChangeText={(text) => setOnboardingData({ ...onboardingData, persona: text })}
              containerStyle={{ marginBottom: 0 }}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tono de conversación</Text>
            <Input
              placeholder="Ej: Casual, formal, cariñoso..."
              value={onboardingData.tone}
              onChangeText={(text) => setOnboardingData({ ...onboardingData, tone: text })}
              containerStyle={{ marginBottom: 0 }}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Límites (opcional)</Text>
            <Input
              placeholder="Ej: No temas sexuales, mantener respeto..."
              value={onboardingData.boundaries.join(', ')}
              onChangeText={(text) => {
                const boundaries = text.split(',').map(b => b.trim()).filter(b => b.length > 0);
                setOnboardingData({ ...onboardingData, boundaries });
              }}
              multiline
              numberOfLines={4}
              containerStyle={{ marginBottom: 0 }}
              style={{ minHeight: 100, paddingTop: Spacing.md }}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Continuar"
            onPress={handleNext}
            variant="primary"
            disabled={!onboardingData.persona || !onboardingData.tone}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

