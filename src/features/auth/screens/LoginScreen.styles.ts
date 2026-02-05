import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Spacing } from '@/shared/theme/spacing';
import { Typography } from '@/shared/theme/typography';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.white,
  },
  
  // Sección superior con imagen
  imageSection: {
    flex: 1,
    position: 'relative',
    minHeight: Platform.OS === 'web' ? '60vh' : height * 0.6,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logoContainer: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  logo: {
    width: 120,
    height: 120,
  },
  
  // Sección inferior con botones
  bottomSection: {
    backgroundColor: Colors.background.white,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Platform.OS === 'web' ? 40 : Spacing['2xl'],
  },
  
  loginTitle: {
    fontSize: 22,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    lineHeight: 28, // 22 * 1.25
  },
  
  buttonsContainer: {
    alignItems: 'center',
    width: '100%',
  },
  
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    maxWidth: 400,
    width: '100%',
  },
  
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: Spacing.lg,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: Colors.border.light,
    backgroundColor: Colors.background.white,
    maxWidth: 180,
    gap: Spacing.sm,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      },
    }),
  },
  
  socialButtonIcon: {
    width: 22,
    height: 22,
  },
  
  socialButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.primary,
    lineHeight: 20, // 16 * 1.25
  },
  
  googleButtonText: {
    color: Colors.base.primary,
  },
  
  // Skip / Explorar sin cuenta
  skipContainer: {
    marginTop: Spacing.lg,
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  skipText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    textDecorationLine: 'underline',
    lineHeight: 18, // 14 * 1.3
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  
  // Términos
  termsContainer: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 400,
  },
  link: {
    color: Colors.base.primary,
    textDecorationLine: 'underline',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  
  // Modal / Bottom Sheet Styles
  sheetBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  sheetSafeArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    height: '88%',
    overflow: 'hidden',
    flexDirection: 'column',
  },
  sheetHeader: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sheetTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    lineHeight: 22, // 18 * 1.2
  },
  sheetCloseBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  sheetCloseText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.primary,
    lineHeight: 18, // 14 * 1.25
  },
  sheetContent: {
    flex: 1,
  },
  sheetScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  sheetParagraph: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.regular,
    textAlign: 'left',
    lineHeight: 22,
    marginBottom: 14,
    color: Colors.text.primary,
  },
  sheetBulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
    paddingRight: 10,
  },
  sheetBulletSymbol: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.regular,
    lineHeight: 22,
    marginTop: 1,
  },
  sheetBulletText: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.regular,
    flex: 1,
    lineHeight: 22,
    color: Colors.text.primary,
  },
  sheetFooter: {
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.12)',
  },
});
