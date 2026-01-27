import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Spacing } from '@/shared/theme/spacing';
import { Typography } from '@/shared/theme/typography';
import { getTexturedBackground } from '@/shared/theme/textures';

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
    borderRadius: 16,
    padding: Spacing.xl,
    width: '100%',
    maxWidth: 400,
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
    width: 180,
    height: 180,
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
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  link: {
    color: Colors.text.link,
    textDecorationLine: 'underline',
  },
  loginLinkContainer: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  loginLinkText: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
  },
});

