import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';

export const getAvatarStyles = (size: number, glow: boolean) => {
  const glowStyles = glow
    ? Platform.select({
        ios: {
          shadowColor: Colors.base.primary,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: size / 4,
        },
        android: {
          elevation: 8,
        },
        web: {
          boxShadow: `0 0 ${size / 4}px ${Colors.base.primary}`,
        },
      })
    : {};

  return StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: size / 2,
      overflow: 'hidden',
      ...glowStyles,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    placeholder: {
      width: '100%',
      height: '100%',
      backgroundColor: Colors.auxiliary.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 4,
      borderColor: Colors.text.white,
    },
    initial: {
      ...Typography.styles.h1,
      fontFamily: Typography.fontFamily.bold,
      color: Colors.text.white,
    },
  });
};

