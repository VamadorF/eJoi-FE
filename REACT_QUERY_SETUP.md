# React Query — Integración en eJoi-FE

## Resumen

Se integró `@tanstack/react-query` (TanStack Query v5) en el proyecto para manejar el **estado del servidor** (datos de API, cache, loading, error) de forma declarativa mediante hooks, separándolo del **estado del cliente** que sigue manejando Zustand (tokens, UI, isAuthenticated).

---

## Dependencia instalada

```bash
npm install @tanstack/react-query
```

---

## Arquitectura

### Flujo de datos

```
Componente → Hook React Query → Función API (api/*.api.ts) → httpClient (fetch) → Backend NestJS
                ↕
          React Query Cache
```

### Coexistencia Zustand + React Query

| Responsabilidad | Herramienta |
|---|---|
| Tokens, isAuthenticated, UI state | **Zustand** (stores) |
| Datos del servidor, cache, loading/error de API | **React Query** (hooks) |

---

## Estructura por feature

Cada feature sigue este patrón:

```
features/
  [feature]/
    api/
      [feature].api.ts          ← Funciones puras que llaman al httpClient
    hooks/
      use[Feature].ts           ← Hook query (GET)
      useCreate[Feature].ts     ← Hook mutation (POST/PUT/DELETE)
    types.ts
```

---

## Archivos creados / modificados

### 1. QueryProvider (modificado)

**Archivo:** `src/app/providers/QueryProvider.tsx`

Antes era un placeholder que solo retornaba `children`. Ahora configura el `QueryClient` real con opciones optimizadas para mobile:

- `staleTime: 5 minutos` — evita refetch innecesarios en mobile
- `retry: 1` — un solo reintento en queries
- `refetchOnWindowFocus: false` — no aplica en React Native
- `refetchOnReconnect: true` — refresca al recuperar conexión

Ya estaba conectado en `src/app/index.tsx`, no hubo que modificar el árbol de providers.

### 2. Query Keys centralizadas (nuevo)

**Archivo:** `src/shared/lib/queryKeys.ts`

Constantes tipadas para evitar strings mágicos en las query keys:

```typescript
import { queryKeys } from '@/shared/lib/queryKeys';

// Uso en hooks:
queryKey: queryKeys.auth.currentUser           // ['auth', 'currentUser']
queryKey: queryKeys.companion.detail(id)       // ['companion', id]
queryKey: queryKeys.chat.messages(roomId)      // ['chat', 'messages', roomId]
queryKey: queryKeys.onboarding.data            // ['onboarding']
```

### 3. Archivos API movidos de `services/` a `api/`

Los archivos `.api.ts` se movieron para alinear con la convención feature-based:

| Antes | Después |
|---|---|
| `features/auth/services/auth.api.ts` | `features/auth/api/auth.api.ts` |
| `features/chat/services/chat.api.ts` | `features/chat/api/chat.api.ts` |
| `features/companion/services/companion.api.ts` | `features/companion/api/companion.api.ts` |
| `features/onboarding/services/onboarding.api.ts` | `features/onboarding/api/onboarding.api.ts` |

> Los archivos que NO son API (`auth.providers.ts`, `chat.socket.ts`) permanecen en `services/`.

### 4. Hooks React Query por feature (nuevos)

#### Auth

| Hook | Archivo | Tipo | Descripción |
|---|---|---|---|
| `useCurrentUser` | `hooks/useCurrentUser.ts` | Query | GET `/auth/me` — obtiene usuario actual |
| `useLoginWithGoogle` | `hooks/useAuthMutations.ts` | Mutation | POST `/auth/google` — invalida `currentUser` |
| `useLoginWithApple` | `hooks/useAuthMutations.ts` | Mutation | POST `/auth/apple` — invalida `currentUser` |
| `useLogout` | `hooks/useAuthMutations.ts` | Mutation | POST `/auth/logout` — limpia toda la cache |

#### Companion

| Hook | Archivo | Tipo | Descripción |
|---|---|---|---|
| `useCompanion(id)` | `hooks/useCompanion.ts` | Query | GET `/companion/:id` — `enabled: !!id` |
| `useCreateCompanion` | `hooks/useCreateCompanion.ts` | Mutation | POST `/companion` — invalida lista |
| `useUpdateCompanion` | `hooks/useUpdateCompanion.ts` | Mutation | PUT `/companion/:id` — invalida detalle + lista |

#### Chat

| Hook | Archivo | Tipo | Descripción |
|---|---|---|---|
| `useChatRooms` | `hooks/useChatRooms.ts` | Query | GET `/chat/rooms` |
| `useChatMessages(roomId)` | `hooks/useChatMessages.ts` | Query | GET `/chat/rooms/:roomId/messages` — `enabled: !!roomId` |
| `useSendMessage` | `hooks/useSendMessage.ts` | Mutation | POST mensaje — invalida mensajes + rooms |

#### Onboarding

| Hook | Archivo | Tipo | Descripción |
|---|---|---|---|
| `useOnboarding` | `hooks/useOnboarding.ts` | Query | GET `/onboarding` |
| `useSaveOnboarding` | `hooks/useSaveOnboarding.ts` | Mutation | POST `/onboarding` — invalida datos |

### 5. useAuth refactorizado (modificado)

**Archivo:** `src/features/auth/hooks/useAuth.ts`

Ahora combina Zustand y React Query:

- Usa `useLogout()` mutation para notificar al backend al cerrar sesión
- Usa `useCurrentUser()` query para obtener datos del usuario desde el servidor
- Combina loading/error de ambas fuentes
- Mantiene el flujo OAuth existente (`signInWithGoogle` / `signInWithApple`) sin cambios

### 6. Barrel exports actualizados (modificados)

Se actualizaron los `index.ts` de cada feature para exportar los nuevos hooks:

- `features/auth/index.ts` — añadido `useCurrentUser`, `useAuthMutations`
- `features/chat/index.ts` — añadido `useChatRooms`, `useChatMessages`, `useSendMessage`
- `features/companion/index.ts` — añadido `useCompanion`, `useCreateCompanion`, `useUpdateCompanion`
- `features/onboarding/index.ts` — añadido `useOnboarding`, `useSaveOnboarding`

---

## Ejemplos de uso

### Query (GET) — Leer datos

```typescript
import { useCompanion } from '@/features/companion';

const MiComponente = ({ companionId }: { companionId: string }) => {
  const { data, isLoading, error } = useCompanion(companionId);

  if (isLoading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return <Text>{data?.name}</Text>;
};
```

### Mutation (POST/PUT/DELETE) — Escribir datos

```typescript
import { useSendMessage } from '@/features/chat';

const ChatInput = ({ roomId }: { roomId: string }) => {
  const { mutate, isPending } = useSendMessage();

  const handleSend = (text: string) => {
    mutate(
      { roomId, content: text },
      {
        onSuccess: () => console.log('Mensaje enviado'),
        onError: (err) => console.error('Error:', err),
      }
    );
  };

  return (
    <Button
      title={isPending ? 'Enviando...' : 'Enviar'}
      onPress={() => handleSend('Hola!')}
      disabled={isPending}
    />
  );
};
```

### Invalidación de cache

Las mutations ya invalidan automáticamente las queries relacionadas via `onSuccess`. Si necesitas invalidar manualmente:

```typescript
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/shared/lib/queryKeys';

const queryClient = useQueryClient();
queryClient.invalidateQueries({ queryKey: queryKeys.chat.rooms });
```

---

## Notas

- Todas las funciones en `api/*.api.ts` son **placeholders** que lanzan errores. Se deben descomentar las llamadas reales al `httpClient` cuando el backend NestJS esté disponible.
- El `httpClient` existente (`src/shared/services/http/client.ts`) basado en `fetch` se mantiene — no se introdujo axios.
- Los hooks de React Query **NO** deben contener lógica de fetch directa. Siempre delegan a las funciones en `api/`.

