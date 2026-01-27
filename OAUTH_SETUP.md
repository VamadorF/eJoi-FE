# Configuración de OAuth

## Flujo de Autenticación

La aplicación usa `WebBrowser.openAuthSessionAsync()` para manejar la autenticación OAuth:

1. **Backend genera la URL de OAuth** (Google/Apple)
2. **Se abre una sesión de autenticación** con `WebBrowser.openAuthSessionAsync()`
3. **El usuario autentica en el navegador** del sistema
4. **El proveedor redirige** a `ejoi://` con un código
5. **Se extrae el código** y se intercambia por un token en el backend

## Configuración del Backend

El backend debe implementar los siguientes endpoints:

### Google OAuth

1. **GET `/auth/google/url`**
   - Genera y retorna la URL de OAuth de Google
   - Response: `{ authUrl: string }`
   - Ejemplo: `{ authUrl: "https://accounts.google.com/o/oauth2/v2/auth?client_id=..." }`

2. **POST `/auth/google/callback`**
   - Intercambia el código de autorización por un token
   - Body: `{ code: string }`
   - Response: `{ user: User, tokens: { accessToken: string, refreshToken: string } }`

### Apple OAuth

1. **GET `/auth/apple/url`**
   - Genera y retorna la URL de OAuth de Apple
   - Response: `{ authUrl: string }`

2. **POST `/auth/apple/callback`**
   - Intercambia el código de autorización por un token
   - Body: `{ code: string }`
   - Response: `{ user: User, tokens: { accessToken: string, refreshToken: string } }`

### Deep Link de Redirección

El backend debe configurar la URL de redirección como: `ejoi://` o `ejoi://callback`

El código de autorización se enviará como parámetro: `ejoi://?code=XXX` o `ejoi://callback?code=XXX`

## Configuración del Frontend

1. **Crea un archivo `.env` en la raíz del proyecto** (junto a `package.json`)

2. **Agrega la URL del backend**:

```env
# URL del Backend API
EXPO_PUBLIC_API_URL=http://localhost:3000

# Socket.io URL (opcional)
EXPO_PUBLIC_SOCKET_URL=ws://localhost:3001
```

3. **Reinicia el servidor de desarrollo** después de crear/modificar el archivo `.env`

## Obtener Credenciales OAuth

### Google OAuth

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a **APIs & Services** > **Credentials**
4. Haz clic en **Create Credentials** > **OAuth client ID**
5. Configura:
   - Application type: **Web application**
   - Name: eJoi App
   - Authorized redirect URIs: `ejoi://` y `ejoi://callback`
6. Configura estas credenciales en tu backend NestJS

### Apple OAuth

1. Ve a [Apple Developer Portal](https://developer.apple.com/account/)
2. Ve a **Certificates, Identifiers & Profiles**
3. Crea un nuevo **Services ID**
4. Configura los **Return URLs**: `ejoi://` y `ejoi://callback`
5. Configura estas credenciales en tu backend NestJS

## Notas

- El archivo `.env` está en `.gitignore` y no se subirá al repositorio
- Las variables deben empezar con `EXPO_PUBLIC_` para que Expo las reconozca
- Reinicia el servidor después de cambiar las variables de entorno
- El scheme `ejoi://` está configurado en `app.json`
- Para iOS, Apple usa `expo-apple-authentication` nativo (no requiere backend para generar URL)

## Ejemplo de Implementación Backend (NestJS)

```typescript
// auth.controller.ts
@Get('google/url')
async getGoogleAuthUrl() {
  const authUrl = this.authService.generateGoogleAuthUrl();
  return { authUrl };
}

@Post('google/callback')
async googleCallback(@Body() { code }: { code: string }) {
  const tokens = await this.authService.exchangeGoogleCode(code);
  const user = await this.authService.getOrCreateUser(tokens);
  return {
    user,
    tokens: {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    },
  };
}
```
