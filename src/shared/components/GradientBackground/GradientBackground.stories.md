# GradientBackground

Componente de fondo estándar de eJoi con degradado y overlay opcional.

## Props

- `variant: 'auth'|'wizard'|'creating'|'ready'|'chat'` - Variante del gradiente
- `children: ReactNode` - Contenido a renderizar
- `overlayImage?: ImageSourcePropType` - Imagen de overlay opcional
- `overlayOpacity?: number` - Opacidad del overlay (default: 0.15)
- `blur?: number` - Intensidad de blur (web fallback: opacity)
- `safeArea?: boolean` - Aplicar SafeArea (default: false)

## Ejemplo de uso

```tsx
import { GradientBackground } from '@/shared/components';

<GradientBackground variant="wizard" overlayImage={require('@/public/IMG/eJoi_INTERFAZ-12.png')}>
  <Text>Contenido</Text>
</GradientBackground>
```

