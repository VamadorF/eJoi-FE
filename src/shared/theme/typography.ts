/**
 * Sistema de tipografía
 * Incluye referencia a la fuente Amblas.ttf disponible en public/fonts/
 */

export const Typography = {
  // Familias de fuente
  fontFamily: {
    // TODO: Cargar fuente Amblas cuando esté disponible
    // Para web, usar: fontFamily: 'Amblas' después de cargar la fuente
    regular: 'System', // Fallback para iOS/Android
    regularWeb: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    // amblas: 'Amblas', // Descomentar cuando se cargue la fuente
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
  
  // Estilos predefinidos
  styles: {
    h1: {
      fontSize: 36,
      fontWeight: '700' as const,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 30,
      fontWeight: '700' as const,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 1.4,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 1.5,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 1.4,
    },
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 1.5,
    },
    link: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 1.5,
    },
  },
} as const;

export type TypographyKey = keyof typeof Typography.styles;

