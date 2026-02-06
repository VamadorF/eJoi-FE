import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Spacing } from '@/shared/theme/spacing';
import { Typography } from '@/shared/theme/typography';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ============ RESPONSIVE HELPERS ============
const isSmallPhone = SCREEN_WIDTH < 375;
const isPhone = SCREEN_WIDTH < 768;
const isTablet = SCREEN_WIDTH >= 768 && SCREEN_WIDTH < 1024;
const isDesktop = SCREEN_WIDTH >= 1024;

// Escalar valores según densidad de pantalla
const scale = (size: number) => {
  const baseWidth = 375; // iPhone X width
  return Math.round((SCREEN_WIDTH / baseWidth) * size);
};

// Escalar moderadamente (para textos y espacios que no deben crecer tanto)
const moderateScale = (size: number, factor = 0.5) => {
  return Math.round(size + (scale(size) - size) * factor);
};

// ============ RESPONSIVE VALUES ============
// Card
const CARD_HORIZONTAL_MARGIN = isTablet ? 64 : isSmallPhone ? 12 : 16;
const CARD_WIDTH = isDesktop 
  ? Math.min(480, SCREEN_WIDTH - 64) 
  : SCREEN_WIDTH - (CARD_HORIZONTAL_MARGIN * 2);
const CARD_BORDER_RADIUS = isTablet ? 24 : 16;

// Image
const IMAGE_ASPECT_RATIO = 4 / 5; // Aspect ratio estilo Tinder
const CARD_IMAGE_HEIGHT = isDesktop
  ? 400
  : isTablet
  ? Math.min(SCREEN_HEIGHT * 0.45, 450)
  : Math.min(CARD_WIDTH * IMAGE_ASPECT_RATIO, SCREEN_HEIGHT * 0.45);

// Spacing responsive
const SECTION_PADDING_H = isTablet ? Spacing.lg : isSmallPhone ? Spacing.sm : Spacing.md;
const SECTION_PADDING_V = isTablet ? Spacing.md : Spacing.sm;

// Typography scale
const NAME_FONT_SIZE = isTablet ? 34 : isSmallPhone ? 24 : 28;
const BODY_FONT_SIZE = isTablet ? 16 : isSmallPhone ? 13 : 14;
const CAPTION_FONT_SIZE = isTablet ? 14 : isSmallPhone ? 11 : 12;

const lh = (fontSize?: number, mult = 1.25) =>
  Math.round((fontSize ?? 14) * mult);

export const styles = StyleSheet.create({
  // ============ LAYOUT PRINCIPAL ============
  scrollView: {
    flex: 1,
  },

  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: CARD_HORIZONTAL_MARGIN,
    paddingTop: isTablet ? Spacing.lg : Spacing.md,
    paddingBottom: isTablet ? 120 : 100,
    alignItems: 'center',
  },

  // ============ TINDER CARD ============
  tinderCard: {
    width: CARD_WIDTH,
    maxWidth: 480,
    backgroundColor: Colors.background.white,
    borderRadius: CARD_BORDER_RADIUS,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: isTablet ? 12 : 8 },
    shadowOpacity: isTablet ? 0.18 : 0.15,
    shadowRadius: isTablet ? 32 : 24,
    elevation: isTablet ? 16 : 12,
  },

  // ============ IMAGEN DEL COMPANION ============
  imageContainer: {
    width: '100%',
    height: CARD_IMAGE_HEIGHT,
    position: 'relative',
    backgroundColor: Colors.background.light,
    overflow: 'hidden',
  },

  companionImage: {
    width: '100%',
    height: '100%',
  },

  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: isTablet ? 150 : 100,
    justifyContent: 'flex-end',
    paddingHorizontal: SECTION_PADDING_H,
    paddingBottom: SECTION_PADDING_H,
  },

  editImageButton: {
    position: 'absolute',
    bottom: isTablet ? Spacing.lg : Spacing.md,
    right: isTablet ? Spacing.lg : Spacing.md,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    paddingHorizontal: isTablet ? 18 : 14,
    paddingVertical: isTablet ? 10 : 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  editImageButtonText: {
    fontSize: CAPTION_FONT_SIZE,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.primary,
  },

  // ============ HEADER (NOMBRE + BADGE) ============
  headerSection: {
    paddingHorizontal: SECTION_PADDING_H,
    paddingTop: isTablet ? Spacing.lg : Spacing.md,
    paddingBottom: isTablet ? Spacing.sm : Spacing.xs,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: isTablet ? 12 : 8,
    marginBottom: 4,
    flexWrap: 'wrap',
  },

  companionName: {
    fontSize: NAME_FONT_SIZE,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    lineHeight: lh(NAME_FONT_SIZE, 1.1),
    flexShrink: 1,
  },

  verifiedBadge: {
    width: isTablet ? 28 : 22,
    height: isTablet ? 28 : 22,
    borderRadius: isTablet ? 14 : 11,
    backgroundColor: '#1DA1F2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  verifiedIcon: {
    color: Colors.text.white,
    fontSize: isTablet ? 16 : 13,
    fontWeight: 'bold',
  },

  // ============ PERSONALITY BADGE ============
  personalityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.auxiliary.primary,
    paddingHorizontal: isTablet ? 16 : 12,
    paddingVertical: isTablet ? 8 : 6,
    borderRadius: 20,
    marginTop: Spacing.sm,
    gap: 6,
  },

  personalityBadgeIcon: {
    fontSize: isTablet ? 16 : 14,
  },

  personalityBadgeText: {
    fontSize: CAPTION_FONT_SIZE,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.base.primary,
    lineHeight: lh(CAPTION_FONT_SIZE, 1.2),
  },

  // ============ SECCIÓN "SOBRE MÍ" ============
  aboutSection: {
    paddingHorizontal: SECTION_PADDING_H,
    paddingTop: isTablet ? Spacing.lg : Spacing.md,
    paddingBottom: SECTION_PADDING_V,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: isTablet ? Spacing.md : Spacing.sm,
  },

  sectionTitle: {
    fontSize: isTablet ? 14 : 12,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    lineHeight: lh(isTablet ? 14 : 12, 1.2),
  },

  editLink: {
    fontSize: CAPTION_FONT_SIZE,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.link,
    lineHeight: lh(CAPTION_FONT_SIZE, 1.2),
    paddingVertical: 4,
    paddingHorizontal: 8,
  },

  aboutText: {
    fontSize: BODY_FONT_SIZE,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    lineHeight: lh(BODY_FONT_SIZE, 1.6),
  },

  // ============ SECCIÓN INTERESES ============
  interestsSection: {
    paddingHorizontal: SECTION_PADDING_H,
    paddingTop: SECTION_PADDING_V,
    paddingBottom: isTablet ? Spacing.lg : Spacing.md,
  },

  interestChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: isTablet ? 10 : 8,
    marginTop: Spacing.sm,
  },

  interestChip: {
    backgroundColor: Colors.background.light,
    paddingHorizontal: isTablet ? 16 : 12,
    paddingVertical: isTablet ? 10 : 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },

  interestChipSelected: {
    backgroundColor: Colors.auxiliary.primary,
    borderColor: Colors.base.primary,
  },

  interestChipText: {
    fontSize: CAPTION_FONT_SIZE,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    lineHeight: lh(CAPTION_FONT_SIZE, 1.2),
  },

  interestChipTextSelected: {
    color: Colors.base.primary,
    fontFamily: Typography.fontFamily.medium,
  },

  // ============ SECCIÓN LÍMITES ============
  boundariesSection: {
    paddingHorizontal: SECTION_PADDING_H,
    paddingTop: SECTION_PADDING_V,
    paddingBottom: isTablet ? Spacing.lg : Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },

  boundaryTag: {
    backgroundColor: 'rgba(242, 10, 100, 0.08)',
    paddingHorizontal: isTablet ? 16 : 12,
    paddingVertical: isTablet ? 10 : 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(242, 10, 100, 0.2)',
  },

  boundaryTagText: {
    fontSize: CAPTION_FONT_SIZE,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.base.primary,
    lineHeight: lh(CAPTION_FONT_SIZE, 1.2),
  },

  // ============ SECCIÓN "MÁS SOBRE MÍ" ============
  moreSection: {
    paddingHorizontal: SECTION_PADDING_H,
    paddingTop: SECTION_PADDING_V,
    paddingBottom: isTablet ? Spacing.lg : Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },

  moreChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: isTablet ? 10 : 8,
    marginTop: Spacing.sm,
  },

  moreChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.light,
    paddingHorizontal: isTablet ? 14 : 10,
    paddingVertical: isTablet ? 10 : 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border.light,
    gap: 6,
  },

  moreChipIcon: {
    fontSize: isTablet ? 16 : 14,
  },

  moreChipText: {
    fontSize: CAPTION_FONT_SIZE,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    lineHeight: lh(CAPTION_FONT_SIZE, 1.2),
  },

  // ============ EMPTY STATE ============
  emptyText: {
    fontSize: CAPTION_FONT_SIZE,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.light,
    fontStyle: 'italic',
    lineHeight: lh(CAPTION_FONT_SIZE, 1.2),
  },

  // ============ ERROR STATE ============
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },

  errorText: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.white,
    marginBottom: Spacing.lg,
    textAlign: 'center',
    lineHeight: lh(Typography.styles.body?.fontSize, 1.25),
  },

  // ============ LEGACY (mantener para compatibilidad) ============
  gradient: {
    flex: 1,
  },

  header: {
    marginBottom: Spacing.gapLg,
    alignItems: 'flex-start',
    width: '100%',
    gap: Spacing.gapSm,
  },

  title: {
    ...Typography.styles.h1,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.white,
    textAlign: 'left',
    lineHeight: lh(Typography.styles.h1?.fontSize, 1.15),
  },

  subtitle: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.white,
    opacity: 0.9,
    textAlign: 'left',
    lineHeight: lh(Typography.styles.body?.fontSize, 1.25),
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: Spacing.gapSm,
    columnGap: Spacing.gapSm,
    marginBottom: Spacing.gapMd,
    width: '100%',
  },

  cardTitle: {
    ...Typography.styles.h4,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    lineHeight: lh(Typography.styles.h4?.fontSize, 1.2),
  },

  editButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    minHeight: 32,
    alignSelf: 'flex-start',
  },

  identityContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.gapSm,
    minHeight: 120,
    width: '100%',
  },

  avatarWrapper: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary.light ?? 'rgba(255,255,255,0.08)',
  },

  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  personalitySection: {
    gap: Spacing.gapSm,
    width: '100%',
  },

  personalityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    minWidth: 0,
  },

  personalityLabel: {
    ...Typography.styles.caption,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.secondary,
    flexBasis: 110,
    flexShrink: 1,
    lineHeight: lh(Typography.styles.caption?.fontSize, 1.2),
    marginRight: Spacing.sm,
  },

  personalityValue: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.primary,
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    flexWrap: 'wrap',
    lineHeight: lh(Typography.styles.body?.fontSize, 1.25),
  },

  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: Spacing.gapSm,
    columnGap: Spacing.gapSm,
    width: '100%',
  },

  boundariesList: {
    gap: Spacing.gapSm,
    width: '100%',
  },

  boundaryItem: {
    ...Typography.styles.bodySmall,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.primary,
    lineHeight: lh(Typography.styles.bodySmall?.fontSize, 1.25),
  },

  footer: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    width: '100%',
  },

  decorativeHand: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_HEIGHT * 0.3,
    left: -SCREEN_WIDTH * 0.1,
    bottom: 0,
    opacity: 0.05,
    zIndex: 0,
  },
});
