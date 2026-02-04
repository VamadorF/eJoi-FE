import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        position: 'fixed',
      },
    }),
  },
  safeArea: {
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: Colors.base.primary,
    paddingVertical: Spacing.button.paddingVertical,
    paddingHorizontal: Spacing.screen.paddingHorizontal,
    marginHorizontal: Spacing.screen.paddingHorizontal,
    marginBottom: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    shadowColor: Colors.base.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  label: {
    ...Typography.styles.button,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.white,
  },
  labelDisabled: {
    opacity: 0.6,
  },
});

