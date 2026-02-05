import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: Spacing.xl,
  },
  header: {
    paddingHorizontal: Spacing.screen.paddingHorizontal,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.auxiliary.primary,
  },
  title: {
    ...Typography.styles.h2,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.white,
    marginBottom: Spacing.xs,
    lineHeight: 36, // 30 * 1.2 - valor absoluto en px
  },
  subtitle: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.white,
    opacity: 0.9,
    lineHeight: 24, // 16 * 1.5 - valor absoluto en px
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: Spacing.screen.paddingHorizontal,
    paddingTop: Spacing.lg,
  },
  welcomeMessage: {
    backgroundColor: Colors.auxiliary.primary,
    borderRadius: 16,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  welcomeText: {
    ...Typography.styles.h4,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.base.primary,
    marginBottom: Spacing.sm,
    lineHeight: 28, // 20 * 1.4 - valor absoluto en px
  },
  welcomeSubtext: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
    lineHeight: 28, // 16 * 1.75 - valor absoluto en px (relaxed)
  },
  inputContainer: {
    paddingHorizontal: Spacing.screen.paddingHorizontal,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.auxiliary.primary,
    backgroundColor: Colors.background.white,
    opacity: 0.1,
  },
  inputPlaceholder: {
    ...Typography.styles.bodySmall,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.white,
    opacity: 0.7,
    textAlign: 'center',
    paddingVertical: Spacing.md,
    lineHeight: 21, // 14 * 1.5 - valor absoluto en px
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.screen.paddingHorizontal,
  },
  emptyActions: {
    width: '100%',
    marginTop: Spacing.xl,
  },
  emptyButton: {
    width: '100%',
  },
});
