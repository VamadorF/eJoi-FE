/**
 * Referencias a texturas del diseño
 * Fondo azul texturizado del diseño UX
 * Placeholders hasta recibir las imágenes definitivas
 */

export const Textures = {
  // Fondo texturizado azul (exterior del diseño)
  backgroundTextured: {
    // TODO: Reemplazar con imagen definitiva cuando esté disponible
    // Por ahora usar color sólido con posible overlay
    color: '#4A90E2', // Color base del fondo texturizado
    // image: require('@/assets/images/textured-background.png'), // Descomentar cuando esté disponible
    opacity: 1,
  },
  
  // Placeholder para texturas adicionales
  // Agregar más texturas según diseño final
} as const;

/**
 * Helper para obtener estilos de fondo texturado
 * @returns Estilos para aplicar fondo texturizado
 */
export const getTexturedBackground = () => {
  return {
    backgroundColor: Textures.backgroundTextured.color,
    // backgroundImage: Textures.backgroundTextured.image, // Descomentar cuando esté disponible
    opacity: Textures.backgroundTextured.opacity,
  };
};

