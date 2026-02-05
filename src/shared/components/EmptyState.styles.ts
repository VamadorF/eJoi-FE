import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Spacing } from '@/shared/theme/spacing';
import { Typography } from '@/shared/theme/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  iconContainer: {
    marginBottom: Spacing.lg,
  },
  iconText: {
    fontSize: 64,
    lineHeight: 72, // 64 * 1.12 para emojis
  },
  title: {
    ...Typography.styles.h3,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.white,
    textAlign: 'center',
    marginBottom: Spacing.sm,
    lineHeight: Math.round((Typography.styles.h3?.fontSize ?? 24) * 1.15),
  },
  message: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.white,
    opacity: 0.9,
    textAlign: 'center',
    lineHeight: Math.round((Typography.styles.body?.fontSize ?? 16) * 1.25),
  },
});

