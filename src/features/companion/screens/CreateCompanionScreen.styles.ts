import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Spacing } from '@/shared/theme/spacing';
import { Typography } from '@/shared/theme/typography';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 32;
const CARD_IMAGE_HEIGHT = Math.min(SCREEN_HEIGHT * 0.38, 320);

const lh = (fontSize?: number, mult = 1.25) =>
  Math.round((fontSize ?? 14) * mult);

export const styles = StyleSheet.create({
  // ============ LAYOUT PRINCIPAL ============
  scrollView: {
    flex: 1,
  },

  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: 100,
    alignItems: 'center',
  },

  // ============ TINDER CARD ============
  tinderCard: {
    width: CARD_WIDTH,
    backgroundColor: Colors.background.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
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
    resizeMode: 'cover',
  },

  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },

  editImageButton: {
    position: 'absolute',
    bottom: Spacing.md,
    right: Spacing.md,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
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
    ...Typography.styles.caption,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.primary,
  },

  // ============ HEADER (NOMBRE + BADGE) ============
  headerSection: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xs,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },

  companionName: {
    ...Typography.styles.h2,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    lineHeight: lh(Typography.styles.h2?.fontSize, 1.1),
  },

  verifiedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1DA1F2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  verifiedIcon: {
    color: Colors.text.white,
    fontSize: 14,
    fontWeight: 'bold',
  },

  // ============ PERSONALITY BADGE ============
  personalityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.auxiliary.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: Spacing.sm,
    gap: 6,
  },

  personalityBadgeIcon: {
    fontSize: 14,
  },

  personalityBadgeText: {
    ...Typography.styles.caption,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.base.primary,
    lineHeight: lh(Typography.styles.caption?.fontSize, 1.2),
  },

  // ============ SECCIÓN "SOBRE MÍ" ============
  aboutSection: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },

  sectionTitle: {
    ...Typography.styles.bodySmall,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    lineHeight: lh(Typography.styles.bodySmall?.fontSize, 1.2),
  },

  editLink: {
    ...Typography.styles.caption,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.link,
    lineHeight: lh(Typography.styles.caption?.fontSize, 1.2),
  },

  aboutText: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    lineHeight: lh(Typography.styles.body?.fontSize, 1.5),
  },

  // ============ SECCIÓN INTERESES ============
  interestsSection: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },

  interestChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: Spacing.sm,
  },

  interestChip: {
    backgroundColor: Colors.background.light,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },

  interestChipSelected: {
    backgroundColor: Colors.auxiliary.primary,
    borderColor: Colors.base.primary,
  },

  interestChipText: {
    ...Typography.styles.caption,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    lineHeight: lh(Typography.styles.caption?.fontSize, 1.2),
  },

  interestChipTextSelected: {
    color: Colors.base.primary,
    fontFamily: Typography.fontFamily.medium,
  },

  // ============ SECCIÓN LÍMITES ============
  boundariesSection: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },

  boundaryTag: {
    backgroundColor: 'rgba(242, 10, 100, 0.08)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(242, 10, 100, 0.2)',
  },

  boundaryTagText: {
    ...Typography.styles.caption,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.base.primary,
    lineHeight: lh(Typography.styles.caption?.fontSize, 1.2),
  },

  // ============ SECCIÓN "MÁS SOBRE MÍ" ============
  moreSection: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },

  moreChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: Spacing.sm,
  },

  moreChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.light,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border.light,
    gap: 6,
  },

  moreChipIcon: {
    fontSize: 14,
  },

  moreChipText: {
    ...Typography.styles.caption,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    lineHeight: lh(Typography.styles.caption?.fontSize, 1.2),
  },

  // ============ EMPTY STATE ============
  emptyText: {
    ...Typography.styles.caption,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.light,
    fontStyle: 'italic',
    lineHeight: lh(Typography.styles.caption?.fontSize, 1.2),
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
