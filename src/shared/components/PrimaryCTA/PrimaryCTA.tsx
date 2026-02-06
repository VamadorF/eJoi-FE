import React, { useEffect } from 'react';
import { View, Text, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  interpolateColor,
  FadeInUp,
  SlideInDown,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryCTAProps } from './PrimaryCTA.types';
import { styles } from './PrimaryCTA.styles';
import { Colors } from '@/shared/theme/colors';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const PrimaryCTA: React.FC<PrimaryCTAProps> = ({
  label,
  onPress,
  disabled = false,
  loading = false,
}) => {
  const isDisabled = disabled || loading;
  const scale = useSharedValue(1);
  const opacity = useSharedValue(isDisabled ? 0.6 : 1);

  useEffect(() => {
    opacity.value = withTiming(isDisabled ? 0.6 : 1, { duration: 200 });
  }, [isDisabled]);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    if (!isDisabled) {
      scale.value = withSpring(0.96, { damping: 15, stiffness: 400 });
    }
  };

  const handlePressOut = () => {
    if (!isDisabled) {
      scale.value = withSpring(1, { damping: 12, stiffness: 300 });
    }
  };

  const handlePress = () => {
    if (!isDisabled) {
      scale.value = withSequence(
        withSpring(0.95, { damping: 15, stiffness: 400 }),
        withSpring(1.02, { damping: 10, stiffness: 350 }),
        withSpring(1, { damping: 12, stiffness: 300 })
      );
      onPress();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      pointerEvents="box-none"
    >
      <View style={styles.container} pointerEvents="box-none">
        <SafeAreaView style={styles.safeArea} edges={['bottom']} pointerEvents="box-none">
          <AnimatedPressable
            style={[
              styles.button,
              isDisabled && styles.buttonDisabled,
              animatedButtonStyle,
            ]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            disabled={isDisabled}
          >
            {loading ? (
              <Animated.View entering={FadeInUp.duration(200)}>
                <ActivityIndicator color={Colors.text.white} size="small" />
              </Animated.View>
            ) : (
              <Text style={[styles.label, isDisabled && styles.labelDisabled]}>
                {label}
              </Text>
            )}
          </AnimatedPressable>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
};

