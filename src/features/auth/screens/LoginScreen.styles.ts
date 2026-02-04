import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Spacing } from '@/shared/theme/spacing';
import { Typography } from '@/shared/theme/typography';

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    minHeight: '100%',
  },
  heroImage: {
    position: 'absolute',
    width: '100%',
    height: 300,
    top: 80,
    opacity: 0.15,
    zIndex: 0,
  },
  buttonsContainer: {
    width: '100%',
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logo: {
    width: 160,
    height: 160,
    maxWidth: '80%', // Mobile-first: responsive
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
    marginHorizontal: Spacing.buttonMargin.horizontal,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border.light,
  },
  separatorText: {
    ...Typography.styles.bodySmall,
    color: Colors.text.secondary,
    marginHorizontal: Spacing.md,
  },
  createAccountButton: {
    marginHorizontal: Spacing.buttonMargin.horizontal,
    marginTop: Spacing.sm,
  },
  termsContainer: {
    marginTop: Spacing.lg,
    marginHorizontal: Spacing.buttonMargin.horizontal,
  },
  termsText: {
    ...Typography.styles.caption,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: Typography.styles.caption.fontSize * Typography.lineHeight.normal,
  },
  link: {
    color: Colors.text.link,
    textDecorationLine: 'underline',
    fontFamily: Typography.fontFamily.regular,
  },
  loginLinkContainer: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  loginLinkText: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
  },
  skipContainer: {
    marginTop: Spacing.gapLg,
    alignItems: 'center',
    width: '100%',
  },
  skipButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    minHeight: 44,
  },
  skipText: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.white,
    opacity: 0.9,
    textDecorationLine: 'underline',
  },
});

