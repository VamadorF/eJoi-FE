import { create } from 'zustand';

export type PlanId = 'Amigo' | 'Amigo Cercano' | 'Mejor Amigo';

type SubscriptionState = {
  selectedPlan: PlanId | null;
  isSubscribed: boolean;
  /**
   * Estado premium del usuario.
   * TODO: [BACKEND] Integrar con verificación real de suscripción
   *       (validación de recibo, endpoint /subscription/status, etc.)
   * TODO: [BACKEND] Persistir estado premium en AsyncStorage + refresh periódico
   */
  isPremium: boolean;
  selectPlan: (plan: PlanId) => void;
  confirmSubscription: () => void; // mock por ahora
  /**
   * TODO: [BACKEND] Implementar checkPremiumStatus() que consulte
   *       el estado real de la suscripción al servidor
   */
  reset: () => void;
};

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  selectedPlan: null,
  isSubscribed: false,
  isPremium: false, // TODO: [BACKEND] Inicializar desde cache persistente
  selectPlan: (plan) => set({ selectedPlan: plan }),
  confirmSubscription: () =>
    set((s) => ({ isSubscribed: true, isPremium: true, selectedPlan: s.selectedPlan })),
  reset: () => set({ selectedPlan: null, isSubscribed: false, isPremium: false }),
}));
