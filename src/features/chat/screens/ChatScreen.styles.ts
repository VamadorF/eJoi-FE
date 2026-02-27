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
    gap: Spacing.sm,
  },
  loadingText: {
    ...Typography.styles.bodySmall,
    color: Colors.text.white,
    textAlign: 'center',
    marginVertical: Spacing.md,
  },
  messageBubble: {
    maxWidth: '85%',
    borderRadius: 16,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  messageBubbleUser: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.base.primary,
  },
  messageBubbleAssistant: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.auxiliary.primary,
  },
  messageText: {
    ...Typography.styles.body,
    color: Colors.text.primary,
  },
  messageTextUser: {
    color: Colors.text.white,
  },
  messageTime: {
    ...Typography.styles.caption,
    marginTop: Spacing.xs,
    opacity: 0.7,
    color: Colors.text.primary,
  },
  messageTimeUser: {
    color: Colors.text.white,
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
    gap: Spacing.sm,
  },
  composerRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  composerInput: {
    flex: 1,
    minHeight: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.auxiliary.primary,
    paddingHorizontal: Spacing.md,
    color: Colors.text.primary,
    backgroundColor: Colors.background.white,
  },
  composerButton: {
    minWidth: 90,
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
