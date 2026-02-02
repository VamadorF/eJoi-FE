/**
 * Sistema de tipografía
 * Usa la fuente Apis disponible en public/Tipografia/
 * Fuentes disponibles: Light, Regular, Medium, Bold, ExtraBold, Black
 */

export const Typography = {
  // Familias de fuente Apis
  fontFamily: {
    // Fuente Apis - nombres basados en los archivos TTF
    light: 'Copia de Apis-Light',
    regular: 'Copia de Apis-Regular',
    medium: 'Copia de Apis-Medium',
    bold: 'Copia de Apis-Bold',
    extraBold: 'Copia de Apis-ExtraBold',
    black: 'Copia de Apis-Black',
    // Fallbacks
    system: 'System', // Fallback para iOS/Android antes de cargar
    systemWeb: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  
  // Tamaños de fuente
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  
  // Pesos de fuente
  fontWeight: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  
  // Alturas de línea
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
  
  // Estilos predefinidos con fuente Apis
  styles: {
    h1: {
      fontSize: 36,
      fontFamily: 'Copia de Apis-Bold',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 30,
      fontFamily: 'Copia de Apis-Bold',
      lineHeight: 1.2,
    },
    h3: {
      fontSize: 24,
      fontFamily: 'Copia de Apis-Bold',
      lineHeight: 1.3,
    },
    h4: {
      fontSize: 20,
      fontFamily: 'Copia de Apis-Medium',
      lineHeight: 1.4,
    },
    body: {
      fontSize: 16,
      fontFamily: 'Copia de Apis-Regular',
      lineHeight: 1.5,
    },
    bodySmall: {
      fontSize: 14,
      fontFamily: 'Copia de Apis-Regular',
      lineHeight: 1.5,
    },
    caption: {
      fontSize: 12,
      fontFamily: 'Copia de Apis-Regular',
      lineHeight: 1.4,
    },
    button: {
      fontSize: 16,
      fontFamily: 'Copia de Apis-Bold',
      lineHeight: 1.5,
    },
    link: {
      fontSize: 14,
      fontFamily: 'Copia de Apis-Regular',
      lineHeight: 1.5,
    },
  },
} as const;

export type TypographyKey = keyof typeof Typography.styles;

