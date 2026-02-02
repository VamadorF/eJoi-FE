import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Spacing } from '@/shared/theme/spacing';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: Spacing.screen.paddingHorizontal,
    paddingVertical: Spacing.md,
  },
  track: {
    height: 4,
    backgroundColor: Colors.auxiliary.primary,
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: Colors.base.primary,
    borderRadius: 2,
  },
});

