import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.white,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    width: '100%',
    maxWidth: 500,
  },
  
  // Contenedor de la imagen
  imageWrapper: {
    position: 'relative',
    width: width * 0.85,
    maxWidth: 380,
    height: width * 0.95,
    maxHeight: 450,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  
  image: {
    width: '100%',
    height: '100%',
  },
  
  // Spinner circular sobre la imagen
  spinnerContainer: {
    position: 'absolute',
    top: '35%',
    left: '50%',
    marginLeft: -30,
    marginTop: -30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  spinnerCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: Colors.base.primary,
    borderRightColor: Colors.base.primary,
  },
  
  // Texto
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
  },
  
  title: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.regular,
    fontStyle: 'italic',
    color: Colors.text.primary,
    textAlign: 'center',
    lineHeight: 30, // 24 * 1.25
  },
  
  titleHighlight: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.regular,
    fontStyle: 'italic',
    color: Colors.base.primary,
    lineHeight: 30, // 24 * 1.25
  },
  
  // Mensajes de progreso (ocultos por defecto, se pueden mostrar opcionalmente)
  progressContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.auxiliary.secondary,
  },
  progressDotActive: {
    backgroundColor: Colors.base.primary,
  },
  
  subtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: Spacing.sm,
    lineHeight: 18, // 14 * 1.3
  },
});
