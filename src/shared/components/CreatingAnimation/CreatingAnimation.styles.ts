import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.screen.paddingHorizontal,
    paddingVertical: Spacing['2xl'],
    minHeight: '100%',
  },
  imageWrapper: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.gapLg,
    position: 'relative',
  },
  wave: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: Colors.base.primary,
  },
  wave1: {
    width: 320,
    height: 320,
    borderRadius: 160,
  },
  wave2: {
    width: 340,
    height: 340,
    borderRadius: 170,
  },
  wave3: {
    width: 360,
    height: 360,
    borderRadius: 180,
  },
  imageContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  progressContainer: {
    flexDirection: 'row',
    gap: Spacing.gapSm,
    marginBottom: Spacing.gapLg,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.text.white,
    opacity: 0.3,
  },
  progressDotActive: {
    opacity: 1,
    backgroundColor: Colors.base.primary,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
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
    textAlign: 'center',
  },
});

