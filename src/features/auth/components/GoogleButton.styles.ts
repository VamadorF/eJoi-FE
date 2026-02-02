import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Spacing } from '@/shared/theme/spacing';
import { Typography } from '@/shared/theme/typography';

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.white,
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: 12,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginHorizontal: Spacing.buttonMargin.horizontal,
    marginVertical: Spacing.buttonMargin.vertical,
    minHeight: 44,
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  text: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.primary,
  },
  loader: {
    marginRight: Spacing.sm,
  },
});

