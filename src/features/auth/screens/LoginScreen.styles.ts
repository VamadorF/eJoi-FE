import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Spacing } from '@/shared/theme/spacing';
import { Typography } from '@/shared/theme/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
    minHeight: '100%',
  },
  loginCard: {
    backgroundColor: Colors.background.white,
    borderRadius: 20,
    padding: Spacing.lg,
    width: '100%',
    maxWidth: 400,
    marginHorizontal: Spacing.md, // Mobile-first: márgenes laterales
    // Para web usar boxShadow, para mobile usar shadow*
    ...(Platform.OS === 'web' ? {
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    } : {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    }),
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
    marginTop: Spacing.lg,
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    minHeight: 44, // Touch target mínimo para mobile
  },
  skipText: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    textDecorationLine: 'underline',
  },
});

