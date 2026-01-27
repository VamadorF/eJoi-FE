import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Spacing } from '@/shared/theme/spacing';
import { Typography } from '@/shared/theme/typography';

export const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.styles.bodySmall,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
    fontWeight: Typography.fontWeight.medium,
  },
  input: {
    ...Typography.styles.body,
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.background.white,
    color: Colors.text.primary,
    minHeight: 44,
  },
  inputError: {
    borderColor: Colors.error,
  },
  error: {
    ...Typography.styles.caption,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
});

