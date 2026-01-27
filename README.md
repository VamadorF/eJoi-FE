# eJoi Frontend

Aplicación frontend para eJoi desarrollada con React Native, Expo y TypeScript.

## 🚀 Características

- **React Native con Expo**: Desarrollo multiplataforma (iOS, Android, Web)
- **TypeScript**: Tipado estático para mayor robustez
- **Arquitectura Modular**: Estructura orientada a componentes por dominio
- **Autenticación OAuth**: Login con Google y Apple
- **Segregación de Estilos**: Todos los estilos en archivos externos
- **Animaciones**: Interfaz con animaciones fluidas

## 📁 Estructura del Proyecto

```
src/
  app/                      # Arranque de la app: providers, navegación, bootstrap
    navigation/
    providers/
    config/
    index.tsx

  features/                 # Features por dominio
    auth/                   # Autenticación (implementado)
    chat/                   # Chat (placeholder)
    companion/              # Companion (placeholder)
    onboarding/             # Onboarding (placeholder)

  shared/                   # Componentes y utilidades compartidas
    components/
    hooks/
    services/
    theme/
    utils/
    types/

  assets/                   # Recursos estáticos
    images/
    icons/
    fonts/
```

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/VamadorF/eJoi-FE.git
cd eJoi-FE
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno (opcional):
```bash
# Copia .env.example a .env y agrega tus credenciales
cp .env.example .env
```

4. Inicia el servidor de desarrollo:
```bash
npm start
# O para web específicamente:
npm run web
```

## 🔐 Configuración OAuth

Para configurar la autenticación OAuth, consulta el archivo [OAUTH_SETUP.md](./OAUTH_SETUP.md).

El backend debe implementar los siguientes endpoints:
- `GET /auth/google/url` - Genera URL de OAuth de Google
- `POST /auth/google/callback` - Intercambia código por token
- `GET /auth/apple/url` - Genera URL de OAuth de Apple
- `POST /auth/apple/callback` - Intercambia código por token

## 📱 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo Expo
- `npm run web` - Inicia en modo web
- `npm run android` - Inicia en Android
- `npm run ios` - Inicia en iOS

## 🎨 Características de Diseño

- **Fondo con gradiente azul**: Diseño moderno y atractivo
- **Logo grande**: 180x180 píxeles
- **Iconos**: Usando @expo/vector-icons (FontAwesome5)
- **Animaciones**: Transiciones suaves en todos los elementos

## 🔧 Tecnologías Utilizadas

- React Native 0.74.0
- Expo ~51.0.0
- TypeScript 5.3.0
- React Navigation 6.x
- Zustand 4.5.0 (State Management)
- Expo Auth Session (OAuth)
- React Native Reanimated (Animaciones)
- Expo Linear Gradient (Gradientes)

## 📝 Notas

- El proyecto está configurado para funcionar en localhost web
- Los estilos están completamente segregados en archivos `.styles.ts`
- La arquitectura está preparada para escalar con nuevas features
- Comentarios en el código indican dónde conectar con el backend

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado.

