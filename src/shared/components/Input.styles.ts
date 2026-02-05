import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Spacing } from '@/shared/theme/spacing';
import { Typography } from '@/shared/theme/typography';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 0, // El espaciado se maneja en el componente padre
    width: '100%',
  },
  label: {
    ...Typography.styles.bodySmall,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
    lineHeight: 21, // 14 * 1.5 - valor absoluto en px
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
    lineHeight: 24, // 16 * 1.5 - valor absoluto en px
    textAlignVertical: 'top', // Para multiline inputs
  },
  inputError: {
    borderColor: Colors.error,
  },
  error: {
    ...Typography.styles.caption,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.error,
    marginTop: Spacing.sm,
    lineHeight: 17, // 12 * 1.4 - valor absoluto en px
  },
});

