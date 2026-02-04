import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ContentContainer } from '../ContentContainer';
import { CreatingAnimationProps } from './CreatingAnimation.types';
import { styles } from './CreatingAnimation.styles';

const DEFAULT_IMAGE = require('../../../../public/IMG/eJoi_INTERFAZ-13.png');

export const CreatingAnimation: React.FC<CreatingAnimationProps> = ({
  image = DEFAULT_IMAGE,
  durationMs = 3000,
  messages,
  onDone,
}) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const messageOpacity = useSharedValue(1);
  const wave1Opacity = useSharedValue(0.3);
  const wave2Opacity = useSharedValue(0.2);
  const wave3Opacity = useSharedValue(0.1);

  useEffect(() => {
    // Rotación lenta continua
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 4000,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    // Pulso suave
    scale.value = withRepeat(
      withTiming(1.05, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    // Ondas pulsantes
    wave1Opacity.value = withRepeat(
      withTiming(0.6, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
    wave2Opacity.value = withRepeat(
      withTiming(0.4, {
        duration: 2500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
    wave3Opacity.value = withRepeat(
      withTiming(0.3, {
        duration: 3000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, [rotation, scale, wave1Opacity, wave2Opacity, wave3Opacity]);

  useEffect(() => {
    if (messages && messages.length > 1) {
      const interval = setInterval(() => {
        // Fade out
        messageOpacity.value = withTiming(0, { duration: 200 }, () => {
          // Cambiar mensaje
          setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
          // Fade in
          messageOpacity.value = withTiming(1, { duration: 300 });
        });
      }, 1200);

      return () => clearInterval(interval);
    }
  }, [messages, messageOpacity]);

  useEffect(() => {
    if (onDone && durationMs) {
      const timer = setTimeout(() => {
        onDone();
      }, durationMs);

      return () => clearTimeout(timer);
    }
  }, [onDone, durationMs]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
  }));

  const messageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
  }));

  const wave1Style = useAnimatedStyle(() => ({
    opacity: wave1Opacity.value,
  }));

  const wave2Style = useAnimatedStyle(() => ({
    opacity: wave2Opacity.value,
  }));

  const wave3Style = useAnimatedStyle(() => ({
    opacity: wave3Opacity.value,
  }));

  const defaultMessages = [
    'Sintetizando personalidad...',
    'Integrando intereses...',
    'Aplicando límites...',
    '¡Casi listo!',
  ];

  const currentMessages = messages && messages.length > 0 ? messages : defaultMessages;
  const currentMessage = currentMessages[currentMessageIndex];

  const progress = ((currentMessageIndex + 1) / currentMessages.length) * 100;

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <ContentContainer>
        <View style={styles.imageWrapper}>
          {/* Ondas pulsantes */}
          <Animated.View style={[styles.wave, styles.wave1, wave1Style]} />
          <Animated.View style={[styles.wave, styles.wave2, wave2Style]} />
          <Animated.View style={[styles.wave, styles.wave3, wave3Style]} />
          
          <Animated.View style={[styles.imageContainer, animatedStyle]}>
            <Image source={image} style={styles.image} resizeMode="contain" />
          </Animated.View>
        </View>

        {/* Indicador de progreso sutil */}
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
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>Creando a tu compañera</Text>
          <Animated.Text style={[styles.subtitle, messageAnimatedStyle]}>
            {currentMessage}
          </Animated.Text>
        </View>
      </ContentContainer>
    </ScrollView>
  );
};

