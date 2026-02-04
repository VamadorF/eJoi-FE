import React from 'react';
import { View, ImageBackground, Platform, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/shared/theme/colors';
import { GradientBackgroundProps, GradientVariant } from './GradientBackground.types';
import { styles } from './GradientBackground.styles';

const getGradientColors = (variant: GradientVariant): string[] => {
  switch (variant) {
    case 'auth':
    case 'wizard':
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

  const content = (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      {overlayImage ? (
        <ImageBackground
          source={overlayImage}
          style={styles.overlay}
          imageStyle={[
            styles.overlayImage,
            { opacity: overlayOpacity },
            blur && Platform.OS !== 'web' && { opacity: overlayOpacity * 0.7 },
          ]}
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

