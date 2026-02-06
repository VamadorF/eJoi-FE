import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  ZoomIn,
  SlideInDown,
} from 'react-native-reanimated';
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
      <Animated.Image
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="contain"
        entering={FadeIn.duration(600)}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ContentContainer>
          <View style={styles.content}>
            <Animated.View 
              style={styles.avatarContainer}
              entering={ZoomIn.delay(200).duration(600).springify()}
            >
              <CompanionAvatar
                name={avatar.name}
                uri={avatar.uri}
                size={150}
                glow={true}
              />
            </Animated.View>

            <Animated.Text 
              style={styles.title}
              entering={FadeInUp.delay(400).duration(500)}
            >
              {title}
            </Animated.Text>
            <Animated.Text 
              style={styles.subtitle}
              entering={FadeInUp.delay(500).duration(500)}
            >
              {subtitle}
            </Animated.Text>

            {interests.length > 0 && (
              <>
                <View style={{ height: Spacing.gapLg }} />
                <Animated.View entering={FadeInUp.delay(600).duration(400)}>
                  <CardSurface variant="glass" padding="md" radius={16} textColor={Colors.text.primary}>
                    <Text style={styles.sectionTitle}>Intereses</Text>
                    <View style={styles.chipsContainer}>
                      {visibleInterests.map((interest, index) => (
                        <Animated.View
                          key={interest}
                          entering={FadeIn.delay(700 + index * 50).duration(200)}
                        >
                          <ChoiceChip
                            label={interest}
                            selected={true}
                            onPress={() => {}}
                            size="sm"
                          />
                        </Animated.View>
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
                </Animated.View>
              </>
            )}

            {boundaries.length > 0 && (
              <>
                <View style={{ height: Spacing.gapLg }} />
                <Animated.View entering={FadeInUp.delay(800).duration(400)}>
                  <CardSurface variant="glass" padding="md" radius={16} textColor={Colors.text.primary}>
                    <Text style={styles.sectionTitle}>Límites</Text>
                    <View style={styles.boundariesList}>
                      {boundaries.map((boundary, index) => (
                        <Animated.Text 
                          key={index} 
                          style={styles.boundaryItem}
                          entering={FadeInDown.delay(900 + index * 50).duration(200)}
                        >
                          • {boundary}
                        </Animated.Text>
                      ))}
                    </View>
                  </CardSurface>
                </Animated.View>
              </>
            )}

            {boundaries.length === 0 && (
              <>
                <View style={{ height: Spacing.gapLg }} />
                <Animated.View entering={FadeInUp.delay(800).duration(400)}>
                  <CardSurface variant="glass" padding="md" radius={16} textColor={Colors.text.primary}>
                    <Text style={styles.emptyText}>Sin límites definidos</Text>
                  </CardSurface>
                </Animated.View>
              </>
            )}
          </View>
        </ContentContainer>
      </ScrollView>

      <Animated.View 
        style={styles.ctaContainer}
        entering={SlideInDown.delay(1000).duration(500).springify()}
      >
        <PrimaryCTA label={ctaLabel} onPress={onCTA} />
      </Animated.View>
    </SafeAreaView>
  );
};

