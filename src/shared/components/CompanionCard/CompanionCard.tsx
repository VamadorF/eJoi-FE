import React, { useMemo } from 'react';
import {
  ImageBackground,
  Pressable,
  Text,
  View,
  useWindowDimensions,
  type ImageSourcePropType,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { createCompanionCardStyles } from './CompanionCard.styles';

export type CompanionCardMode = 'preview' | 'profile';

export interface CompanionCardProps {
  mode?: CompanionCardMode;
  name: string;
  image: ImageSourcePropType;
  persona?: string;
  tone?: string;
  aboutText?: string;
  interests?: string[];
  boundaries?: string[];
  visualStyle?: string;
  gender?: string;
  interactionStyle?: string;
  conversationDepth?: string;
  ethnicity?: string;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onEditImage?: () => void;
  onEditName?: () => void;
  onEditPersona?: () => void;
  onEditInterests?: () => void;
  onEditBoundaries?: () => void;
}

interface DetailChip {
  key: string;
  value: string;
  emoji: string;
}

const FALLBACK_PERSONALITY_DETAILS: Array<Omit<DetailChip, 'key'>> = [
  { value: 'Empatica', emoji: '💗' },
  { value: 'Atenta', emoji: '✨' },
  { value: 'Reflexiva', emoji: '🧠' },
];

const getToneIconName = (
  tone?: string
): React.ComponentProps<typeof Ionicons>['name'] => {
  if (!tone) return 'sparkles-outline';
  const normalized = tone.toLowerCase();

  if (normalized.includes('divert') || normalized.includes('juguet')) return 'happy-outline';
  if (normalized.includes('calm') || normalized.includes('tranquil')) return 'leaf-outline';
  if (normalized.includes('rom')) return 'heart-outline';
  if (normalized.includes('seri') || normalized.includes('prof')) return 'school-outline';

  return 'sparkles-outline';
};

const getDefaultEmoji = (value: string) => {
  const v = value.toLowerCase();
  if (v.includes('prof') || v.includes('seri')) return '🧠';
  if (v.includes('calm') || v.includes('tranquil')) return '🌿';
  if (v.includes('rom')) return '💕';
  return '✨';
};

const getDetailEmoji = (key: DetailChip['key'], value: string) => {
  if (key === 'persona') return '🧬';
  if (key === 'tone') return getDefaultEmoji(value);
  if (key === 'interactionStyle') return '🗨️';
  if (key === 'conversationDepth') return '🧠';
  return '✨';
};

export const CompanionCard: React.FC<CompanionCardProps> = ({
  mode = 'preview',
  name,
  image,
  persona,
  tone,
  aboutText,
  interests = [],
  boundaries = [],
  visualStyle,
  gender,
  interactionStyle,
  conversationDepth,
  ethnicity,
  primaryActionLabel,
  onPrimaryAction,
  onEditImage,
  onEditName,
  onEditPersona,
  onEditInterests,
  onEditBoundaries,
}) => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createCompanionCardStyles(width), [width]);

  const details = useMemo<DetailChip[]>(() => {
    const rawItems: DetailChip[] = [
      persona?.trim()
        ? { key: 'persona', value: persona.trim(), emoji: getDetailEmoji('persona', persona) }
        : null,
      tone?.trim() ? { key: 'tone', value: tone.trim(), emoji: getDetailEmoji('tone', tone) } : null,
      interactionStyle?.trim()
        ? {
            key: 'interactionStyle',
            value: interactionStyle.trim(),
            emoji: getDetailEmoji('interactionStyle', interactionStyle),
          }
        : null,
      conversationDepth?.trim()
        ? {
            key: 'conversationDepth',
            value: conversationDepth.trim(),
            emoji: getDetailEmoji('conversationDepth', conversationDepth),
          }
        : null,
    ].filter((item): item is DetailChip => Boolean(item));

    const seen = new Set<string>();
    const deduped = rawItems.filter((item) => {
      const key = item.value.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const topThree = deduped.slice(0, 3);
    if (topThree.length === 3) return topThree;

    const withFallback = [...topThree];
    for (const fallback of FALLBACK_PERSONALITY_DETAILS) {
      if (withFallback.length >= 3) break;
      if (withFallback.some((item) => item.value.toLowerCase() === fallback.value.toLowerCase())) {
        continue;
      }
      withFallback.push({
        key: `fallback-${withFallback.length + 1}`,
        value: fallback.value,
        emoji: fallback.emoji,
      });
    }

    return withFallback.slice(0, 3);
  }, [persona, tone, interactionStyle, conversationDepth]);

  const safeAboutText = aboutText?.trim() || 'Sin descripcion por ahora.';

  return (
    <View style={styles.tinderCard}>
      <View style={styles.imageContainer}>
        <ImageBackground source={image} style={styles.companionImage} imageStyle={styles.companionImage}>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.5)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.imageGradient}
          />

        </ImageBackground>
      </View>

      <View style={styles.headerSection}>
        <View style={styles.nameRow}>
          <Text style={styles.companionName}>{name}</Text>
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark" style={styles.verifiedIcon} />
          </View>

          {mode === 'preview' && onEditName && (
            <Pressable onPress={onEditName} hitSlop={8}>
              <Text style={styles.editLink}>Editar</Text>
            </Pressable>
          )}
        </View>

        {(persona || tone) && (
          <View style={styles.personalityBadge}>
            <Ionicons
              name={getToneIconName(tone)}
              size={14}
              color="#f20a64"
              style={styles.personalityBadgeIcon}
            />
            <Text style={styles.personalityBadgeText}>
              {[persona, tone].filter(Boolean).join(' - ')}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.aboutSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sobre mi</Text>
          {mode === 'preview' && onEditPersona && (
            <Pressable onPress={onEditPersona} hitSlop={8}>
              <Text style={styles.editLink}>Editar</Text>
            </Pressable>
          )}
        </View>

        <Text style={styles.aboutText}>{safeAboutText}</Text>
      </View>

      <View style={styles.interestsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Intereses</Text>
          {mode === 'preview' && onEditInterests && (
            <Pressable onPress={onEditInterests} hitSlop={8}>
              <Text style={styles.editLink}>Editar</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.interestChipsContainer}>
          {interests.length === 0 && <Text style={styles.emptyText}>Sin intereses seleccionados</Text>}

          {interests.map((interest, index) => (
            <View key={`${interest}-${index}`} style={styles.interestChip}>
              <Text style={styles.interestChipText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.moreSection}>
        <Text style={styles.sectionTitle}>MAS SOBRE MI</Text>
        <View style={styles.moreChipsContainer}>
          {details.map((detail) => (
            <View key={detail.key} style={styles.moreChip}>
              <Text style={styles.moreChipIcon}>{detail.emoji}</Text>
              <Text style={styles.moreChipText}>{detail.value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.boundariesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>LIMITES</Text>
          {mode === 'preview' && onEditBoundaries && (
            <Pressable onPress={onEditBoundaries} hitSlop={8}>
              <Text style={styles.editLink}>Editar</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.interestChipsContainer}>
          {boundaries.length === 0 && <Text style={styles.emptyText}>Sin limites definidos</Text>}

          {boundaries.map((boundary, index) => (
            <View key={`${boundary}-${index}`} style={styles.boundaryTag}>
              <Text style={styles.boundaryTagText}>{boundary}</Text>
            </View>
          ))}
        </View>
      </View>

      {mode === 'profile' && primaryActionLabel && onPrimaryAction && (
        <View style={styles.primaryActionContainer}>
          <Pressable style={styles.primaryActionButton} onPress={onPrimaryAction}>
            <Text style={styles.primaryActionText}>{primaryActionLabel}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
