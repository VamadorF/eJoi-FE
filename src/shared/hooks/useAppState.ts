import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

/**
 * Hook para monitorear el estado de la aplicación (foreground/background)
 * @param callback - Callback que se ejecuta cuando cambia el estado
 */
export const useAppState = (callback: (state: AppStateStatus) => void) => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App ha vuelto al foreground
        callback('active');
      } else if (
        appState.current === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        // App ha ido al background
        callback('background');
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [callback]);
};

