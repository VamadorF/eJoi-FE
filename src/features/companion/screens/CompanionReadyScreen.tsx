import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/shared/components/Button';
import { RootStackParamList } from '@/shared/types/navigation';
import { Companion } from '../types';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const isSmallScreen = SCREEN_HEIGHT < 700;

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
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <LinearGradient
        colors={[Colors.base.primary, Colors.base.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <Image
          source={require('../../../../public/IMG/eJoi_INTERFAZ-16.png')}
          style={styles.decorativeHand}
          resizeMode="contain"
        />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.avatarContainer}>
              {companion.avatar ? (
                <Image source={{ uri: companion.avatar }} style={[styles.avatar, isSmallScreen && styles.avatarSmall]} />
              ) : (
                <View style={[styles.avatarPlaceholder, isSmallScreen && styles.avatarPlaceholderSmall]}>
                  <Text style={[styles.avatarText, isSmallScreen && styles.avatarTextSmall]}>
                    {companion.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
            </View>

            <Text style={[styles.title, isSmallScreen && styles.titleSmall]}>¡Tu compañera está lista!</Text>
            <Text style={[styles.companionName, isSmallScreen && styles.companionNameSmall]}>{companion.name}</Text>
            <Text style={[styles.subtitle, isSmallScreen && styles.subtitleSmall]}>
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
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  decorativeHand: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.6,
    height: SCREEN_HEIGHT * 0.4,
    right: -SCREEN_WIDTH * 0.15,
    top: SCREEN_HEIGHT * 0.1,
    opacity: 0.15,
    zIndex: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: Spacing['2xl'],
    minHeight: SCREEN_HEIGHT * 0.8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.screen.paddingHorizontal,
    paddingTop: Spacing.xl,
    zIndex: 1,
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
  avatarSmall: {
    width: 120,
    height: 120,
    borderRadius: 60,
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
  avatarPlaceholderSmall: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarText: {
    ...Typography.styles.h1,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.white,
  },
  avatarTextSmall: {
    fontSize: Typography.fontSize['3xl'],
  },
  title: {
    ...Typography.styles.h2,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.white,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  titleSmall: {
    fontSize: Typography.fontSize['2xl'],
  },
  companionName: {
    ...Typography.styles.h3,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.white,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  companionNameSmall: {
    fontSize: Typography.fontSize.xl,
  },
  subtitle: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.white,
    opacity: 0.9,
    marginBottom: Spacing.xl,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
    flexShrink: 1,
  },
  subtitleSmall: {
    fontSize: Typography.fontSize.sm,
  },
  traitsContainer: {
    width: '100%',
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    flexShrink: 1,
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
    marginBottom: Spacing.lg,
  },
  startButton: {
    width: '100%',
  },
});

