import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { CreatingAnimationProps } from './CreatingAnimation.types';
import { styles } from './CreatingAnimation.styles';
import { Colors } from '@/shared/theme/colors';

// Imagen de la mujer meditando
const MEDITATION_IMAGE = require('../../../../public/IMG/eJoi_INTERFAZ-12.png');

export const CreatingAnimation: React.FC<CreatingAnimationProps> = ({
  image = MEDITATION_IMAGE,
  durationMs = 4000,
  messages,
  onDone,
  showMessages = false,
}) => {
  const spinnerRotation = useSharedValue(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const messageOpacity = useSharedValue(1);

  useEffect(() => {
    // Rotación continua del spinner
    spinnerRotation.value = withRepeat(
      withTiming(360, {
        duration: 1200,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [spinnerRotation]);

  useEffect(() => {
    if (messages && messages.length > 1 && showMessages) {
      const interval = setInterval(() => {
        messageOpacity.value = withTiming(0, { duration: 200 }, () => {
          setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
          messageOpacity.value = withTiming(1, { duration: 300 });
        });
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [messages, messageOpacity, showMessages]);

  useEffect(() => {
    if (onDone && durationMs) {
      const timer = setTimeout(() => {
        onDone();
      }, durationMs);

      return () => clearTimeout(timer);
    }
  }, [onDone, durationMs]);

  const spinnerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spinnerRotation.value}deg` }],
  }));

  const messageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
  }));

  const defaultMessages = [
    'Sintetizando personalidad...',
    'Integrando intereses...',
    'Aplicando límites...',
    '¡Casi listo!',
  ];

  const currentMessages = messages && messages.length > 0 ? messages : defaultMessages;
  const currentMessage = currentMessages[currentMessageIndex];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.background.white, Colors.auxiliary.secondary, Colors.auxiliary.secondary]}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <View style={styles.content}>
          {/* Imagen con spinner */}
          <View style={styles.imageWrapper}>
            <Image 
              source={image} 
              style={styles.image} 
              resizeMode="contain" 
            />
            
            {/* Spinner circular */}
            <View style={styles.spinnerContainer}>
              <Animated.View style={[styles.spinnerCircle, spinnerAnimatedStyle]} />
            </View>
          </View>

          {/* Texto */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Creando a tu{'\n'}
              <Text style={styles.titleHighlight}>compañer@</Text>
            </Text>
          </View>

          {/* Mensajes de progreso (opcional) */}
          {showMessages && (
            <>
              <View style={styles.progressContainer}>
                {currentMessages.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.progressDot,
                      index <= currentMessageIndex && styles.progressDotActive,
                    ]}
                  />
                ))}
              </View>
              <Animated.Text style={[styles.subtitle, messageAnimatedStyle]}>
                {currentMessage}
              </Animated.Text>
            </>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};
