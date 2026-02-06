import React, { useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
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

  useEffect(() => {
    if (selected) {
      // Efecto "bounce" al seleccionar
      scale.value = withSequence(
        withSpring(1.1, { damping: 8, stiffness: 400 }),
        withSpring(1, { damping: 12, stiffness: 250 })
      );
    }
  }, [selected]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.94, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12, stiffness: 300 });
  };

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.92, { damping: 15, stiffness: 400 }),
      withSpring(1.08, { damping: 8, stiffness: 400 }),
      withSpring(1, { damping: 12, stiffness: 250 })
    );
    onPress();
  };

  return (
    <AnimatedTouchable
      style={[
        animatedStyle,
        styles.chip,
        selected && styles.chipSelected,
      ]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
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

