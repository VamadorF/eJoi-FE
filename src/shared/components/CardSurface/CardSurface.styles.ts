import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Spacing } from '@/shared/theme/spacing';

export const getCardStyles = (variant: 'glass' | 'solid', padding: number, radius: number) => {
  const baseStyles = {
    borderRadius: radius,
    padding,
    backgroundColor: variant === 'glass' ? 'rgba(255, 255, 255, 0.9)' : Colors.background.white,
    borderWidth: variant === 'glass' ? 1 : 0,
    borderColor: variant === 'glass' ? Colors.border.light : 'transparent',
  };

  const shadowStyles = Platform.select({
    ios: {
      shadowColor: Colors.text.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    android: {
      elevation: 4,
    },
    web: {
      boxShadow: '0px 2px 8px rgba(60, 60, 59, 0.1)',
    },
  });

  return StyleSheet.create({
    card: {
      ...baseStyles,
      ...shadowStyles,
    },
  });
};

