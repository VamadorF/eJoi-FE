import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@/shared/theme/colors';

export const getProgressBarStyles = (height: number, trackOpacity: number) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      height,
      backgroundColor: Colors.auxiliary.primary,
      borderRadius: height / 2,
      overflow: 'hidden',
      opacity: trackOpacity,
    },
    fill: {
      height: '100%',
      backgroundColor: Colors.base.primary,
      borderRadius: height / 2,
      ...Platform.select({
        web: {
          transformOrigin: 'left',
        },
      }),
    },
  });
};

