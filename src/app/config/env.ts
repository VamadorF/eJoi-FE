/**
 * Configuración de variables de entorno
 * 
 * INSTRUCCIONES:
 * 1. Copia el archivo .env.example a .env en la raíz del proyecto
 * 2. Agrega tus credenciales OAuth en el archivo .env
 * 3. Reinicia el servidor de desarrollo
 * 
 * OAuth Credentials:
 * - Google: https://console.cloud.google.com/apis/credentials
 * - Apple: https://developer.apple.com/account/resources/identifiers/list
 */

// Variables de entorno con valores por defecto
export const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '';
export const APPLE_CLIENT_ID = process.env.EXPO_PUBLIC_APPLE_CLIENT_ID || '';
export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
export const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL || 'ws://localhost:3001';

export const IS_DEVELOPMENT = __DEV__;

// Validación de configuración
export const isOAuthConfigured = {
  google: GOOGLE_CLIENT_ID.length > 0,
  apple: APPLE_CLIENT_ID.length > 0,
};

