import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Spacing } from '@/shared/theme/spacing';
import { Typography } from '@/shared/theme/typography';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
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
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: Spacing.xl,
    paddingBottom: Spacing['2xl'],
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
    marginBottom: Spacing.gapSm,
    textAlign: 'left',
  },
  subtitle: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.white,
    opacity: 0.9,
    textAlign: 'left',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.gapMd,
  },
  cardTitle: {
    ...Typography.styles.h4,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
  },
  editButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    minHeight: 32,
  },
  identityContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.gapSm,
    minHeight: 120,
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
  },
  companionName: {
    ...Typography.styles.h3,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
  },
  personalitySection: {
    gap: Spacing.gapSm,
  },
  personalityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  personalityLabel: {
    ...Typography.styles.caption,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.secondary,
  },
  personalityValue: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.primary,
    flex: 1,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.gapSm,
  },
  boundariesList: {
    gap: Spacing.gapSm,
  },
  boundaryItem: {
    ...Typography.styles.bodySmall,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.primary,
  },
  emptyText: {
    ...Typography.styles.caption,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    fontStyle: 'italic',
  },
  footer: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    width: '100%',
  },
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
    lineHeight: Typography.styles.body.fontSize * Typography.lineHeight.normal,
  },
});

