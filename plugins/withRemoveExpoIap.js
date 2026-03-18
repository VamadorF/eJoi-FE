/**
 * Config plugin: removes expo-iap from the Android native build.
 *
 * expo-iap gets auto-installed as a transitive dependency on EAS build servers
 * and autolinking picks it up despite exclude configs. This plugin surgically
 * removes it at multiple levels to guarantee it never compiles.
 *
 * TEMPORARY: remove this plugin when re-enabling IAP.
 * @see src/mocks/expo-iap.mock.ts for full re-enable instructions.
 */
const {
  withSettingsGradle,
  withAppBuildGradle,
  withDangerousMod,
} = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

function withRemoveExpoIap(config) {
  // 1. Modify settings.gradle to exclude expo-iap from autolinking AND project includes
  config = withSettingsGradle(config, (config) => {
    let contents = config.modResults.contents;

    // Remove include(':expo-iap') and project lines
    const lines = contents.split('\n');
    const filtered = lines.filter((line) => {
      if (line.includes('expo-iap')) {
        console.log('[withRemoveExpoIap] Removed from settings.gradle:', line.trim());
        return false;
      }
      return true;
    });
    contents = filtered.join('\n');

    // Inject exclude into useExpoModules() call
    // Change: useExpoModules()  →  useExpoModules([ exclude: ['expo-iap'] ])
    if (contents.includes('useExpoModules()')) {
      contents = contents.replace(
        'useExpoModules()',
        "useExpoModules([\n  exclude: ['expo-iap']\n])"
      );
      console.log('[withRemoveExpoIap] Injected exclude into useExpoModules()');
    }

    config.modResults.contents = contents;
    return config;
  });

  // 2. Remove expo-iap from app/build.gradle dependencies
  config = withAppBuildGradle(config, (config) => {
    const lines = config.modResults.contents.split('\n');
    const filtered = lines.filter((line) => {
      if (line.includes('expo-iap')) {
        console.log('[withRemoveExpoIap] Removed from build.gradle:', line.trim());
        return false;
      }
      return true;
    });
    config.modResults.contents = filtered.join('\n');
    return config;
  });

  // 3. Post-prebuild: delete expo-iap from node_modules if present
  config = withDangerousMod(config, [
    'android',
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;
      const iapPath = path.join(projectRoot, 'node_modules', 'expo-iap');
      if (fs.existsSync(iapPath)) {
        fs.rmSync(iapPath, { recursive: true, force: true });
        console.log('[withRemoveExpoIap] Deleted node_modules/expo-iap');
      }
      return config;
    },
  ]);

  return config;
}

module.exports = withRemoveExpoIap;
