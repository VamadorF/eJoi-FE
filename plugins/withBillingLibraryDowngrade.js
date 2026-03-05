/**
 * Config plugin para Expo SDK 51/52.
 * Fuerza Billing Library v6.2.1 compatible con Kotlin 1.9.x,
 * ya que expo-iap 3.x usa Billing v8 que requiere Kotlin 2.0+.
 * @see https://github.com/hyochan/expo-iap/issues/278
 */
const { withGradleProperties } = require('@expo/config-plugins');

module.exports = function withBillingLibraryDowngrade(config) {
  return withGradleProperties(config, (config) => {
    config.modResults.push({
      type: 'property',
      key: 'billingClientVersion',
      value: '6.2.1',
    });
    return config;
  });
};
