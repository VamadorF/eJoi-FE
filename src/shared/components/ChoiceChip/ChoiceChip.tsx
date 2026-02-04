import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { ChoiceChipProps } from './ChoiceChip.types';
import { getChipStyles } from './ChoiceChip.styles';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const ChoiceChip: React.FC<ChoiceChipProps> = ({
  label,
  selected,
  onPress,
  size = 'md',
}) => {
  const scale = useSharedValue(1);
  const styles = getChipStyles(size);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.92);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedTouchable
      style={[
        animatedStyle,
        styles.chip,
        selected && styles.chipSelected,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.label,
          selected && styles.labelSelected,
        ]}
        numberOfLines={2}
      >
        {label}
      </Text>
    </AnimatedTouchable>
  );
};

