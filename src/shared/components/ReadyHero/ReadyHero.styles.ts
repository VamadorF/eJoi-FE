import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_HEIGHT * 0.5,
    right: -SCREEN_WIDTH * 0.2,
    bottom: -SCREEN_HEIGHT * 0.1,
    opacity: 0.12,
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
    marginBottom: Spacing.gapLg,
  },
  title: {
    ...Typography.styles.h1,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.white,
    marginBottom: Spacing.gapSm,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.white,
    opacity: 0.9,
    marginBottom: Spacing.gapLg,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
  },
  ctaContainer: {
    width: '100%',
    paddingHorizontal: Spacing.screen.paddingHorizontal,
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.styles.h4,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.gapSm,
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
    opacity: 0.9,
  },
  emptyText: {
    ...Typography.styles.caption,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

