/**
 * Utilidad para textos con género dinámico
 * Transforma textos según el género del compañero seleccionado
 */

import { Gender } from '@/features/onboarding/types';

export type GenderKey = Gender | '';

/**
 * Diccionario de términos con variaciones de género
 */
const GENDERED_TERMS: Record<string, { femenino: string; masculino: string }> = {
  'compañer@': { femenino: 'compañera', masculino: 'compañero' },
  'compañero/a': { femenino: 'compañera', masculino: 'compañero' },
  'list@': { femenino: 'lista', masculino: 'listo' },
  'listo/a': { femenino: 'lista', masculino: 'listo' },
  'un/a': { femenino: 'una', masculino: 'un' },
  'el/la': { femenino: 'la', masculino: 'el' },
  'tu': { femenino: 'tu', masculino: 'tu' },
  'virtual': { femenino: 'virtual', masculino: 'virtual' },
};

/**
 * Reemplaza términos con @ o / por su variación de género
 * @param text - Texto con términos neutros (ej: "tu compañer@")
 * @param gender - Género seleccionado ('femenino' | 'masculino' | '')
 * @returns Texto con género aplicado
 */
export const applyGender = (text: string, gender: GenderKey): string => {
  if (!gender) return text;
  
  let result = text;
  
  Object.entries(GENDERED_TERMS).forEach(([term, variants]) => {
    const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    result = result.replace(regex, variants[gender]);
  });
  
  return result;
};

/**
 * Genera el artículo correcto según el género
 * @param gender - Género del compañero
 * @param type - Tipo de artículo ('el' | 'un')
 */
export const getArticle = (gender: GenderKey, type: 'el' | 'un' = 'el'): string => {
  if (!gender) return type === 'el' ? 'el/la' : 'un/a';
  return type === 'el' 
    ? (gender === 'femenino' ? 'la' : 'el')
    : (gender === 'femenino' ? 'una' : 'un');
};

/**
 * Genera "compañero" o "compañera" según el género
 */
export const getCompanionWord = (gender: GenderKey): string => {
  if (!gender) return 'compañer@';
  return gender === 'femenino' ? 'compañera' : 'compañero';
};

/**
 * Genera sufijo de género para adjetivos (-o/-a)
 */
export const getGenderSuffix = (gender: GenderKey): string => {
  if (!gender) return '@';
  return gender === 'femenino' ? 'a' : 'o';
};

/**
 * Hook helper para crear textos con género
 * Retorna un objeto con funciones útiles para generar texto
 */
export const createGenderedTextHelper = (gender: GenderKey) => ({
  /** Aplica género a un texto con términos neutros */
  t: (text: string) => applyGender(text, gender),
  
  /** Obtiene el artículo correcto */
  article: (type: 'el' | 'un' = 'el') => getArticle(gender, type),
  
  /** Obtiene "compañero" o "compañera" */
  companion: () => getCompanionWord(gender),
  
  /** Obtiene el sufijo de género */
  suffix: () => getGenderSuffix(gender),
  
  /** El género actual */
  gender,
  
  /** Si hay un género seleccionado */
  hasGender: !!gender,
});

