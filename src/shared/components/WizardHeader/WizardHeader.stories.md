# WizardHeader

Header fijo con botón atrás/cerrar y barra de progreso.

## Props

- `title?: string` - Título opcional del header
- `step: number` - Paso actual
- `total: number` - Total de pasos
- `onBack?: () => void` - Callback para botón atrás
- `onClose?: () => void` - Callback para botón cerrar
- `showClose?: boolean` - Mostrar botón cerrar (default: false)

## Ejemplo de uso

```tsx
import { WizardHeader } from '@/shared/components';

<WizardHeader
  title="Paso 1"
  step={1}
  total={7}
  onBack={() => navigation.goBack()}
  showClose={true}
  onClose={() => navigation.navigate('Home')}
/>
```

