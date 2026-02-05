import React from 'react';
import { View, Image, ImageBackground, Platform, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/shared/theme/colors';
import { GradientBackgroundProps, GradientVariant } from './GradientBackground.types';
import { styles } from './GradientBackground.styles';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const getGradientColors = (variant: GradientVariant): string[] => {
  switch (variant) {
    case 'wizard':
      // Onboarding usa colores auxiliares más suaves
      return [Colors.auxiliary.primary, Colors.auxiliary.secondary];
    case 'auth':
    case 'creating':
    case 'ready':
    case 'chat':
    default:
      return Colors.background.gradient;
  }
};

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  variant,
  children,
  overlayImage,
  overlayOpacity = 0.12,
  blur,
  safeArea = false,
}) => {
  const gradientColors = getGradientColors(variant);
  const Wrapper = safeArea ? SafeAreaView : View;

  const getOverlayImageStyle = () => {
    return [
      styles.overlayImage,
      { opacity: overlayOpacity },
      blur && Platform.OS !== 'web' && { opacity: overlayOpacity * 0.7 },
    ];
  };

  const content = (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      {overlayImage && variant === 'wizard' ? (
        <>
          <Image
            source={overlayImage}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: SCREEN_WIDTH * 0.4,
              height: SCREEN_HEIGHT * 0.3,
              opacity: overlayOpacity,
              zIndex: 0,
            }}
            resizeMode="contain"
          />
          <View style={styles.content}>{children}</View>
        </>
      ) : overlayImage ? (
        <ImageBackground
          source={overlayImage}
          style={styles.overlay}
          imageStyle={getOverlayImageStyle()}
          resizeMode="cover"
        >
          {blur && Platform.OS === 'web' && (
            <View
              style={[
                styles.blurContainer,
                { backgroundColor: `rgba(0,0,0,${blur / 100})` },
              ]}
            />
          )}
          <View style={styles.content}>{children}</View>
        </ImageBackground>
      ) : (
        <View style={styles.content}>{children}</View>
      )}
    </LinearGradient>
  );

  if (safeArea) {
    return <Wrapper style={styles.container} edges={['top', 'bottom']}>{content}</Wrapper>;
  }

  return <View style={styles.container}>{content}</View>;
};

