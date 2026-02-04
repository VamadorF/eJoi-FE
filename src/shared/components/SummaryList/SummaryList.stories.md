# SummaryList

Lista de resumen "Lo que elegiste" con soporte para arrays como chips.

## Props

- `items: { label: string; value: string | string[] }[]` - Items a mostrar
- `chipifyArrays?: boolean` - Render arrays como chips (default: false)

## Ejemplo de uso

```tsx
import { SummaryList } from '@/shared/components';

<SummaryList
  items={[
    { label: 'Nombre', value: 'Luna' },
    { label: 'Intereses', value: ['Tecnología', 'Arte', 'Música'] },
  ]}
  chipifyArrays={true}
/>
```

