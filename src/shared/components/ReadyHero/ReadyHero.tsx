import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompanionAvatar } from '../CompanionAvatar';
import { PrimaryCTA } from '../PrimaryCTA';
import { ContentContainer } from '../ContentContainer';
import { ChoiceChip, CardSurface } from '../index';
import { ReadyHeroProps } from './ReadyHero.types';
import { styles } from './ReadyHero.styles';
import { Spacing } from '@/shared/theme/spacing';
import { Typography } from '@/shared/theme/typography';
import { Colors } from '@/shared/theme/colors';

const DEFAULT_BACKGROUND = require('../../../../public/IMG/eJoi_INTERFAZ-16.png');

export const ReadyHero: React.FC<ReadyHeroProps> = ({
  avatar,
  title,
  subtitle,
  backgroundImage = DEFAULT_BACKGROUND,
  ctaLabel,
  onCTA,
  interests = [],
  boundaries = [],
}) => {
  const visibleInterests = interests.slice(0, 5);
  const remainingCount = interests.length - 5;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Image
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="contain"
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ContentContainer>
          <View style={styles.content}>
            <View style={styles.avatarContainer}>
              <CompanionAvatar
                name={avatar.name}
                uri={avatar.uri}
                size={150}
                glow={true}
              />
            </View>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>

            {interests.length > 0 && (
              <>
                <View style={{ height: Spacing.gapLg }} />
                <CardSurface variant="glass" padding="md" radius={16} textColor={Colors.text.primary}>
                  <Text style={styles.sectionTitle}>Intereses</Text>
                  <View style={styles.chipsContainer}>
                    {visibleInterests.map((interest) => (
                      <ChoiceChip
                        key={interest}
                        label={interest}
                        selected={true}
                        onPress={() => {}}
                        size="sm"
                      />
                    ))}
                    {remainingCount > 0 && (
                      <ChoiceChip
                        label={`+${remainingCount}`}
                        selected={false}
                        onPress={() => {}}
                        size="sm"
                      />
                    )}
                  </View>
                </CardSurface>
              </>
            )}

            {boundaries.length > 0 && (
              <>
                <View style={{ height: Spacing.gapLg }} />
                <CardSurface variant="glass" padding="md" radius={16} textColor={Colors.text.primary}>
                  <Text style={styles.sectionTitle}>Límites</Text>
                  <View style={styles.boundariesList}>
                    {boundaries.map((boundary, index) => (
                      <Text key={index} style={styles.boundaryItem}>
                        • {boundary}
                      </Text>
                    ))}
                  </View>
                </CardSurface>
              </>
            )}

            {boundaries.length === 0 && (
              <>
                <View style={{ height: Spacing.gapLg }} />
                <CardSurface variant="glass" padding="md" radius={16} textColor={Colors.text.primary}>
                  <Text style={styles.emptyText}>Sin límites definidos</Text>
                </CardSurface>
              </>
            )}
          </View>
        </ContentContainer>
      </ScrollView>

      <View style={styles.ctaContainer}>
        <PrimaryCTA label={ctaLabel} onPress={onCTA} />
      </View>
    </SafeAreaView>
  );
};

