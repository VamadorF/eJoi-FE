import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Spacing } from '@/shared/theme/spacing';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export const getContentContainerStyles = (maxWidth: number, centered: boolean) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      paddingHorizontal: Spacing.screen.paddingHorizontal,
      ...(isWeb && centered && {
        maxWidth,
        alignSelf: 'center',
      }),
    },
  });
};

