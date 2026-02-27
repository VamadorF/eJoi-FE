import { Platform } from 'react-native';

/**
 * Convierte hex a rgba para boxShadow en web.
 */
function hexToRgba(hex: string, alpha: number): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return `rgba(0,0,0,${alpha})`;
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export interface ShadowProps {
  color?: string;
  offset?: { width: number; height: number };
  opacity?: number;
  radius?: number;
  elevation?: number;
}

/**
 * Devuelve estilos de sombra compatibles con web (boxShadow) y nativo (shadow*).
 * Evita el warning "shadow* style props are deprecated. Use boxShadow" en react-native-web.
 */
export function shadowStyle(props: ShadowProps = {}): Record<string, unknown> {
  const {
    color = '#000',
    offset = { width: 0, height: 4 },
    opacity = 0.15,
    radius = 12,
    elevation = 6,
  } = props;

  if (Platform.OS === 'web') {
    const rgba = hexToRgba(color, opacity);
    return { boxShadow: `${offset.width}px ${offset.height}px ${radius}px ${rgba}` };
  }
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation,
  };
}
