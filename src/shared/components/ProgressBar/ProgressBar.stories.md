# ProgressBar

Barra de progreso minimalista con animación suave.

## Props

- `value: number` - Valor de progreso entre 0 y 1
- `height?: number` - Altura de la barra (default: 4)
- `trackOpacity?: number` - Opacidad del track (default: 1)

## Ejemplo de uso

```tsx
import { ProgressBar } from '@/shared/components';

<ProgressBar value={0.5} height={4} />
```

