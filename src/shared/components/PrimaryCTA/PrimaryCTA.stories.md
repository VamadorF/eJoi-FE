# PrimaryCTA

Botón principal fijo en la parte inferior de la pantalla.

## Props

- `label: string` - Texto del botón
- `onPress: () => void` - Callback al presionar
- `disabled?: boolean` - Estado deshabilitado (default: false)
- `loading?: boolean` - Estado de carga (default: false)

## Ejemplo de uso

```tsx
import { PrimaryCTA } from '@/shared/components';

<PrimaryCTA
  label="Continuar"
  onPress={() => {}}
  loading={false}
/>
```

