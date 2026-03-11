import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Spacing } from '@/shared/theme/spacing';
import { Typography } from '@/shared/theme/typography';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const isSmallPhone = SCREEN_WIDTH < 375;
const isTablet = SCREEN_WIDTH >= 768 && SCREEN_WIDTH < 1024;
const isDesktop = SCREEN_WIDTH >= 1024;

const CARD_HORIZONTAL_MARGIN = isTablet ? 64 : isSmallPhone ? 12 : 16;

const lh = (fontSize?: number, mult = 1.25) =>
  Math.round((fontSize ?? 14) * mult);

export const styles = StyleSheet.create({
  // ============ LAYOUT PRINCIPAL ============
  scrollView: {
    flex: 1,
  },

  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: CARD_HORIZONTAL_MARGIN,
    paddingTop: isTablet ? Spacing.lg : Spacing.md,
    paddingBottom: isTablet ? 120 : 100,
    alignItems: 'center',
  },

  // ============ ERROR STATE ============
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },

  errorText: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.white,
    marginBottom: Spacing.lg,
    textAlign: 'center',
    lineHeight: lh(Typography.styles.body?.fontSize, 1.25),
  },
});
