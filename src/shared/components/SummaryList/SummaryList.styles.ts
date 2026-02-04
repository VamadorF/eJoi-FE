import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isWideScreen = SCREEN_WIDTH > 768 || Platform.OS === 'web';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  item: {
    marginBottom: Spacing.gapLg,
    ...(isWideScreen
      ? {
          flexDirection: 'row',
          alignItems: 'flex-start',
        }
      : {
          flexDirection: 'column',
        }),
  },
  label: {
    ...Typography.styles.caption,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.white,
    marginBottom: isWideScreen ? 0 : Spacing.gapSm,
    ...(isWideScreen && {
      width: '40%',
      marginRight: Spacing.gapMd,
    }),
  },
  value: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.white,
    opacity: 0.9,
    flex: 1,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
});

