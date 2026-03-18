/**
 * Stub for expo-iap — used on ALL platforms while IAP is disabled.
 *
 * RE-ENABLE IAP:
 *  1. npm install expo-iap
 *  2. Restore "expo-iap" & "withBillingLibraryDowngrade" in app.json plugins
 *  3. Set EXPO_PUBLIC_IAP_DISABLED=false in eas.json env blocks
 *  4. In metro.config.js, restore the platform === 'web' condition
 *
 * @see metro.config.js — redirects all expo-iap imports here
 */

export interface Purchase {
  productId: string;
  transactionId?: string;
  purchaseToken?: string;
  purchaseTokenAndroid?: string;
  packageNameAndroid?: string;
  purchaseState?: string;
}

export interface PurchaseError {
  code: string;
  message: string;
}

export interface ProductSubscription {
  id: string;
  subscriptionOfferDetailsAndroid?: { offerToken: string }[];
}

export const initConnection = async () => {};
export const endConnection = async () => {};
export const getProducts = async () => [];
export const getSubscriptions = async () => [];
export const fetchProducts = async (_opts: any) => [];
export const requestPurchase = async (_opts: any) => {};
export const requestSubscription = async () => {};
export const finishTransaction = async (_opts: any) => {};
export const purchaseUpdatedListener = (_cb: (p: Purchase) => void) => ({ remove: () => {} });
export const purchaseErrorListener = (_cb: (e: PurchaseError) => void) => ({ remove: () => {} });
export const ErrorCode = {
  UserCancelled: 'E_USER_CANCELLED',
  NetworkError: 'E_NETWORK_ERROR',
  AlreadyOwned: 'E_ALREADY_OWNED',
};