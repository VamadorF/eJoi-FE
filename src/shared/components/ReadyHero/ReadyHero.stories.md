# ReadyHero

Layout "Tu compañera está lista" sin solapamiento.

## Props

- `avatar: { name: string; uri?: string }` - Datos del avatar
- `title: string` - Título principal
- `subtitle: string` - Subtítulo
- `backgroundImage?: ImageSourcePropType` - Imagen de fondo (default: eJoi_INTERFAZ-16)
- `ctaLabel: string` - Texto del botón CTA
- `onCTA: () => void` - Callback del botón CTA

## Ejemplo de uso

```tsx
import { ReadyHero } from '@/shared/components';

<ReadyHero
  avatar={{ name: 'Luna', uri: 'https://example.com/avatar.jpg' }}
  title="¡Tu compañera está lista!"
  subtitle="Luna • Amigable y empática"
  ctaLabel="Iniciar conversación"
  onCTA={() => navigation.navigate('Chat')}
/>
```

