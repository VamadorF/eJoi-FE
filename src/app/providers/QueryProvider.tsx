import React, { ReactNode } from 'react';

/**
 * Provider para React Query
 * TODO: Implementar cuando se necesite React Query para manejo de datos del servidor
 * 
 * Ejemplo de implementación:
 * 
 * import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
 * 
 * const queryClient = new QueryClient({
 *   defaultOptions: {
 *     queries: {
 *       retry: 1,
 *       refetchOnWindowFocus: false,
 *     },
 *   },
 * });
 * 
 * export const QueryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
 *   return (
 *     <QueryClientProvider client={queryClient}>
 *       {children}
 *     </QueryClientProvider>
 *   );
 * };
 */

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  // Placeholder: retornar children directamente hasta implementar React Query
  return <>{children}</>;
};

