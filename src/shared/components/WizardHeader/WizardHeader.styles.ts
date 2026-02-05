import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screen.paddingHorizontal,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    minHeight: 44,
  },
  leftButton: {
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightButton: {
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
  },
  title: {
    ...Typography.styles.h4,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.white,
    textAlign: 'center',
    lineHeight: 28, // 20 * 1.4 - valor absoluto en px
  },
  progressContainer: {
    paddingHorizontal: Spacing.screen.paddingHorizontal,
    paddingTop: Spacing.gapSm,
    paddingBottom: Spacing.gapSm,
  },
});

