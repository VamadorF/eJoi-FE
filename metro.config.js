const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  // IAP DISABLED: redirect expo-iap to stub on ALL platforms.
  // To re-enable IAP, change condition back to: platform === 'web' && moduleName === 'expo-iap'
  // and rename mock file back to expo-iap.web.ts
  if (moduleName === 'expo-iap') {
    return {
      filePath: path.resolve(__dirname, 'src/mocks/expo-iap.mock.ts'),
      type: 'sourceFile',
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;