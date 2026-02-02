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
  },
  title: {
    ...Typography.styles.h3,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.white,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  message: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.white,
    opacity: 0.9,
    textAlign: 'center',
  },
});

