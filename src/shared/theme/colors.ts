/**
 * Paleta de colores basada en el diseño UX y recursos de public/
 * Colores principales extraídos del diseño: fondo azul texturizado, blanco, grises, azul brillante
 */

export const Colors = {
  // Colores principales
  primary: {
    main: '#1DA1F2', // Azul brillante para botones principales (similar a Twitter/X)
    dark: '#1a8cd8',
    light: '#4db3f5',
  },
  
  // Fondos
  background: {
    textured: '#4A90E2', // Azul texturizado del fondo exterior (placeholder, ajustar según diseño final)
    white: '#FFFFFF',
    light: '#F5F5F5',
    gray: '#F9F9F9',
  },
  
  // Textos
  text: {
    primary: '#14171A', // Gris oscuro para contenido principal
    secondary: '#657786', // Gris medio para texto secundario
    light: '#AAB8C2', // Gris claro
    link: '#1DA1F2', // Azul para links
    white: '#FFFFFF',
  },
  
  // Bordes
  border: {
    light: '#E1E8ED', // Gris claro para bordes de botones
    medium: '#CCD6DD',
    dark: '#657786',
  },
  
  // Estados
  success: '#00C853',
  error: '#F44336',
  warning: '#FF9800',
  info: '#2196F3',
  
  // Botones sociales
  social: {
    google: '#FFFFFF',
    apple: '#000000',
  },
} as const;

export type ColorKey = keyof typeof Colors;

