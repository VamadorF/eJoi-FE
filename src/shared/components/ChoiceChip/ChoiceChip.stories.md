# ChoiceChip

Chip seleccionable que soporta multi-select.

## Props

- `label: string` - Texto del chip
- `selected: boolean` - Estado seleccionado
- `onPress: () => void` - Callback al presionar
- `size?: 'sm'|'md'` - Tamaño del chip (default: 'md')

## Ejemplo de uso

```tsx
import { ChoiceChip } from '@/shared/components';

<ChoiceChip
  label="Tecnología"
  selected={true}
  onPress={() => {}}
  size="md"
/>
```

