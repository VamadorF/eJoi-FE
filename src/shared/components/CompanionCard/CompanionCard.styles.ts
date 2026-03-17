import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Spacing } from '@/shared/theme/spacing';
import { Typography } from '@/shared/theme/typography';

export interface CompanionCardLayout {
  isSmallPhone: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  cardHorizontalMargin: number;
  cardWidth: number;
  cardBorderRadius: number;
  sectionPaddingH: number;
  sectionPaddingV: number;
  nameFontSize: number;
  bodyFontSize: number;
  captionFontSize: number;
  imageGradientHeight: number;
}

export const getCompanionCardLayout = (screenWidth: number): CompanionCardLayout => {
  const isSmallPhone = screenWidth < 375;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;
  const isDesktop = screenWidth >= 1024;

  const cardHorizontalMargin = isTablet ? 64 : isSmallPhone ? 12 : 16;
  const cardWidth = isDesktop
    ? Math.min(480, screenWidth - 64)
    : Math.max(0, screenWidth - cardHorizontalMargin * 2);

  return {
    isSmallPhone,
    isTablet,
    isDesktop,
    cardHorizontalMargin,
    cardWidth,
    cardBorderRadius: isTablet ? 24 : 16,
    sectionPaddingH: isTablet ? Spacing.lg : isSmallPhone ? Spacing.sm : Spacing.md,
    sectionPaddingV: isTablet ? Spacing.md : Spacing.sm,
    nameFontSize: isTablet ? 34 : isSmallPhone ? 24 : 28,
    bodyFontSize: isTablet ? 16 : isSmallPhone ? 13 : 14,
    captionFontSize: isTablet ? 14 : isSmallPhone ? 11 : 12,
    imageGradientHeight: isTablet ? 150 : 100,
  };
};

const defaultScreenWidth = Dimensions.get('window').width;
const defaultLayout = getCompanionCardLayout(defaultScreenWidth);

export const CARD_HORIZONTAL_MARGIN = defaultLayout.cardHorizontalMargin;
export const CARD_WIDTH = defaultLayout.cardWidth;

const lineHeight = (fontSize?: number, mult = 1.25) =>
  Math.round((fontSize ?? 14) * mult);

export const createCompanionCardStyles = (screenWidth: number) => {
  const layout = getCompanionCardLayout(screenWidth);

  return StyleSheet.create({
    tinderCard: {
      width: layout.cardWidth,
      maxWidth: 480,
      backgroundColor: Colors.background.white,
      borderRadius: layout.cardBorderRadius,
      overflow: 'hidden',
      ...Platform.select({
        default: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: layout.isTablet ? 12 : 8 },
          shadowOpacity: layout.isTablet ? 0.18 : 0.15,
          shadowRadius: layout.isTablet ? 32 : 24,
          elevation: layout.isTablet ? 16 : 12,
        },
        web: {
          boxShadow: layout.isTablet
            ? '0px 12px 32px rgba(0,0,0,0.18)'
            : '0px 8px 24px rgba(0,0,0,0.15)',
        },
      }),
    },

        imageContainer: {
            width: '100%',
            aspectRatio: layout.isTablet ? 3 / 4 : 4 / 5,
            position: 'relative',
            backgroundColor: Colors.background.light,
            overflow: 'hidden',
        },

    companionImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },

    imageLoadingOverlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
      zIndex: 2,
    },

    imageLoadingText: {
      fontSize: layout.bodyFontSize,
      fontFamily: Typography.fontFamily.medium,
      color: '#FFFFFF',
      lineHeight: lineHeight(layout.bodyFontSize, 1.25),
      textAlign: 'center',
      paddingHorizontal: layout.sectionPaddingH,
    },

    imageGradient: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: layout.imageGradientHeight,
      justifyContent: 'flex-end',
      paddingHorizontal: layout.sectionPaddingH,
      paddingBottom: layout.sectionPaddingH,
    },

    editImageButton: {
      position: 'absolute',
      bottom: layout.isTablet ? Spacing.lg : Spacing.md,
      right: layout.isTablet ? Spacing.lg : Spacing.md,
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderRadius: 20,
      paddingHorizontal: layout.isTablet ? 18 : 14,
      paddingVertical: layout.isTablet ? 10 : 8,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      ...Platform.select({
        default: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
        web: {
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        },
      }),
    },

    editImageButtonText: {
      fontSize: layout.captionFontSize,
      fontFamily: Typography.fontFamily.medium,
      color: Colors.text.primary,
      lineHeight: lineHeight(layout.captionFontSize, 1.2),
    },

        headerSection: {
            paddingHorizontal: layout.sectionPaddingH,
            paddingTop: layout.isTablet ? Spacing.lg : Spacing.sm,
            paddingBottom: layout.isTablet ? Spacing.sm : 2,
        },

    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: layout.isTablet ? 12 : 8,
      marginBottom: 4,
      flexWrap: 'wrap',
    },

    companionName: {
      fontSize: layout.nameFontSize,
      fontFamily: Typography.fontFamily.bold,
      color: Colors.text.primary,
      lineHeight: lineHeight(layout.nameFontSize, 1.1),
      flexShrink: 1,
    },

    verifiedBadge: {
      width: layout.isTablet ? 28 : 22,
      height: layout.isTablet ? 28 : 22,
      borderRadius: layout.isTablet ? 14 : 11,
      backgroundColor: '#1DA1F2',
      justifyContent: 'center',
      alignItems: 'center',
    },

    verifiedIcon: {
      color: Colors.text.white,
      fontSize: layout.isTablet ? 16 : 13,
      fontWeight: 'bold',
    },

        personalityBadge: {
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
            backgroundColor: '#F4BCD6',
            paddingHorizontal: layout.isTablet ? 16 : 10,
            paddingVertical: layout.isTablet ? 8 : 4,
            borderRadius: 20,
            marginTop: layout.isTablet ? Spacing.sm : 4,
            gap: 6,
        },

    personalityBadgeIcon: {
      fontSize: layout.isTablet ? 16 : 14,
    },

    personalityBadgeText: {
      fontSize: layout.captionFontSize,
      fontFamily: Typography.fontFamily.medium,
      color: Colors.base.primary,
      lineHeight: lineHeight(layout.captionFontSize, 1.2),
    },

        aboutSection: {
            paddingHorizontal: layout.sectionPaddingH,
            paddingTop: layout.isTablet ? Spacing.lg : Spacing.sm,
            paddingBottom: layout.isTablet ? layout.sectionPaddingV : 4,
        },

        sectionHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: layout.isTablet ? Spacing.md : 4,
        },

    sectionTitle: {
      fontSize: layout.isTablet ? 14 : 12,
      fontFamily: Typography.fontFamily.bold,
      color: Colors.text.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      lineHeight: lineHeight(layout.isTablet ? 14 : 12, 1.2),
    },

    editLink: {
      fontSize: layout.captionFontSize,
      fontFamily: Typography.fontFamily.medium,
      color: Colors.text.link,
      lineHeight: lineHeight(layout.captionFontSize, 1.2),
      paddingVertical: 4,
      paddingHorizontal: 8,
    },

        aboutText: {
            fontSize: layout.bodyFontSize,
            fontFamily: Typography.fontFamily.regular,
            color: '#6A6A6A',
            lineHeight: lineHeight(layout.bodyFontSize, 1.4),
        },

        interestsSection: {
            paddingHorizontal: layout.sectionPaddingH,
            paddingTop: layout.isTablet ? layout.sectionPaddingV : 4,
            paddingBottom: layout.isTablet ? Spacing.lg : Spacing.sm,
        },

        interestChipsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: layout.isTablet ? 10 : 6,
            marginTop: layout.isTablet ? Spacing.sm : 4,
        },

        interestChip: {
            backgroundColor: '#EAB2CB',
            paddingHorizontal: layout.isTablet ? 16 : 10,
            paddingVertical: layout.isTablet ? 10 : 5,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#D61D6D',
        },

        interestChipSelected: {
            backgroundColor: Colors.auxiliary.primary,
            borderColor: Colors.base.primary,
        },

    interestChipText: {
      fontSize: layout.captionFontSize,
      fontFamily: Typography.fontFamily.medium,
      color: Colors.base.primary,
      lineHeight: lineHeight(layout.captionFontSize, 1.2),
    },

        boundariesSection: {
            paddingHorizontal: layout.sectionPaddingH,
            paddingTop: layout.isTablet ? layout.sectionPaddingV : 4,
            paddingBottom: layout.isTablet ? Spacing.lg : Spacing.sm,
            borderTopWidth: 1,
            borderTopColor: Colors.border.light,
        },

        boundaryTag: {
            backgroundColor: '#F0DFE7',
            paddingHorizontal: layout.isTablet ? 16 : 10,
            paddingVertical: layout.isTablet ? 10 : 5,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#E3B9CD',
        },

    boundaryTagText: {
      fontSize: layout.captionFontSize,
      fontFamily: Typography.fontFamily.regular,
      color: Colors.base.primary,
      lineHeight: lineHeight(layout.captionFontSize, 1.2),
    },

        moreSection: {
            paddingHorizontal: layout.sectionPaddingH,
            paddingTop: layout.isTablet ? layout.sectionPaddingV : 4,
            paddingBottom: layout.isTablet ? Spacing.lg : Spacing.sm,
            borderTopWidth: 1,
            borderTopColor: Colors.border.light,
        },

        moreChipsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: layout.isTablet ? 10 : 6,
            marginTop: layout.isTablet ? Spacing.sm : 4,
        },

        moreChip: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#ECECEC',
            paddingHorizontal: layout.isTablet ? 14 : 8,
            paddingVertical: layout.isTablet ? 10 : 5,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#E0E0E0',
            gap: 4,
        },

    moreChipIcon: {
      fontSize: layout.isTablet ? 16 : 14,
    },

    moreChipText: {
      fontSize: layout.captionFontSize,
      fontFamily: Typography.fontFamily.regular,
      color: Colors.text.secondary,
      lineHeight: lineHeight(layout.captionFontSize, 1.2),
    },

    emptyText: {
      fontSize: layout.captionFontSize,
      fontFamily: Typography.fontFamily.regular,
      color: Colors.text.light,
      fontStyle: 'italic',
      lineHeight: lineHeight(layout.captionFontSize, 1.2),
    },

    primaryActionContainer: {
      paddingHorizontal: layout.sectionPaddingH,
      paddingTop: layout.sectionPaddingV,
      paddingBottom: layout.isTablet ? Spacing.lg : Spacing.md,
      borderTopWidth: 1,
      borderTopColor: Colors.border.light,
    },

    primaryActionButton: {
      borderWidth: 2,
      borderColor: Colors.base.primary,
      borderRadius: 24,
      paddingVertical: layout.isTablet ? 14 : 12,
      paddingHorizontal: layout.isTablet ? 24 : 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.base.primary,
    },

    primaryActionText: {
      fontSize: layout.isTablet ? 18 : 16,
      fontFamily: Typography.fontFamily.bold,
      color: '#FFFFFF',
      lineHeight: lineHeight(layout.isTablet ? 18 : 16, 1.25),
    },
  });
};

export const cardStyles = createCompanionCardStyles(defaultScreenWidth);
