import { create } from 'zustand';

export type PlanId = 'starter' | 'conexion' | 'plus';

type SubscriptionState = {
  selectedPlan: PlanId | null;
  isSubscribed: boolean;
  messageQuota: number; // mensajes incluidos en plan activo
  selectPlan: (plan: PlanId) => void;
  activateSubscription: (planId: PlanId, quota: number) => void;
  confirmSubscription: () => void;
  reset: () => void;
};

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  selectedPlan: null,
  isSubscribed: false,
  messageQuota: 0,
  selectPlan: (plan) => set({ selectedPlan: plan }),
  activateSubscription: (planId, quota) =>
    set({ isSubscribed: true, selectedPlan: planId, messageQuota: quota }),
  confirmSubscription: () =>
    set((state) => ({
      ...state,
      isSubscribed: true,
    })),
  reset: () => set({ selectedPlan: null, isSubscribed: false, messageQuota: 0 }),
}));
