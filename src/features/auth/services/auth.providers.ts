/**
 * Wrappers para expo-web-browser
 * Manejo de OAuth flows para Google y Apple usando WebBrowser.openAuthSessionAsync()
 * 
 * Flujo:
 * 1. Backend genera la URL de OAuth
 * 2. Se abre una sesión de autenticación con WebBrowser.openAuthSessionAsync()
 * 3. El usuario autentica en el navegador
 * 4. El proveedor redirige con un código
 * 5. Se extrae el código y se intercambia por un token en el backend
 */

import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import { GoogleAuthResult, AppleAuthResult } from '../types';
import { getGoogleAuthUrl, getAppleAuthUrl, exchangeGoogleCode, exchangeAppleCode } from './auth.api';
import { API_URL } from '@/app/config/env';

// Cierra el navegador después de la autenticación
WebBrowser.maybeCompleteAuthSession();

// Deep link scheme para la redirección
const REDIRECT_SCHEME = 'ejoi://';

/**
 * Inicia el flujo de autenticación con Google
 * 
 * Flujo:
 * 1. Obtiene la URL de OAuth del backend
 * 2. Abre WebBrowser.openAuthSessionAsync() con la URL
 * 3. Extrae el código de la URL de redirección
 * 4. Intercambia el código por un token en el backend
 * 
 * @returns Promise con el resultado de la autenticación
 */
export const signInWithGoogle = async (): Promise<GoogleAuthResult> => {
  try {
    // 1. Obtener URL de OAuth del backend
    let authUrl: string;
    try {
      authUrl = await getGoogleAuthUrl();
    } catch (error) {
      // Si el backend no está disponible, usar flujo directo como fallback
      console.warn('Backend no disponible, usando flujo OAuth directo');
      return {
        type: 'error',
        error: 'Backend no disponible. El backend debe generar la URL de OAuth.',
      };
    }

    // 2. Abrir sesión de autenticación
    const result = await WebBrowser.openAuthSessionAsync(
      authUrl,           // URL de OAuth del proveedor
      REDIRECT_SCHEME    // URL de redirección (deep link)
    );

    if (result.type === 'cancel') {
      return {
        type: 'error',
        error: 'El usuario canceló la autenticación',
      };
    }

    if (result.type === 'success' && result.url) {
      // 3. Extraer código de la URL de redirección
      // La URL viene como: ejoi://?code=XXX o ejoi://callback?code=XXX
      let code: string | null = null;
      try {
        // Intentar parsear como URL completa
        if (result.url.includes('://')) {
          const url = new URL(result.url);
          code = url.searchParams.get('code');
        } else {
          // Si no es una URL completa, buscar el parámetro code manualmente
          const match = result.url.match(/[?&]code=([^&]+)/);
          code = match ? match[1] : null;
        }
      } catch (e) {
        // Si falla el parsing, intentar extraer manualmente
        const match = result.url.match(/[?&]code=([^&]+)/);
        code = match ? match[1] : null;
      }
      
      if (!code) {
        return {
          type: 'error',
          error: 'No se pudo obtener el código de autorización de la URL: ' + result.url,
        };
      }

      // 4. Intercambiar código por token en el backend
      try {
        const loginResponse = await exchangeGoogleCode(code);
        
        return {
          type: 'success',
          accessToken: loginResponse.tokens.accessToken,
          idToken: '', // El backend maneja esto
          user: loginResponse.user,
        };
      } catch (exchangeError) {
        return {
          type: 'error',
          error: exchangeError instanceof Error ? exchangeError.message : 'Error al intercambiar código por token',
        };
      }
    }

    return {
      type: 'error',
      error: 'Error desconocido en la autenticación',
    };
  } catch (error) {
    return {
      type: 'error',
      error: error instanceof Error ? error.message : 'Error desconocido en autenticación Google',
    };
  }
};

/**
 * Inicia el flujo de autenticación con Apple
 * 
 * Flujo:
 * 1. Para iOS: usar expo-apple-authentication nativo
 * 2. Para web/Android: obtener URL del backend → abrir WebBrowser → extraer código → intercambiar por token
 * 
 * @returns Promise con el resultado de la autenticación
 */
export const signInWithApple = async (): Promise<AppleAuthResult> => {
  try {
    // Para iOS nativo, usar expo-apple-authentication
    if (Platform.OS === 'ios') {
      try {
        const AppleAuthentication = require('expo-apple-authentication');
        
        const credential = await AppleAuthentication.AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ],
        });

        return {
          type: 'success',
          identityToken: credential.identityToken || undefined,
          authorizationCode: credential.authorizationCode || undefined,
          user: {
            id: credential.user,
            email: credential.email || '',
            name: credential.fullName?.givenName || '',
          },
        };
      } catch (appleError: any) {
        if (appleError.code === 'ERR_REQUEST_CANCELED') {
          return {
            type: 'error',
            error: 'El usuario canceló la autenticación',
          };
        }
        throw appleError;
      }
    }

    // Para web y Android, usar el flujo con backend
    // 1. Obtener URL de OAuth del backend
    let authUrl: string;
    try {
      authUrl = await getAppleAuthUrl();
    } catch (error) {
      return {
        type: 'error',
        error: 'Backend no disponible. El backend debe generar la URL de OAuth.',
      };
    }

    // 2. Abrir sesión de autenticación
    const result = await WebBrowser.openAuthSessionAsync(
      authUrl,           // URL de OAuth del proveedor
      REDIRECT_SCHEME    // URL de redirección (deep link)
    );

    if (result.type === 'cancel') {
      return {
        type: 'error',
        error: 'El usuario canceló la autenticación',
      };
    }

    if (result.type === 'success' && result.url) {
      // 3. Extraer código de la URL de redirección
      // La URL viene como: ejoi://?code=XXX o ejoi://callback?code=XXX
      let code: string | null = null;
      try {
        // Intentar parsear como URL completa
        if (result.url.includes('://')) {
          const url = new URL(result.url);
          code = url.searchParams.get('code');
        } else {
          // Si no es una URL completa, buscar el parámetro code manualmente
          const match = result.url.match(/[?&]code=([^&]+)/);
          code = match ? match[1] : null;
        }
      } catch (e) {
        // Si falla el parsing, intentar extraer manualmente
        const match = result.url.match(/[?&]code=([^&]+)/);
        code = match ? match[1] : null;
      }
      
      if (!code) {
        return {
          type: 'error',
          error: 'No se pudo obtener el código de autorización de la URL: ' + result.url,
        };
      }

      // 4. Intercambiar código por token en el backend
      try {
        const loginResponse = await exchangeAppleCode(code);
        
        return {
          type: 'success',
          identityToken: '', // El backend maneja esto
          authorizationCode: code,
          accessToken: loginResponse.tokens.accessToken, // Token del backend
          user: loginResponse.user,
        };
      } catch (exchangeError) {
        return {
          type: 'error',
          error: exchangeError instanceof Error ? exchangeError.message : 'Error al intercambiar código por token',
        };
      }
    }

    return {
      type: 'error',
      error: 'Error desconocido en la autenticación',
    };
  } catch (error) {
    return {
      type: 'error',
      error: error instanceof Error ? error.message : 'Error desconocido en autenticación Apple',
    };
  }
};

