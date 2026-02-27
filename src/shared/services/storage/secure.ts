/**
 * Wrapper para expo-secure-store
 * Almacenamiento seguro de tokens y datos sensibles
 */

import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_data';
const COMPANION_KEY = 'companion_data';
const HOME_LAST_TAB_KEY = 'home_last_tab';

/**
 * Almacena un valor de forma segura
 * En web usa localStorage, en mobile usa SecureStore
 * @param key - Clave única
 * @param value - Valor a almacenar
 */
export const setItem = async (key: string, value: string): Promise<void> => {
  try {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  } catch (error) {
    console.error(`Error storing ${key}:`, error);
    throw error;
  }
};

/**
 * Obtiene un valor almacenado de forma segura
 * En web usa localStorage, en mobile usa SecureStore
 * @param key - Clave única
 * @returns Valor almacenado o null si no existe
 */
export const getItem = async (key: string): Promise<string | null> => {
  try {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  } catch (error) {
    console.error(`Error retrieving ${key}:`, error);
    return null;
  }
};

/**
 * Elimina un valor almacenado
 * En web usa localStorage, en mobile usa SecureStore
 * @param key - Clave única
 */
export const removeItem = async (key: string): Promise<void> => {
  try {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
    throw error;
  }
};

/**
 * Almacena el token de autenticación
 */
export const setAuthToken = async (token: string): Promise<void> => {
  return setItem(TOKEN_KEY, token);
};

/**
 * Obtiene el token de autenticación
 */
export const getAuthToken = async (): Promise<string | null> => {
  return getItem(TOKEN_KEY);
};

/**
 * Elimina el token de autenticación
 */
export const removeAuthToken = async (): Promise<void> => {
  return removeItem(TOKEN_KEY);
};

/**
 * Almacena el refresh token
 */
export const setRefreshToken = async (token: string): Promise<void> => {
  return setItem(REFRESH_TOKEN_KEY, token);
};

/**
 * Obtiene el refresh token
 */
export const getRefreshToken = async (): Promise<string | null> => {
  return getItem(REFRESH_TOKEN_KEY);
};

/**
 * Elimina el refresh token
 */
export const removeRefreshToken = async (): Promise<void> => {
  return removeItem(REFRESH_TOKEN_KEY);
};

/**
 * Almacena los datos del usuario (workaround hasta que GET /auth devuelva user)
 */
export const setUserData = async (user: string): Promise<void> => {
  return setItem(USER_KEY, user);
};

/**
 * Obtiene los datos del usuario almacenados
 */
export const getUserData = async (): Promise<string | null> => {
  return getItem(USER_KEY);
};

/**
 * Limpia todos los datos de autenticación
 */
export const clearAuthData = async (): Promise<void> => {
  await Promise.all([
    removeAuthToken(),
    removeRefreshToken(),
    removeItem(USER_KEY),
  ]);
};

/**
 * Almacena los datos del/la compañer@
 */
export const setCompanionData = async (companion: string): Promise<void> => {
  return setItem(COMPANION_KEY, companion);
};

/**
 * Obtiene los datos del/la compañer@
 */
export const getCompanionData = async (): Promise<string | null> => {
  return getItem(COMPANION_KEY);
};

/**
 * Elimina los datos del/la compañer@
 */
export const removeCompanionData = async (): Promise<void> => {
  return removeItem(COMPANION_KEY);
};

/**
 * Limpia TODOS los datos almacenados (auth, user, companion)
 * Usado por sessionManager.logout()
 */
export const clearAllStorage = async (): Promise<void> => {
  await Promise.all([
    removeItem(TOKEN_KEY),
    removeItem(REFRESH_TOKEN_KEY),
    removeItem(USER_KEY),
    removeItem(COMPANION_KEY),
  ]);
};

/**
 * Guarda el último tab activo en Home (chat | perfil | recuerdos)
 */
export const setLastHomeTab = async (tab: string): Promise<void> => {
  return setItem(HOME_LAST_TAB_KEY, tab);
};

/**
 * Obtiene el último tab activo en Home
 */
export const getLastHomeTab = async (): Promise<string | null> => {
  return getItem(HOME_LAST_TAB_KEY);
};

/**
 * Limpia solo datos de autenticación (tokens + user)
 * Preserva companion_data para re-login
 * Usado por sessionManager.logout()
 */
export const clearAuthStorage = async (): Promise<void> => {
  await Promise.all([
    removeItem(TOKEN_KEY),
    removeItem(REFRESH_TOKEN_KEY),
    removeItem(USER_KEY),
  ]);
};

