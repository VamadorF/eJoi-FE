/**
 * Wrapper para expo-secure-store
 * Almacenamiento seguro de tokens y datos sensibles
 */

import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_data';

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
 * Limpia todos los datos de autenticación
 */
export const clearAuthData = async (): Promise<void> => {
  await Promise.all([
    removeAuthToken(),
    removeRefreshToken(),
    removeItem(USER_KEY),
  ]);
};

