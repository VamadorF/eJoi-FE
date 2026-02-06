/**
 * Hook para usar textos con género dinámico basado en el companion store
 */

import { useMemo } from 'react';
import { useCompanionStore } from '@/features/companion/store/companion.store';
import { createGenderedTextHelper, GenderKey } from '@/shared/utils/genderedText';

/**
 * Hook que proporciona funciones para generar texto con género
 * basado en el género del compañero actual en el store
 */
export const useGenderedText = () => {
  const { companion } = useCompanionStore();
  const gender = (companion?.gender || '') as GenderKey;
  
  return useMemo(() => createGenderedTextHelper(gender), [gender]);
};

/**
 * Hook que proporciona funciones para generar texto con género
 * basado en un género específico (útil para onboarding donde aún no hay companion)
 */
export const useGenderedTextWithGender = (gender: GenderKey) => {
  return useMemo(() => createGenderedTextHelper(gender), [gender]);
};

