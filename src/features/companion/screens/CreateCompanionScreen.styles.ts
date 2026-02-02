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
    bottom: SCREEN_HEIGHT * 0.1,
    opacity: 0.2,
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
    marginBottom: Spacing['2xl'],
    alignItems: 'flex-start',
    width: '100%',
  },
  title: {
    ...Typography.styles.h2,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.white,
    marginBottom: Spacing.md,
    textAlign: 'left',
    lineHeight: Typography.styles.h2.fontSize * Typography.lineHeight.tight,
  },
  subtitle: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.white,
    opacity: 0.9,
    textAlign: 'left',
    lineHeight: Typography.styles.body.fontSize * Typography.lineHeight.normal,
  },
  summary: {
    backgroundColor: Colors.auxiliary.primary,
    borderRadius: 16,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    width: '100%',
    opacity: 0.9,
  },
  summaryItem: {
    marginBottom: Spacing.lg,
  },
  summaryLabel: {
    ...Typography.styles.bodySmall,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.base.primary,
    marginBottom: Spacing.sm,
    lineHeight: Typography.styles.bodySmall.fontSize * Typography.lineHeight.normal,
  },
  summaryValue: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.primary,
    lineHeight: Typography.styles.body.fontSize * Typography.lineHeight.normal,
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

