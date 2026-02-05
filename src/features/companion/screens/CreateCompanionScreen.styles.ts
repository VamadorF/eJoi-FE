import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Spacing } from '@/shared/theme/spacing';
import { Typography } from '@/shared/theme/typography';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const lh = (fontSize?: number, mult = 1.25) =>
  Math.round((fontSize ?? 14) * mult);

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  decorativeHand: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_HEIGHT * 0.3,
    left: -SCREEN_WIDTH * 0.1,
    bottom: 0,
    opacity: 0.05,
    zIndex: 0,
  },

  scrollView: {
    flex: 1,
  },

  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: 100, // Espacio para el botón fijo
  },

  header: {
    marginBottom: Spacing.gapLg,
    alignItems: 'flex-start',
    width: '100%',
    gap: Spacing.gapSm,
  },

  title: {
    ...Typography.styles.h1,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.white,
    textAlign: 'left',
    lineHeight: lh(Typography.styles.h1?.fontSize, 1.15),
  },

  subtitle: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.white,
    opacity: 0.9,
    textAlign: 'left',
    lineHeight: lh(Typography.styles.body?.fontSize, 1.25),
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    // 🔧 evita solape title/boton en pantallas pequeñas o títulos largos
    flexWrap: 'wrap',
    rowGap: Spacing.gapSm,
    columnGap: Spacing.gapSm,

    marginBottom: Spacing.gapMd,
    width: '100%',
  },

  cardTitle: {
    ...Typography.styles.h4,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,

    // 🔧 permite que el texto se encoja y haga wrap en row
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,

    lineHeight: lh(Typography.styles.h4?.fontSize, 1.2),
  },

  editButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    minHeight: 32,

    // 🔧 cuando el header se envuelve, el botón no queda “centrado raro”
    alignSelf: 'flex-start',
  },

  identityContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.gapSm,
    minHeight: 120,
    width: '100%',
  },

  avatarWrapper: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary.light ?? 'rgba(255,255,255,0.08)',
  },

  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  companionName: {
    ...Typography.styles.h3,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    textAlign: 'center',
    lineHeight: lh(Typography.styles.h3?.fontSize, 1.15),
  },

  personalitySection: {
    gap: Spacing.gapSm,
    width: '100%',
  },

  personalityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',

    // 🔧 clave para que el hijo con minWidth:0 funcione bien
    minWidth: 0,
  },

  personalityLabel: {
    ...Typography.styles.caption,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.secondary,

    // 🔧 label en “columna” sin empujar value
    flexBasis: 110,
    flexShrink: 1,

    lineHeight: lh(Typography.styles.caption?.fontSize, 1.2),
    marginRight: Spacing.sm,
  },

  personalityValue: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.primary,

    // 🔧 permite wrap real del texto largo
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    flexWrap: 'wrap',

    lineHeight: lh(Typography.styles.body?.fontSize, 1.25),
  },

  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: Spacing.gapSm,
    columnGap: Spacing.gapSm,
    width: '100%',
  },

  boundariesList: {
    gap: Spacing.gapSm,
    width: '100%',
  },

  boundaryItem: {
    ...Typography.styles.bodySmall,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.primary,
    lineHeight: lh(Typography.styles.bodySmall?.fontSize, 1.25),
  },

  emptyText: {
    ...Typography.styles.caption,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    fontStyle: 'italic',
    lineHeight: lh(Typography.styles.caption?.fontSize, 1.2),
  },

  footer: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    width: '100%',
  },

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
