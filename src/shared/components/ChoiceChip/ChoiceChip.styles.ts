import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

export const getChipStyles = (size: 'sm' | 'md') => {
  const paddingVertical = size === 'sm' ? Spacing.xs : Spacing.sm;
  const paddingHorizontal = size === 'sm' ? Spacing.sm : Spacing.md;
  const fontSize = size === 'sm' ? Typography.fontSize.xs : Typography.fontSize.sm;

  return StyleSheet.create({
    chip: {
      paddingVertical,
      paddingHorizontal,
      borderRadius: 20,
      borderWidth: 1.5,
      borderColor: Colors.auxiliary.secondary,
      backgroundColor: Colors.background.white,
      marginRight: Spacing.gapSm,
      marginBottom: Spacing.gapSm,
      alignSelf: 'flex-start',
      minHeight: 44,
      minWidth: 44,
    },
    chipSelected: {
      borderColor: Colors.base.secondary,
      backgroundColor: Colors.auxiliary.secondary,
      borderWidth: 2,
      shadowColor: Colors.base.secondary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.4,
      shadowRadius: 6,
      elevation: 5,
    },
    label: {
      fontSize,
      fontFamily: Typography.fontFamily.regular,
      color: Colors.text.secondary,
      flexWrap: 'wrap',
    },
    labelSelected: {
      color: Colors.base.secondary,
      fontFamily: Typography.fontFamily.medium,
    },
  });
};

