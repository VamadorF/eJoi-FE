import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/shared/theme/colors';
import { OptionButtonProps, RightIconType } from './OptionButton.types';
import { styles } from './OptionButton.styles';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const renderRightIcon = (rightIcon: RightIconType, selected: boolean) => {
  if (typeof rightIcon === 'string') {
    if (rightIcon === 'check') {
      return (
        <Ionicons
          name={selected ? 'checkmark-circle' : 'checkmark-circle-outline'}
          size={24}
          color={selected ? Colors.text.white : Colors.text.secondary}
        />
      );
    }
    if (rightIcon === 'arrow') {
      return (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={selected ? Colors.text.white : Colors.text.secondary}
        />
      );
    }
  }
  return rightIcon;
};

export const OptionButton: React.FC<OptionButtonProps> = ({
  title,
  label,
  subtitle,
  selected = false,
  disabled = false,
  onPress,
  leftIcon,
  rightIcon,
}) => {
  // Handle deprecated 'label' prop
  const displayTitle = title || label;
  if (label && !title) {
    console.warn('OptionButton: The "label" prop is deprecated. Please use "title" instead.');
  }

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!disabled) {
      scale.value = withSpring(0.95);
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      scale.value = withSpring(1);
    }
  };

  return (
    <AnimatedTouchable
      style={[
        animatedStyle,
        styles.button,
        selected && styles.buttonSelected,
        disabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

      <View style={styles.content}>
        <Text
          style={[
            styles.label,
            selected && styles.labelSelected,
            disabled && styles.labelDisabled,
          ]}
        >
          {displayTitle}
        </Text>
        {subtitle && (
          <Text
            style={[
              styles.subtitle,
              selected && styles.subtitleSelected,
              disabled && styles.subtitleDisabled,
            ]}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {rightIcon && (
        <View style={styles.rightIconContainer}>{renderRightIcon(rightIcon, selected)}</View>
      )}
    </AnimatedTouchable>
  );
};

