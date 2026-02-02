import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@/shared/components/Button';
import { RootStackParamList } from '@/shared/types/navigation';
import { Companion } from '../types';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

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
    <LinearGradient
      colors={[Colors.base.primary, Colors.base.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          {companion.avatar ? (
            <Image source={{ uri: companion.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {companion.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.title}>¡Tu compañera está lista!</Text>
        <Text style={styles.companionName}>{companion.name}</Text>
        <Text style={styles.subtitle}>
          {companion.personality} • {companion.tone}
        </Text>

        {companion.interests.length > 0 && (
          <View style={styles.traitsContainer}>
            <Text style={styles.traitsLabel}>Intereses:</Text>
            <Text style={styles.trait}>
              {companion.interests.join(', ')}
            </Text>
          </View>
        )}

        {companion.traits.length > 0 && (
          <View style={styles.traitsContainer}>
            <Text style={styles.traitsLabel}>Límites establecidos:</Text>
            {companion.traits.map((trait, index) => (
              <Text key={index} style={styles.trait}>
                • {trait}
              </Text>
            ))}
          </View>
        )}

        <View style={styles.footer}>
          <Button
            title="Iniciar conversación"
            onPress={handleStartChat}
            variant="primary"
            style={styles.startButton}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.screen.paddingHorizontal,
    paddingVertical: Spacing['2xl'],
  },
  avatarContainer: {
    marginBottom: Spacing.xl,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: Colors.text.white,
  },
  avatarPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.auxiliary.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: Colors.text.white,
  },
  avatarText: {
    ...Typography.styles.h1,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.white,
  },
  title: {
    ...Typography.styles.h2,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.white,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  companionName: {
    ...Typography.styles.h3,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.white,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.white,
    opacity: 0.9,
    marginBottom: Spacing.xl,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
  },
  traitsContainer: {
    width: '100%',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  traitsLabel: {
    ...Typography.styles.bodySmall,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.white,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  trait: {
    ...Typography.styles.bodySmall,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.white,
    opacity: 0.8,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    paddingHorizontal: Spacing.screen.paddingHorizontal,
    marginTop: Spacing.xl,
  },
  startButton: {
    width: '100%',
  },
});

