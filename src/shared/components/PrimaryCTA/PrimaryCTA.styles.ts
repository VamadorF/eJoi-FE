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
    zIndex: 9999,
    ...Platform.select({
      web: {
        position: 'fixed' as any,
        zIndex: 9999,
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
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
      },
    }),
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  label: {
    ...Typography.styles.button,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.white,
    lineHeight: 24, // 16 * 1.5 - valor absoluto en px
  },
  labelDisabled: {
    opacity: 0.6,
  },
});

