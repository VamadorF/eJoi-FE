/**
 * Utilidad para textos con género dinámico
 * Transforma textos según el género del compañero seleccionado
 */

import { Gender } from '@/features/onboarding/types';

export type GenderKey = Gender | '';

/**
 * Diccionario de términos con variaciones de género
 */
const GENDERED_TERMS: Record<string, { femenino: string; masculino: string; neutro: string }> = {
  'compañer@': { femenino: 'compañera', masculino: 'compañero', neutro: 'compañere' },
  'compañero/a': { femenino: 'compañera', masculino: 'compañero', neutro: 'compañere' },
  'list@': { femenino: 'lista', masculino: 'listo', neutro: 'liste' },
  'listo/a': { femenino: 'lista', masculino: 'listo', neutro: 'liste' },
  'un/a': { femenino: 'una', masculino: 'un', neutro: 'une' },
  'el/la': { femenino: 'la', masculino: 'el', neutro: 'le' },
  'tu': { femenino: 'tu', masculino: 'tu', neutro: 'tu' },
  'virtual': { femenino: 'virtual', masculino: 'virtual', neutro: 'virtual' },
};

/**
 * Reemplaza términos con @ o / por su variación de género
 * @param text - Texto con términos neutros (ej: "tu compañer@")
 * @param gender - Género seleccionado ('femenino' | 'masculino' | 'neutro' | '')
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
  if (gender === 'neutro') return type === 'el' ? 'le' : 'une';
  return type === 'el' 
    ? (gender === 'femenino' ? 'la' : 'el')
    : (gender === 'femenino' ? 'una' : 'un');
};

/**
 * Genera "compañero" o "compañera" o "compañere" según el género
 */
export const getCompanionWord = (gender: GenderKey): string => {
  if (!gender) return 'compañer@';
  if (gender === 'neutro') return 'compañere';
  return gender === 'femenino' ? 'compañera' : 'compañero';
};

/**
 * Genera sufijo de género para adjetivos (-o/-a/-e)
 */
export const getGenderSuffix = (gender: GenderKey): string => {
  if (!gender) return '@';
  if (gender === 'neutro') return 'e';
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
  
  /** Obtiene "compañero" o "compañera" o "compañere" */
  companion: () => getCompanionWord(gender),
  
  /** Obtiene el sufijo de género */
  suffix: () => getGenderSuffix(gender),
  
  /** El género actual */
  gender,
  
  /** Si hay un género seleccionado */
  hasGender: !!gender,
});
