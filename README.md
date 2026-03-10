# eJoi Frontend

Aplicación frontend de eJoi desarrollada con React Native, Expo y TypeScript.

## Estado actual

- Autenticación con Google y Apple activa, más soporte para login local.
- Verificación de sesión integrada contra backend.
- Flujo de onboarding y creación de companion implementado en UI.
- Chat conectado parcialmente a backend (`history` y `message`), con partes de UI todavía en transición.
- Paywall/suscripción con compras in-app (expo-iap): listeners, acknowledge obligatorio en Android, envío de purchaseToken al backend.

## Stack principal

- React Native `0.74`
- Expo `51`
- TypeScript `5`
- React Navigation `6`
- Zustand `4`
- TanStack React Query `5`
- Expo Secure Store
- Expo WebBrowser / Apple Authentication

## Estructura del proyecto

```text
src/
  app/                      # bootstrap, providers y navegación
    config/
    navigation/
    providers/

  features/                 # módulos por dominio
    auth/
    onboarding/
    companion/
    chat/
    main/
    subscription/

  shared/                   # componentes, servicios y utilidades compartidas
    components/
    hooks/
    services/
    theme/
    types/
    utils/
```

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/VamadorF/eJoi-FE.git
cd eJoi-FE
```

2. Instala dependencias:

```bash
npm install
```

3. Copia `.env.example` a `.env` y configura las variables:

```bash
cp .env.example .env
```

Edita `.env` y define al menos:

```env
EXPO_PUBLIC_API_URL=http://localhost:4000
EXPO_PUBLIC_SOCKET_URL=ws://localhost:3001
EXPO_PUBLIC_GOOGLE_CLIENT_ID=tu_google_client_id
```

4. Levanta la app:

```bash
npm start
```

## Scripts

- `npm start` - inicia Expo
- `npm run web` - ejecuta en web
- `npm run android` - ejecuta en Android
- `npm run ios` - ejecuta en iOS

## Endpoints backend usados por el frontend

### Auth

- `POST /auth/login`
- `POST /auth/google`
- `POST /auth/apple`
- `GET /auth` (validación de sesión)
- `POST /auth/provider` (compatibilidad legacy)

### Chat

- `GET /chat/history?companionId=...&limit=...`
- `POST /chat/message`

### Companion

- `GET /companion/me`
- `POST /companion/me`
- `PUT /companion/me`

### Onboarding

- Definido en frontend, pero la integración backend sigue pendiente en esta rama.

### Subscription (compras in-app)

- `POST /subscription/validate` — Recibe `{ purchaseToken, productId, transactionId?, platform, packageName? }`. El backend debe validar contra Google Play Developer API (Android) o App Store (iOS), registrar la orden y responder `{ success: boolean }`. Implementar idempotencia por `purchaseToken` (unique constraint).

## Compras in-app (IAP)

Las compras usan **expo-iap** y requieren un **development build** (no Expo Go):

```bash
npx expo prebuild --clean
eas build --platform android --profile development
```

Configura los product IDs en `src/features/subscription/config/subscriptionProducts.ts` según Google Play Console y App Store Connect.

## Notas

- `SocketProvider` está preparado, pero todavía en modo placeholder.
- Hay hooks React Query en varios dominios; no todo el flujo de UI ya consume esos hooks.

## Licencia

Proyecto privado.


