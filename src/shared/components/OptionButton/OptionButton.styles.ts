import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

export const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: Spacing.md,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.auxiliary.primary,
    backgroundColor: Colors.background.white,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    flexDirection: 'row',
  },
  buttonSelected: {
    borderColor: Colors.base.primary,
    backgroundColor: Colors.base.primary,
    borderWidth: 3,
    ...Platform.select({
      default: {
        shadowColor: Colors.base.primary,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
      },
      web: {
        boxShadow: `0px 2px 8px ${Colors.base.primary}1A`,
      },
    }),
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIconContainer: {
    marginRight: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    marginLeft: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  labelSelected: {
    color: Colors.text.white,
    fontFamily: Typography.fontFamily.bold,
  },
  labelDisabled: {
    color: Colors.text.light,
  },
  subtitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    marginTop: Spacing.gapSm,
    textAlign: 'center',
  },
  subtitleSelected: {
    color: Colors.text.white,
  },
  subtitleDisabled: {
    color: Colors.text.light,
  },
});


