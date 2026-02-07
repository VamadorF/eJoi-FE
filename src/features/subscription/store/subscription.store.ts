import { create } from 'zustand';

export type PlanId = 'Amigo' | 'Amigo Cercano' | 'Mejor Amigo';

type SubscriptionState = {
  selectedPlan: PlanId | null;
  isSubscribed: boolean;
  selectPlan: (plan: PlanId) => void;
  confirmSubscription: () => void; // mock por ahora
};

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  selectedPlan: null,
  isSubscribed: false,
  selectPlan: (plan) => set({ selectedPlan: plan }),
  confirmSubscription: () => set((s) => ({ isSubscribed: true, selectedPlan: s.selectedPlan })),
}));
