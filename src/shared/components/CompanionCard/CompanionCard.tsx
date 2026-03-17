import React, { useMemo } from 'react';
import {
  ActivityIndicator,
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
  isImageLoading?: boolean;
  imageLoadingText?: string;
}

interface DetailChip {
  key: string;
  value: string;
  emoji: string;
}

const getToneEmoji = (tone?: string) => {
  const normalized = tone?.toLowerCase() ?? '';
  if (normalized.includes('calid') || normalized.includes('warm')) return '\u{1F338}';
  if (normalized.includes('prof')) return '\u{1F4BC}';
  if (normalized.includes('juguet') || normalized.includes('divert')) return '\u{2728}';
  if (normalized.includes('rom')) return '\u{1F495}';
  if (normalized.includes('seri')) return '\u{1F4DA}';
  if (normalized.includes('amig')) return '\u{1F60A}';
  if (normalized.includes('mister')) return '\u{1F319}';
  if (normalized.includes('ener')) return '\u26A1';
  return '\u{1F4AB}';
};

const getGenderChip = (gender?: string) => {
  if (gender === 'femenino') return { emoji: '\u2640\uFE0F', value: 'Femenino' };
  if (gender === 'neutro') return { emoji: '\u26A7\uFE0F', value: 'Neutro' };
  if (gender === 'masculino') return { emoji: '\u2642\uFE0F', value: 'Masculino' };
  return null;
};

const getVisualStyleChip = (visualStyle?: string) => {
  if (!visualStyle) return null;
  return {
    emoji: visualStyle === 'anime' ? '\u{1F3A8}' : '\u{1F4F7}',
    value: visualStyle === 'anime' ? 'Anime' : 'Realista',
  };
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
  isImageLoading = false,
  imageLoadingText,
}) => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createCompanionCardStyles(width), [width]);

  const details = useMemo<DetailChip[]>(() => {
    const chips: DetailChip[] = [];

    const visualStyleChip = getVisualStyleChip(visualStyle);
    if (visualStyleChip) {
      chips.push({ key: 'visualStyle', ...visualStyleChip });
    }

    const genderChip = getGenderChip(gender);
    if (genderChip) {
      chips.push({ key: 'gender', ...genderChip });
    }

    if (tone?.trim()) {
      chips.push({
        key: 'tone',
        value: tone.trim(),
        emoji: getToneEmoji(tone),
      });
    }

    if (interactionStyle?.trim()) {
      chips.push({
        key: 'interactionStyle',
        value: interactionStyle.trim(),
        emoji: '\u{1F4AC}',
      });
    }

    if (conversationDepth?.trim()) {
      chips.push({
        key: 'conversationDepth',
        value: conversationDepth.trim(),
        emoji: '\u{1F9E0}',
      });
    }

    if (ethnicity?.trim()) {
      chips.push({
        key: 'ethnicity',
        value: ethnicity.trim(),
        emoji: '\u{1F30D}',
      });
    }

    return chips;
  }, [visualStyle, gender, tone, interactionStyle, conversationDepth, ethnicity]);

  const safeAboutText = aboutText?.trim() || 'Sin descripcion por ahora.';

  return (
    <View style={styles.tinderCard}>
      <View style={styles.imageContainer}>
        <ImageBackground source={image} style={styles.companionImage} imageStyle={styles.companionImage}>
          {isImageLoading && (
            <View style={styles.imageLoadingOverlay}>
              <ActivityIndicator size="large" color="#FFFFFF" />
              <Text style={styles.imageLoadingText}>
                {imageLoadingText || 'Generando imagen...'}
              </Text>
            </View>
          )}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.imageGradient}
          />
          {mode === 'preview' && onEditImage && (
            <Pressable style={styles.editImageButton} onPress={onEditImage} hitSlop={8}>
              <Text style={styles.editImageButtonText}>{'\u270F\uFE0F Editar'}</Text>
            </Pressable>
          )}
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
          <Pressable
            style={styles.personalityBadge}
            onPress={mode === 'preview' ? onEditPersona : undefined}
            disabled={mode !== 'preview' || !onEditPersona}
          >
            <Text style={styles.personalityBadgeIcon}>{getToneEmoji(tone)}</Text>
            <Text style={styles.personalityBadgeText}>{persona || 'Personalidad'}</Text>
          </Pressable>
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
        <Text style={styles.sectionTitle}>Mas sobre mi</Text>
        <View style={styles.moreChipsContainer}>
          {details.length === 0 && <Text style={styles.emptyText}>Sin detalles adicionales</Text>}
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
          <Text style={styles.sectionTitle}>Limites</Text>
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
