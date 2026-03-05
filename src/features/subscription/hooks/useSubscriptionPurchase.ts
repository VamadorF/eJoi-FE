/**
 * Hook para iniciar la compra de suscripción
 * Usa expo-iap requestPurchase; el resultado se procesa en purchaseListener.service
 */
import { useState, useCallback } from 'react';
import { Platform } from 'react-native';
import { requestPurchase, fetchProducts } from 'expo-iap';
import type { ProductSubscription } from 'expo-iap';
import { PLAN_TO_PRODUCT_ID } from '../config/subscriptionProducts';
import type { PlanId } from '../store/subscription.store';

export type PurchaseState = 'idle' | 'loading' | 'success' | 'error';

export function useSubscriptionPurchase() {
  const [state, setState] = useState<PurchaseState>('idle');
  const [error, setError] = useState<string | null>(null);

  const purchasePlan = useCallback(async (planId: PlanId): Promise<boolean> => {
    if (Platform.OS !== 'ios' && Platform.OS !== 'android') {
      setError('Las compras solo están disponibles en iOS y Android');
      setState('error');
      return false;
    }

    const productId = PLAN_TO_PRODUCT_ID[planId];
    if (!productId) {
      setError('Plan no configurado');
      setState('error');
      return false;
    }

    setState('loading');
    setError(null);

    try {
      if (Platform.OS === 'ios') {
        await requestPurchase({
          request: { apple: { sku: productId } },
          type: 'subs',
        });
      } else {
        const products = await fetchProducts({
          skus: [productId],
          type: 'subs',
        });
        const subscription = (Array.isArray(products) ? products : []).find(
          (p) => p.id === productId
        ) as ProductSubscription | undefined;

        if (subscription?.subscriptionOfferDetailsAndroid?.length) {
          const offerToken = subscription.subscriptionOfferDetailsAndroid[0].offerToken;
          await requestPurchase({
            request: {
              google: {
                skus: [productId],
                subscriptionOffers: [{ sku: productId, offerToken }],
              },
            },
            type: 'subs',
          });
        } else {
          await requestPurchase({
            request: { google: { skus: [productId] } },
            type: 'subs',
          });
        }
      }

      setState('success');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al procesar la compra';
      setError(message);
      setState('error');
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setState('idle');
    setError(null);
  }, []);

  return { purchasePlan, state, error, reset };
}
