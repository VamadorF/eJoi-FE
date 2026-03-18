/**
 * Config plugin: fixes expo-iap compilation with Kotlin 1.9.x
 *
 * expo-iap@3.4.x depends on Billing Library v7/v8 which uses
 * `Constant` from com.android.billingclient that requires Kotlin 2.0+.
 * This plugin forces the billing library to v6.2.1 (last Kotlin 1.9 compatible)
 * AND patches expo-iap's build.gradle to exclude/downgrade the dependency.
 *
 * Also attempts to remove expo-iap from settings.gradle and build.gradle
 * as a first line of defense.
 *
 * TEMPORARY: remove when re-enabling IAP with Kotlin 2.0+.
 */
const {
  withSettingsGradle,
  withAppBuildGradle,
  withDangerousMod,
} = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

function withRemoveExpoIap(config) {
  // 1. Try to remove expo-iap from settings.gradle + inject exclude
  config = withSettingsGradle(config, (config) => {
    let contents = config.modResults.contents;

    // Remove include(':expo-iap') lines
    contents = contents
      .split('\n')
      .filter((line) => !line.includes('expo-iap'))
      .join('\n');

    // Inject exclude into useExpoModules() call
    if (contents.includes('useExpoModules()')) {
      contents = contents.replace(
        'useExpoModules()',
        "useExpoModules([\n  exclude: ['expo-iap']\n])"
      );
    }

    config.modResults.contents = contents;
    return config;
  });

  // 2. Force billing library downgrade in app/build.gradle as safety net
  config = withAppBuildGradle(config, (config) => {
    let contents = config.modResults.contents;

    // Remove direct expo-iap dependency lines
    contents = contents
      .split('\n')
      .filter((line) => !line.includes('expo-iap'))
      .join('\n');

    // Add dependency resolution strategy to force billing library v6.2.1
    // This ensures if expo-iap DOES compile, it won't hit the Kotlin error
    const resolutionBlock = `
    // Force billing library v6.2.1 (Kotlin 1.9.x compatible)
    configurations.all {
        resolutionStrategy {
            force 'com.android.billingclient:billing:6.2.1'
            force 'com.android.billingclient:billing-ktx:6.2.1'
        }
    }`;

    // Insert resolution block inside android { } block
    if (contents.includes('android {')) {
      contents = contents.replace(
        'android {',
        'android {' + resolutionBlock
      );
    }

    config.modResults.contents = contents;
    return config;
  });

  // 3. Delete expo-iap from node_modules during prebuild
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
