# CreatingAnimation

Pantalla/animación "Creando a tu compañera" con imagen animada y mensajes rotativos.

## Props

- `image?: ImageSourcePropType` - Imagen a animar (default: eJoi_INTERFAZ-13)
- `durationMs?: number` - Duración antes de llamar onDone (default: 3000)
- `messages?: string[]` - Array de mensajes que rotan cada 1s
- `onDone?: () => void` - Callback cuando termina la animación

## Ejemplo de uso

```tsx
import { CreatingAnimation } from '@/shared/components';

<CreatingAnimation
  durationMs={5000}
  messages={['Personalizando...', 'Casi listo...', 'Finalizando...']}
  onDone={() => navigation.navigate('Ready')}
/>
```

