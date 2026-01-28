# Arquitectura del Proyecto eJoi Frontend

## Diagrama de Arquitectura General

```mermaid
graph TB
    subgraph Entry["Entry Point"]
        App[App.tsx]
    end
    
    subgraph Providers["Providers Layer"]
        ThemeP[ThemeProvider]
        QueryP[QueryProvider]
        SocketP[SocketProvider]
        AuthP[AuthProvider]
        NavC[NavigationContainer]
    end
    
    subgraph Navigation["Navigation Layer"]
        RootNav[RootNavigator]
        AuthNav[AuthNavigator]
        MainNav[MainTabs]
    end
    
    subgraph Features["Features Layer"]
        Auth[Auth Feature]
        Chat[Chat Feature]
        Companion[Companion Feature]
        Onboarding[Onboarding Feature]
    end
    
    subgraph Shared["Shared Layer"]
        Components[Shared Components]
        Hooks[Shared Hooks]
        Services[Shared Services]
        Theme[Theme System]
        Utils[Utils]
    end
    
    subgraph State["State Management"]
        AuthStore[Auth Store - Zustand]
    end
    
    App --> ThemeP
    ThemeP --> QueryP
    QueryP --> SocketP
    SocketP --> AuthP
    AuthP --> NavC
    NavC --> RootNav
    RootNav --> AuthNav
    RootNav --> MainNav
    AuthNav --> Auth
    MainNav --> Chat
    MainNav --> Companion
    MainNav --> Onboarding
    Auth --> AuthStore
    Auth --> Components
    Auth --> Services
    Features --> Shared
    Shared --> Theme
```

## Flujo de Inicialización de la App

```mermaid
sequenceDiagram
    participant App as App.tsx
    participant ThemeP as ThemeProvider
    participant AuthP as AuthProvider
    participant RootNav as RootNavigator
    participant AuthStore as Auth Store
    participant Storage as Secure Storage
    
    App->>ThemeP: Render
    ThemeP->>AuthP: Render
    AuthP->>AuthStore: checkAuth()
    AuthStore->>Storage: getAuthToken()
    Storage-->>AuthStore: token | null
    AuthStore->>AuthStore: Update isAuthenticated
    AuthStore-->>AuthP: State updated
    AuthP->>RootNav: Render
    RootNav->>AuthStore: Read isAuthenticated
    alt Usuario autenticado
        RootNav->>MainNav: Render MainTabs
    else Usuario no autenticado
        RootNav->>AuthNav: Render AuthNavigator
        AuthNav->>LoginScreen: Render LoginScreen
    end
```

## Flujo de Autenticación OAuth (Google/Apple)

```mermaid
sequenceDiagram
    participant User as Usuario
    participant LoginScreen as LoginScreen
    participant GoogleBtn as GoogleButton
    participant useAuth as useAuth Hook
    participant AuthProvider as auth.providers.ts
    participant Backend as Backend NestJS
    participant WebBrowser as WebBrowser
    participant AuthAPI as auth.api.ts
    participant AuthStore as Auth Store
    participant Storage as Secure Storage
    
    User->>GoogleBtn: Click "Continue with Google"
    GoogleBtn->>LoginScreen: handleGoogleLogin()
    LoginScreen->>useAuth: loginWithGoogle()
    useAuth->>useAuth: setLoading(true)
    useAuth->>AuthProvider: signInWithGoogle()
    
    AuthProvider->>AuthAPI: getGoogleAuthUrl()
    AuthAPI->>Backend: GET /auth/google/url
    Backend-->>AuthAPI: { authUrl: "https://accounts.google.com/..." }
    AuthAPI-->>AuthProvider: authUrl
    
    AuthProvider->>WebBrowser: openAuthSessionAsync(authUrl, "ejoi://")
    WebBrowser->>User: Abre navegador del sistema
    User->>WebBrowser: Autentica con Google
    WebBrowser->>WebBrowser: Redirige a ejoi://?code=XXX
    WebBrowser-->>AuthProvider: { type: "success", url: "ejoi://?code=XXX" }
    
    AuthProvider->>AuthProvider: Extrae código de URL
    AuthProvider->>AuthAPI: exchangeGoogleCode(code)
    AuthAPI->>Backend: POST /auth/google/callback { code }
    Backend->>Backend: Valida código y genera tokens
    Backend-->>AuthAPI: { user, tokens: { accessToken, refreshToken } }
    AuthAPI-->>AuthProvider: LoginResponse
    
    AuthProvider-->>useAuth: { type: "success", accessToken, user }
    useAuth->>AuthStore: login(user, accessToken, refreshToken)
    AuthStore->>Storage: setAuthToken(accessToken)
    AuthStore->>AuthStore: Update state (isAuthenticated = true)
    AuthStore-->>RootNavigator: State changed
    RootNavigator->>MainNav: Render MainTabs (usuario autenticado)
```

## Estructura de Features (Auth)

```mermaid
graph LR
    subgraph AuthFeature["Feature: Auth"]
        AuthScreen[LoginScreen.tsx]
        AuthComponents[Components]
        AuthHooks[useAuth Hook]
        AuthServices[Services]
        AuthStore[Auth Store]
        AuthTypes[Types]
    end
    
    subgraph AuthComponents["Components"]
        GoogleBtn[GoogleButton.tsx]
        AppleBtn[AppleButton.tsx]
    end
    
    subgraph AuthServices["Services"]
        AuthProviders[auth.providers.ts<br/>WebBrowser OAuth]
        AuthAPI[auth.api.ts<br/>Backend calls]
    end
    
    AuthScreen --> AuthComponents
    AuthScreen --> AuthHooks
    AuthComponents --> GoogleBtn
    AuthComponents --> AppleBtn
    AuthHooks --> AuthServices
    AuthHooks --> AuthStore
    AuthServices --> AuthProviders
    AuthServices --> AuthAPI
    AuthStore --> AuthTypes
```

## Flujo de Datos y Estado

```mermaid
graph TB
    subgraph UI["User Interface"]
        LoginScreen[LoginScreen]
        Buttons[Google/Apple Buttons]
    end
    
    subgraph Hooks["Hooks Layer"]
        useAuth[useAuth Hook]
    end
    
    subgraph Services["Services Layer"]
        AuthProviders[OAuth Providers]
        AuthAPI[API Calls]
        HTTPClient[HTTP Client]
    end
    
    subgraph State["State Management"]
        AuthStore[Zustand Store]
    end
    
    subgraph Storage["Storage"]
        SecureStore[Secure Storage<br/>expo-secure-store]
    end
    
    subgraph Backend["Backend NestJS"]
        AuthEndpoints[Auth Endpoints]
    end
    
    LoginScreen --> Buttons
    Buttons --> useAuth
    useAuth --> AuthProviders
    useAuth --> AuthStore
    AuthProviders --> AuthAPI
    AuthAPI --> HTTPClient
    HTTPClient --> AuthEndpoints
    AuthStore --> SecureStore
    AuthStore --> LoginScreen
```

## Arquitectura de Carpetas Detallada

```mermaid
graph TD
    subgraph Root["Proyecto Root"]
        App[App.tsx]
        Index[index.js]
        Config[Config Files]
    end
    
    subgraph AppDir["src/app/"]
        Nav[Navigation/]
        Providers[Providers/]
        ConfigApp[Config/]
    end
    
    subgraph FeaturesDir["src/features/"]
        Auth[auth/]
        Chat[chat/]
        Companion[companion/]
        Onboarding[onboarding/]
    end
    
    subgraph SharedDir["src/shared/"]
        Components[components/]
        Hooks[hooks/]
        Services[services/]
        Theme[theme/]
        Utils[utils/]
        Types[types/]
    end
    
    subgraph AuthDetail["auth/ Structure"]
        AuthScreens[screens/]
        AuthComps[components/]
        AuthHooks[hooks/]
        AuthServices[services/]
        AuthStore[store/]
        AuthTypes[types.ts]
    end
    
    App --> Nav
    App --> Providers
    Nav --> Auth
    Auth --> AuthScreens
    Auth --> AuthComps
    Auth --> AuthHooks
    Auth --> AuthServices
    Auth --> AuthStore
    FeaturesDir --> SharedDir
```

## Flujo de Estilos (Segregación)

```mermaid
graph LR
    subgraph Component["Component"]
        LoginScreen[LoginScreen.tsx]
    end
    
    subgraph Styles["Styles File"]
        LoginStyles[LoginScreen.styles.ts]
    end
    
    subgraph Theme["Theme System"]
        Colors[colors.ts]
        Typography[typography.ts]
        Spacing[spacing.ts]
        Textures[textures.ts]
    end
    
    LoginScreen -->|import| LoginStyles
    LoginStyles -->|import| Colors
    LoginStyles -->|import| Typography
    LoginStyles -->|import| Spacing
    LoginStyles -->|import| Textures
```

## Ciclo de Vida de la Aplicación

```mermaid
stateDiagram-v2
    [*] --> AppStart: App.tsx carga
    AppStart --> ProvidersInit: Providers se inicializan
    ProvidersInit --> AuthCheck: AuthProvider verifica auth
    AuthCheck --> Loading: checkAuth() ejecuta
    Loading --> Authenticated: Token encontrado
    Loading --> Unauthenticated: No hay token
    Authenticated --> MainTabs: Render MainTabs
    Unauthenticated --> LoginScreen: Render LoginScreen
    LoginScreen --> OAuthFlow: Usuario presiona botón
    OAuthFlow --> WebBrowser: Abre sesión OAuth
    WebBrowser --> CodeReceived: Código recibido
    CodeReceived --> TokenExchange: Intercambia código
    TokenExchange --> Authenticated: Token guardado
    MainTabs --> [*]: App en ejecución
```

## Resumen de Tecnologías y Flujos

### Stack Tecnológico
- **UI Framework**: React Native 0.74.0
- **Build Tool**: Expo ~51.0.0
- **Language**: TypeScript 5.3.0
- **Navigation**: React Navigation 6.x
- **State Management**: Zustand 4.5.0
- **OAuth**: expo-web-browser + expo-auth-session
- **Storage**: expo-secure-store (mobile) / localStorage (web)
- **Animations**: react-native-reanimated
- **Styling**: StyleSheet (segregado en archivos .styles.ts)

### Principios de Arquitectura
1. **Modularidad**: Cada feature es independiente
2. **Separación de Responsabilidades**: UI, lógica, servicios separados
3. **Segregación de Estilos**: Todos los estilos en archivos externos
4. **Reutilización**: Componentes y utilidades en `shared/`
5. **Escalabilidad**: Estructura preparada para nuevas features

### Flujos Principales
1. **Inicialización**: App → Providers → Navigation → Features
2. **Autenticación**: Button → Hook → Provider → Backend → Store → Navigation
3. **Estado**: Store (Zustand) → Components → UI Update
4. **Estilos**: Component → Styles File → Theme System

