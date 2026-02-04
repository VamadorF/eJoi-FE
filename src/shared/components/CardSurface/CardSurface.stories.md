# CardSurface

Contenedor tipo "tarjeta" para wizard y pantallas resumen.

## Props

- `children: ReactNode` - Contenido de la tarjeta
- `variant?: 'glass'|'solid'` - Variante del estilo (default: 'solid')
- `padding?: keyof Spacing` - Padding desde Spacing (default: 'md')
- `radius?: number` - Radio de borde (default: 16)

## Ejemplo de uso

```tsx
import { CardSurface } from '@/shared/components';

<CardSurface variant="glass" padding="lg">
  <Text>Contenido de la tarjeta</Text>
</CardSurface>
```

