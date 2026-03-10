/**
 * Web stub for expo-iap
 * All IAP functionality is native-only.
 */
import type { Purchase, PurchaseError } from 'expo-iap';

export const initConnection = async () => {};
export const endConnection = async () => {};
export const getProducts = async () => [];
export const getSubscriptions = async () => [];
export const requestPurchase = async () => {};
export const requestSubscription = async () => {};
export const finishTransaction = async () => {};
export const purchaseUpdatedListener = (_cb: (p: Purchase) => void) => ({ remove: () => {} });
export const purchaseErrorListener = (_cb: (e: PurchaseError) => void) => ({ remove: () => {} });
export const ErrorCode = {
  UserCancelled: 'E_USER_CANCELLED',
  NetworkError: 'E_NETWORK_ERROR',
  AlreadyOwned: 'E_ALREADY_OWNED',
};