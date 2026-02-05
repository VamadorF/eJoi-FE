import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Spacing } from '@/shared/theme/spacing';
import { Typography } from '@/shared/theme/typography';

// Helper para lineHeight consistente
const lh = (fontSize?: number, mult = 1.25) =>
  Math.round((fontSize ?? 14) * mult);

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: Spacing.xl,
    paddingBottom: Spacing['2xl'],
  },
  header: {
    marginBottom: Spacing['2xl'],
    alignItems: 'flex-start',
    width: '100%',
  },
  title: {
    ...Typography.styles.h2,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
    textAlign: 'left',
    lineHeight: lh(Typography.styles.h2.fontSize, 1.15),
  },
  subtitle: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    textAlign: 'left',
    lineHeight: lh(Typography.styles.body.fontSize, 1.25),
  },
  form: {
    flex: 1,
    marginBottom: Spacing.xl,
    width: '100%',
  },
  inputGroup: {
    marginBottom: Spacing.xl,
    width: '100%',
  },
  label: {
    ...Typography.styles.bodySmall,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
    lineHeight: lh(Typography.styles.bodySmall.fontSize, 1.2),
  },
  footer: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    width: '100%',
  },
  // Step content styles
  stepContainer: {
    width: '100%',
  },
  stepIndicator: {
    ...Typography.styles.caption,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.tertiary,
    marginBottom: Spacing.sm,
    lineHeight: 17, // 12 * 1.4 - valor absoluto en px
  },
  stepTitle: {
    ...Typography.styles.h2,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
    lineHeight: 36, // 30 * 1.2 - valor absoluto en px
  },
  stepContext: {
    ...Typography.styles.bodySmall,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
    lineHeight: 21, // 14 * 1.5 - valor absoluto en px
  },
  stepSubtitle: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    marginBottom: Spacing.lg,
    lineHeight: 24, // 16 * 1.5 - valor absoluto en px
  },
  optionsContainer: {
    gap: Spacing.sm,
  },
  visualOptionsContainer: {
    gap: Spacing.md,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    width: '100%', // 🔧 evita que chips se monten
  },
  inputContainer: {
    marginTop: Spacing.md,
  },
  // Visual step styles (pasos 1 y 2)
  visualStepContainer: {
    paddingVertical: Spacing.xl,
  },
  visualStepHeader: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  visualStepTitle: {
    fontSize: 28,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    lineHeight: 36,
  },
  highlightText: {
    color: Colors.base.primary,
  },
  circleSelectorWrapper: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  errorText: {
    ...Typography.styles.bodySmall,
    color: Colors.error,
    textAlign: 'center',
    marginTop: Spacing.md,
    lineHeight: 21, // 14 * 1.5 - valor absoluto en px
  },
});

