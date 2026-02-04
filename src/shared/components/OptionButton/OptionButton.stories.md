# OptionButton

Botón grande estilo selección para opciones del wizard.

## Props

- `label: string` - Texto principal del botón
- `subtitle?: string` - Subtítulo opcional
- `selected?: boolean` - Estado seleccionado (default: false)
- `disabled?: boolean` - Estado deshabilitado (default: false)
- `onPress: () => void` - Callback al presionar
- `leftIcon?: ReactNode` - Icono izquierdo opcional
- `rightIcon?: 'check'|'arrow'|ReactNode` - Icono derecho (string o ReactNode)

## Ejemplo de uso

```tsx
import { OptionButton } from '@/shared/components';

<OptionButton
  label="Amigable y empática"
  subtitle="Personalidad cálida"
  selected={true}
  onPress={() => {}}
  rightIcon="check"
/>
```

