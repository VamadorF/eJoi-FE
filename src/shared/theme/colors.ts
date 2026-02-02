/**
 * Paleta de colores basada en el diseño del diseñador web
 * Colores extraídos de Textos-colores.pdf
 */

export const Colors = {
  // Colores base principales
  base: {
    primary: '#f20a64', // Color base 1 - rosa/magenta principal
    secondary: '#bab0ed', // Color base 2 - morado claro
  },
  
  // Colores auxiliares
  auxiliary: {
    primary: '#f7bfd8', // Color auxiliar 1 - rosa claro
    secondary: '#d4d0f7', // Color auxiliar 2 - morado claro
  },
  
  // Colores para textos
  text: {
    primary: '#3c3c3b', // Color letras 2 - gris oscuro para contenido principal
    secondary: '#6f6f6e', // Color letras 1 - gris medio para texto secundario
    light: '#AAB8C2', // Gris claro para texto deshabilitado
    white: '#FFFFFF',
    link: '#f20a64', // Usar color base 1 para links
  },
  
  // Colores principales (mapeados desde base para compatibilidad)
  primary: {
    main: '#f20a64', // Color base 1
    dark: '#d00954', // Versión más oscura del rosa principal
    light: '#f7bfd8', // Color auxiliar 1
  },
  
  // Fondos
  background: {
    white: '#FFFFFF',
    light: '#F5F5F5',
    gray: '#F9F9F9',
    gradient: ['#f20a64', '#bab0ed'], // Gradiente usando colores base
  },
  
  // Bordes
  border: {
    light: '#E1E8ED', // Gris claro para bordes sutiles
    medium: '#CCD6DD',
    dark: '#6f6f6e', // Color letras 1 para bordes más visibles
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

