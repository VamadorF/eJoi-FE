/**
 * Store de companion con Zustand
 * Manejo del estado global de la compañera del usuario
 */

import { create } from 'zustand';
import { Companion } from '../types';
import { getAuthToken } from '@/shared/services/storage/secure';

interface CompanionStore {
  // State
  companion: Companion | null;
  isLoading: boolean;
  error: string | null;
  hasCompanion: boolean;

  // Actions
  setCompanion: (companion: Companion | null) => void;
  checkCompanion: () => Promise<void>;
  clearCompanion: () => void;
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
  setCompanion: (companion) => {
    set({
      companion,
      hasCompanion: !!companion,
    });
  },

  checkCompanion: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const token = await getAuthToken();
      
      if (!token) {
        // Si no hay token, no hay compañera
        set({
          companion: null,
          hasCompanion: false,
          isLoading: false,
        });
        return;
      }

      // TODO: Llamar a API para verificar si tiene compañera
      // Por ahora, usar estado local/mock
      // const companion = await getCompanionFromAPI();
      
      // Mock: verificar en AsyncStorage si hay compañera guardada
      // Por ahora, asumimos que no tiene compañera si no hay token o no está en el store
      const currentCompanion = get().companion;
      
      if (currentCompanion) {
        set({
          hasCompanion: true,
          isLoading: false,
        });
      } else {
        // TODO: Hacer llamada real a la API
        // const response = await fetch(`${API_URL}/companion`, {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        // if (response.ok) {
        //   const companion = await response.json();
        //   get().setCompanion(companion);
        // }
        
        set({
          hasCompanion: false,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Error checking companion:', error);
      set({
        error: error instanceof Error ? error.message : 'Error al verificar compañera',
        isLoading: false,
        hasCompanion: false,
      });
    }
  },

  clearCompanion: () => {
    set({
      companion: null,
      hasCompanion: false,
      error: null,
    });
  },

  setLoading: (isLoading) => {
    set({ isLoading });
  },

  setError: (error) => {
    set({ error });
  },
}));

