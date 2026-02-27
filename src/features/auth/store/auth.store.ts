/**
 * Store de autenticación con Zustand
 * Manejo del estado global de autenticación
 */

import { create } from 'zustand';
import { User, AuthState } from '../types';
import { setAuthToken, getAuthToken, clearAuthData } from '@/shared/services/storage/secure';
import { getAuthSession } from '../api/auth.api';

// #region agent log
fetch('http://127.0.0.1:7658/ingest/39857839-993a-4106-aeaf-5c248ccc31b2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'eaafaf'},body:JSON.stringify({sessionId:'eaafaf',runId:'cycle-dbg-1',hypothesisId:'H1',location:'auth.store.ts:moduleInit',message:'auth store module initialized',data:{hasGetAuthSession:Boolean(getAuthSession)},timestamp:Date.now()})}).catch(()=>{});
// #endregion

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void;
  login: (user: User, accessToken: string) => Promise<void>;
  logout: () => Promise<void>;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  setUser: (user) => {
    set({
      user,
      isAuthenticated: !!user,
    });
  },

  login: async (user, accessToken) => {
    try {
      await setAuthToken(accessToken);
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Error al iniciar sesión',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      await clearAuthData();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error logging out:', error);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  setLoading: (isLoading) => {
    set({ isLoading });
  },

  setError: (error) => {
    set({ error });
  },

  checkAuth: async () => {
    try {
      // #region agent log
      fetch('http://127.0.0.1:7658/ingest/39857839-993a-4106-aeaf-5c248ccc31b2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'eaafaf'},body:JSON.stringify({sessionId:'eaafaf',runId:'cycle-dbg-1',hypothesisId:'H1',location:'auth.store.ts:checkAuth:entry',message:'checkAuth called',data:{hasGetAuthSession:Boolean(getAuthSession)},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      const token = await getAuthToken();

      if (!token) {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
        return;
      }

      const session = await getAuthSession();
      // #region agent log
      fetch('http://127.0.0.1:7658/ingest/39857839-993a-4106-aeaf-5c248ccc31b2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'eaafaf'},body:JSON.stringify({sessionId:'eaafaf',runId:'cycle-dbg-1',hypothesisId:'H1',location:'auth.store.ts:checkAuth:sessionResponse',message:'checkAuth received session',data:{isAuthenticated:Boolean(session?.isAuthenticated),hasUser:Boolean(session?.user)},timestamp:Date.now()})}).catch(()=>{});
      // #endregion

      if (session.isAuthenticated) {
        set({
          user: session.user ?? null,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        await clearAuthData();
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      await clearAuthData();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error al verificar autenticación',
      });
    }
  },
}));
