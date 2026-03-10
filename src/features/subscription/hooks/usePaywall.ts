/**
 * Hook usePaywall — encapsula lógica del paywall
 *
 * Controla visibilidad, selección de plan, compra y restore.
 * Se usa desde HomeScreen para bloquear el chat cuando el usuario alcanza
 * el límite de mensajes gratuitos.
 */
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useSubscriptionStore, type PlanId } from '../store/subscription.store';
import { useSubscriptionPurchase } from './useSubscriptionPurchase';
import { FREE_MESSAGE_LIMIT, PAYWALL_PLANS } from '../constants/paywall.constants';
import { ENABLE_SUBSCRIPTION_MOCK } from '@/app/config/env';

interface UsePaywallOptions {
    /** Cantidad de mensajes del usuario en la conversación actual */
    userMessageCount: number;
}

interface UsePaywallReturn {
    /** Si el paywall debe mostrarse (bloquea el chat completamente) */
    isPaywallVisible: boolean;
    /** Muestra el paywall manualmente */
    showPaywall: () => void;
    /** Cierra el paywall (solo si el usuario tiene suscripción activa) */
    dismissPaywall: () => void;
    /** Plan actualmente seleccionado en el paywall */
    selectedPlan: PlanId | null;
    /** Selecciona un plan */
    selectPlan: (planId: PlanId) => void;
    /** Inicia la compra del plan seleccionado */
    handlePurchase: () => Promise<void>;
    /**
     * Restaura compras previas
     * TODO: implementar cuando el backend soporte verificación de suscripciones activas
     */
    handleRestore: () => Promise<void>;
    /** Estado de la compra en progreso */
    purchaseState: 'idle' | 'loading' | 'success' | 'error';
    /** Mensaje de error si la compra falló */
    error: string | null;
    /** Si el usuario ya tiene una suscripción activa */
    isSubscribed: boolean;
    /** Mensajes restantes antes de que aparezca el paywall */
    messagesRemaining: number;
}

export function usePaywall({ userMessageCount }: UsePaywallOptions): UsePaywallReturn {
    const [manuallyShown, setManuallyShown] = useState(false);

    const isSubscribed = useSubscriptionStore((s) => s.isSubscribed);
    const selectedPlan = useSubscriptionStore((s) => s.selectedPlan);
    const storeSelectPlan = useSubscriptionStore((s) => s.selectPlan);
    const activateSubscription = useSubscriptionStore((s) => s.activateSubscription);

    const { purchasePlan, state: purchaseState, error, reset: resetPurchase } =
        useSubscriptionPurchase();

    const messagesRemaining = useMemo(
        () => Math.max(0, FREE_MESSAGE_LIMIT - userMessageCount),
        [userMessageCount]
    );

    /** El paywall se muestra si se superó el límite y no está suscrito */
    const shouldShowByLimit = useMemo(
        () => !isSubscribed && userMessageCount >= FREE_MESSAGE_LIMIT,
        [isSubscribed, userMessageCount]
    );

    const isPaywallVisible = shouldShowByLimit || manuallyShown;

    // Auto-seleccionar plan destacado al abrir paywall
    useEffect(() => {
        if (isPaywallVisible && !selectedPlan) {
            const highlighted = PAYWALL_PLANS.find((p) => p.highlighted);
            if (highlighted) {
                storeSelectPlan(highlighted.id);
            }
        }
    }, [isPaywallVisible, selectedPlan, storeSelectPlan]);

    // Si la compra fue exitosa, activar suscripción
    useEffect(() => {
        if (purchaseState === 'success' && selectedPlan) {
            const plan = PAYWALL_PLANS.find((p) => p.id === selectedPlan);
            if (plan) {
                activateSubscription(selectedPlan, plan.messages);
            }
            resetPurchase();
            setManuallyShown(false);
        }
    }, [purchaseState, selectedPlan, activateSubscription, resetPurchase]);

    const showPaywall = useCallback(() => {
        setManuallyShown(true);
    }, []);

    const dismissPaywall = useCallback(() => {
        // Solo se puede cerrar si el usuario tiene suscripción activa
        // o si fue abierto manualmente (ej: desde menú)
        if (isSubscribed || !shouldShowByLimit) {
            setManuallyShown(false);
        }
    }, [isSubscribed, shouldShowByLimit]);

    const selectPlan = useCallback(
        (planId: PlanId) => {
            storeSelectPlan(planId);
        },
        [storeSelectPlan]
    );

    const handlePurchase = useCallback(async () => {
        if (!selectedPlan) return;
        const success = await purchasePlan(selectedPlan);
        if (!success || !ENABLE_SUBSCRIPTION_MOCK) {
            return;
        }

        const plan = PAYWALL_PLANS.find((p) => p.id === selectedPlan);
        if (plan) {
            activateSubscription(selectedPlan, plan.messages);
        }
        resetPurchase();
        setManuallyShown(false);
    }, [selectedPlan, purchasePlan, activateSubscription, resetPurchase]);

    const handleRestore = useCallback(async () => {
        // TODO: implementar restore purchases cuando el backend soporte
        // verificación de suscripciones activas por usuario
        // Por ahora es un placeholder que simula el flujo
        console.log('[usePaywall] Restore purchases — pendiente de implementación backend');
    }, []);

    return {
        isPaywallVisible,
        showPaywall,
        dismissPaywall,
        selectedPlan,
        selectPlan,
        handlePurchase,
        handleRestore,
        purchaseState,
        error,
        isSubscribed,
        messagesRemaining,
    };
}
