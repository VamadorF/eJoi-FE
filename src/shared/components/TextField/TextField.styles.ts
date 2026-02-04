import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.styles.caption,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.primary,
    marginBottom: Spacing.gapSm,
  },
  input: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.background.white,
    color: Colors.text.primary,
    minHeight: 48,
    lineHeight: Typography.styles.body.fontSize * Typography.lineHeight.normal,
  },
  inputMultiline: {
    textAlignVertical: 'top',
    minHeight: 100,
  },
  inputError: {
    borderColor: Colors.error,
  },
  helperText: {
    ...Typography.styles.caption,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    marginTop: Spacing.gapSm,
    minHeight: 16,
  },
  error: {
    ...Typography.styles.caption,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.error,
    marginTop: Spacing.gapSm,
    minHeight: 16,
  },
});

