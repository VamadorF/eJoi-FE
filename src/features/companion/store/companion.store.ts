/**
 * Store de companion con Zustand
 * Manejo del estado global del/la compañer@ del usuario
 */

import { create } from 'zustand';
import { Companion } from '../types';
import { getAuthToken, getCompanionData, setCompanionData, removeCompanionData } from '@/shared/services/storage/secure';

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
    
    // Persistir en almacenamiento local
    if (companion) {
      try {
        await setCompanionData(JSON.stringify(companion));
      } catch (error) {
        console.error('Error saving companion to storage:', error);
      }
    } else {
      try {
        await removeCompanionData();
      } catch (error) {
        console.error('Error removing companion from storage:', error);
      }
    }
  },

  checkCompanion: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const token = await getAuthToken();
      
      if (!token) {
        // Si no hay token, no hay compañer@
        set({
          companion: null,
          hasCompanion: false,
          isLoading: false,
        });
        return;
      }

      // Primero verificar en almacenamiento local
      const storedCompanionData = await getCompanionData();
      if (storedCompanionData) {
        try {
          const companion: Companion = JSON.parse(storedCompanionData);
          set({
            companion,
            hasCompanion: true,
            isLoading: false,
          });
          return;
        } catch (parseError) {
          console.error('Error parsing stored companion:', parseError);
          // Continuar para intentar obtener desde API
        }
      }

      // TODO: Llamar a API para verificar si tiene compañer@
      // const response = await fetch(`${API_URL}/companion`, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // if (response.ok) {
      //   const companion = await response.json();
      //   get().setCompanion(companion);
      //   set({ hasCompanion: true, isLoading: false });
      //   return;
      // }
      
      // Si no hay compañer@ en almacenamiento ni en API
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

