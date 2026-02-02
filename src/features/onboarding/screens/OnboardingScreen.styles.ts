import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Spacing } from '@/shared/theme/spacing';
import { Typography } from '@/shared/theme/typography';

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
    lineHeight: Typography.styles.h2.fontSize * Typography.lineHeight.tight,
  },
  subtitle: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    textAlign: 'left',
    lineHeight: Typography.styles.body.fontSize * Typography.lineHeight.normal,
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
    lineHeight: Typography.styles.bodySmall.fontSize * Typography.lineHeight.normal,
  },
  footer: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    width: '100%',
  },
});

