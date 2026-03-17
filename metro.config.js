const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

const isExpoGo = process.env.EXPO_GO === 'true';

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if ((platform === 'web' || isExpoGo) && moduleName === 'expo-iap') {
    return {
      filePath: path.resolve(__dirname, 'src/mocks/expo-iap.web.ts'),
      type: 'sourceFile',
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;