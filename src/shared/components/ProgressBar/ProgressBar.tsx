import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Colors } from '@/shared/theme/colors';
import { ProgressBarProps } from './ProgressBar.types';
import { getProgressBarStyles } from './ProgressBar.styles';

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  height = 4,
  trackOpacity = 1,
}) => {
  const progress = useSharedValue(0);
  const styles = getProgressBarStyles(height, trackOpacity);

  useEffect(() => {
    progress.value = withTiming(Math.max(0, Math.min(1, value)), {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
  }, [value, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.fill, animatedStyle]} />
    </View>
  );
};

