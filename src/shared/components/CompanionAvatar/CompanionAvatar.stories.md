# CompanionAvatar

Avatar circular con fallback a inicial.

## Props

- `name: string` - Nombre para fallback de inicial
- `uri?: string` - URI de la imagen del avatar
- `size?: number` - Tamaño del avatar (default: 150)
- `glow?: boolean` - Aplicar efecto glow (default: false)

## Ejemplo de uso

```tsx
import { CompanionAvatar } from '@/shared/components';

<CompanionAvatar
  name="Luna"
  uri="https://example.com/avatar.jpg"
  size={150}
  glow={true}
/>
```

