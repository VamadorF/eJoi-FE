/**
 * Sistema de espaciado consistente
 * Basado en múltiplos de 4px para consistencia visual
 */

export const Spacing = {
  // Espaciado base (múltiplos de 4)
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,
  
  // Espaciado específico para componentes
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 8,
  },
  
  screen: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  
  card: {
    padding: 20,
    margin: 16,
    gap: 16,
  },
  
  // Márgenes según diseño (botones con márgenes específicos)
  buttonMargin: {
    horizontal: 20, // Márgenes laterales de botones según diseño
    vertical: 8, // Espaciado vertical entre botones
  },
  
  // Separadores
  separator: {
    marginVertical: 16,
  },
  
  // Gaps semánticos para espaciado sistemático
  gapSm: 8,   // Entre título/subtítulo, chips/botones
  gapMd: 16,  // Entre elementos relacionados
  gapLg: 24,  // Entre secciones
} as const;

export type SpacingKey = keyof typeof Spacing;

