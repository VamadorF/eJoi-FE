// purchaseListener.service.web.ts
export const initializePurchaseListener = () => {};
export const removePurchaseListener = () => {};
export async function initPurchaseListeners(): Promise<void> {
  // no-op on web
}

export function cleanupPurchaseListeners(): void {
  // no-op on web
}
// mirror every named export from the real file with safe no-ops