/**
 * Servicios de autenticaci?n con proveedores OAuth
 *
 * Flujo actual:
 * 1. El SDK del proveedor (Google/Apple) resuelve el OAuth en el cliente
 * 2. Se obtiene providerUserId, email y name del usuario
 * 3. Estos datos se envían al backend vía ProviderAuthDto
 */

import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import { GoogleAuthResult, AppleAuthResult } from '../types';
import { GOOGLE_CLIENT_ID } from '@/app/config/env';

WebBrowser.maybeCompleteAuthSession();

const REDIRECT_SCHEME = 'ejoi://';

/**
 * Inicia Google Sign-In y obtiene la informaci?n del usuario.
 * Retorna providerUserId (sub del token), email y name.
 */
export const signInWithGoogle = async (): Promise<GoogleAuthResult> => {
  try {
    const discoveryUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const redirectUri = REDIRECT_SCHEME;

    const authUrl =
      `${discoveryUrl}?` +
      `client_id=${encodeURIComponent(GOOGLE_CLIENT_ID)}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=id_token&` +
      `scope=${encodeURIComponent('openid email profile')}&` +
      `nonce=${Date.now()}`;

    const result = await WebBrowser.openAuthSessionAsync(authUrl, REDIRECT_SCHEME);

    if (result.type === 'cancel') {
      return { type: 'error', error: 'El usuario cancel? la autenticaci?n' };
    }

    if (result.type === 'success' && result.url) {
      const idToken = extractParam(result.url, 'id_token');

      if (!idToken) {
        return { type: 'error', error: 'No se pudo obtener el id_token de Google' };
      }

      const payload = decodeJwtPayload(idToken);

      return {
        type: 'success',
        idToken,
        user: {
          id: payload.sub,
          email: payload.email || '',
          name: payload.name || '',
          picture: payload.picture,
        },
      };
    }

    return { type: 'error', error: 'Error desconocido en la autenticaci?n' };
  } catch (error) {
    return {
      type: 'error',
      error: error instanceof Error ? error.message : 'Error desconocido en autenticaci?n Google',
    };
  }
};

/**
 * Inicia Apple Sign-In y obtiene la informaci?n del usuario.
 * En iOS usa expo-apple-authentication nativo.
 * En otras plataformas usa WebBrowser como fallback.
 */
export const signInWithApple = async (): Promise<AppleAuthResult> => {
  try {
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
          return { type: 'error', error: 'El usuario cancel? la autenticaci?n' };
        }
        throw appleError;
      }
    }

    // Web / Android: Apple Sign-In via WebBrowser
    // TODO: Implementar flujo Apple Sign-In web cuando sea necesario
    return {
      type: 'error',
      error: 'Apple Sign-In no disponible en esta plataforma',
    };
  } catch (error) {
    return {
      type: 'error',
      error: error instanceof Error ? error.message : 'Error desconocido en autenticaci?n Apple',
    };
  }
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function extractParam(url: string, param: string): string | null {
  // Los id_tokens vienen en el fragment (#) o en query params (?)
  const hashPart = url.split('#')[1] || '';
  const queryPart = url.split('?')[1]?.split('#')[0] || '';
  const combined = `${queryPart}&${hashPart}`;

  const match = combined.match(new RegExp(`${param}=([^&]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function decodeJwtPayload(token: string): Record<string, any> {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = atob(base64);
    return JSON.parse(jsonPayload);
  } catch {
    return {};
  }
}

// ---------------------------------------------------------------------------
// Flujo legacy via WebBrowser + backend code exchange (mantenido como referencia)
// ---------------------------------------------------------------------------
/*
import { getGoogleAuthUrl, getAppleAuthUrl, exchangeGoogleCode, exchangeAppleCode } from '../api/auth.api';

export const signInWithGoogleLegacy = async (): Promise<GoogleAuthResult> => {
  const authUrl = await getGoogleAuthUrl();
  const result = await WebBrowser.openAuthSessionAsync(authUrl, REDIRECT_SCHEME);
  if (result.type === 'success' && result.url) {
    const code = extractParam(result.url, 'code');
    if (code) {
      const loginResponse = await exchangeGoogleCode(code);
      return {
        type: 'success',
        accessToken: loginResponse.tokens.accessToken,
        user: loginResponse.user,
      };
    }
  }
  return { type: 'error', error: 'Flujo cancelado o fallido' };
};
*/
