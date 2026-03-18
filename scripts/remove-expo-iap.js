/**
 * postinstall: remove expo-iap native module if it was installed as a transitive dependency.
 *
 * expo-iap@3.x has a Kotlin compilation error (Unresolved reference: Constant)
 * that breaks Android builds with Kotlin 1.9.x.
 *
 * TEMPORARY: remove this script and the postinstall hook when re-enabling IAP.
 * @see src/mocks/expo-iap.mock.ts for full re-enable instructions.
 */
const fs = require('fs');
const path = require('path');

const iapPath = path.join(__dirname, '..', 'node_modules', 'expo-iap');

if (fs.existsSync(iapPath)) {
  fs.rmSync(iapPath, { recursive: true, force: true });
  console.log('[postinstall] Removed expo-iap from node_modules (IAP temporarily disabled)');
} else {
  console.log('[postinstall] expo-iap not found in node_modules — OK');
}
