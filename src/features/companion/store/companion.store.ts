/**
 * Store de companion con Zustand
 * Manejo del estado global del/la compañer@ del usuario
 */

import { create } from 'zustand';
import { Companion } from '../types';
import { removeCompanionData } from '@/shared/services/storage/secure';
import { isValidUuid } from '@/shared/utils/uuid';
import { getMyCompanion } from '../api/companion.api';

interface CompanionStore {
  // State
  companion: Companion | null;
  isLoading: boolean;
  error: string | null;
  hasCompanion: boolean;

  // Actions
  setCompanion: (companion: Companion | null) => Promise<void>;
  checkCompanion: () => Promise<void>;
  clearCompanion: () => Promise<void>;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCompanionStore = create<CompanionStore>((set, get) => ({
  // Initial state
  companion: null,
  isLoading: false,
  error: null,
  hasCompanion: false,

  // Actions
  setCompanion: async (companion) => {
    set({
      companion,
      hasCompanion: !!companion,
    });
    // No persistimos companion en storage: la fuente de verdad es la API.
    // Si el usuario es eliminado de la BD, al recargar obtendremos 401 o vacío.
  },

  checkCompanion: async () => {
    try {
      set({ isLoading: true, error: null });

      // Siempre obtener companion desde la API (no usar cache local).
      // Si el usuario fue eliminado de la BD, la API devolverá 401 o vacío.
      try {
        const companion = await getMyCompanion();
        if (companion && isValidUuid(companion.id)) {
          await get().setCompanion(companion);
          set({ isLoading: false });
          return;
        }
      } catch (apiError) {
        console.error('Error fetching companion from API:', apiError);
      }

      set({
        companion: null,
        hasCompanion: false,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error checking companion:', error);
      set({
        error: error instanceof Error ? error.message : 'Error al verificar compañer@',
        isLoading: false,
        hasCompanion: false,
      });
    }
  },

  clearCompanion: async () => {
    set({
      companion: null,
      hasCompanion: false,
      error: null,
    });
    try {
      await removeCompanionData();
    } catch (error) {
      console.error('Error clearing companion from storage:', error);
    }
  },

  setLoading: (isLoading) => {
    set({ isLoading });
  },

  setError: (error) => {
    set({ error });
  },
}));

