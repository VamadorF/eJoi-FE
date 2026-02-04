# TextField

Input estándar con label, helper text y manejo de errores.

## Props

- `label: string` - Label del campo (requerido)
- `placeholder: string` - Placeholder del input
- `value: string` - Valor del input
- `onChangeText: (text: string) => void` - Callback al cambiar texto
- `multiline?: boolean` - Input multilinea (default: false)
- `error?: string` - Mensaje de error
- `helperText?: string` - Texto de ayuda
- `maxLength?: number` - Longitud máxima

## Ejemplo de uso

```tsx
import { TextField } from '@/shared/components';

<TextField
  label="Nombre"
  placeholder="Ej: Luna, Alex, Maya..."
  value={name}
  onChangeText={setName}
  maxLength={20}
  helperText="Máximo 20 caracteres"
/>
```

