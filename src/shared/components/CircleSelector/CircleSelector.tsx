import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withSequence,
  interpolate,
  FadeIn,
  ZoomIn,
} from 'react-native-reanimated';
import { CircleSelectorProps } from './CircleSelector.types';
import { styles } from './CircleSelector.styles';
import { Colors } from '@/shared/theme/colors';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

// Colores específicos para los iconos de género
const getIconColor = (id: string, isSelected: boolean): string => {
  if (id === 'femenino') {
    return Colors.base.primary; // Rosa/magenta
  }
  if (id === 'masculino') {
    return isSelected ? Colors.base.primary : Colors.base.secondary; // Púrpura claro o rosa si seleccionado
  }
  if (id === 'neutro') {
    return isSelected ? Colors.base.primary : '#6BBF8A'; // Verde suave para neutro
  }
  return isSelected ? Colors.base.primary : Colors.base.secondary;
};

interface AnimatedOptionProps {
  option: { id: string; label: string; image?: any; icon?: string };
  isSelected: boolean;
  onSelect: (id: string) => void;
  index: number;
}

const AnimatedOption: React.FC<AnimatedOptionProps> = ({ 
  option, 
  isSelected, 
  onSelect, 
  index 
}) => {
  const scale = useSharedValue(1);
  const borderWidth = useSharedValue(isSelected ? 4 : 0);
  const checkScale = useSharedValue(isSelected ? 1 : 0);
  const iconColor = getIconColor(option.id, isSelected);

  useEffect(() => {
    if (isSelected) {
      scale.value = withSequence(
        withSpring(1.08, { damping: 8, stiffness: 400 }),
        withSpring(1, { damping: 12, stiffness: 200 })
      );
      borderWidth.value = withSpring(4, { damping: 15, stiffness: 300 });
      checkScale.value = withSpring(1, { damping: 12, stiffness: 300 });
    } else {
      scale.value = withSpring(1, { damping: 15, stiffness: 200 });
      borderWidth.value = withTiming(0, { duration: 150 });
      checkScale.value = withTiming(0, { duration: 150 });
    }
  }, [isSelected]);

  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    borderWidth: borderWidth.value,
    borderColor: Colors.base.primary,
  }));

  const animatedCheckStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
    opacity: checkScale.value,
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.95, { damping: 15, stiffness: 400 }),
      withSpring(1.08, { damping: 8, stiffness: 400 }),
      withSpring(1, { damping: 12, stiffness: 200 })
    );
    onSelect(option.id);
  };

  return (
    <Animated.View
      entering={FadeIn.delay(index * 100).duration(300)}
      style={styles.optionContainer}
    >
      <Pressable onPress={handlePress}>
        <View style={styles.circleWrapper}>
          <Animated.View style={[styles.circle, animatedCircleStyle]}>
            {option.image ? (
              <Image source={option.image} style={styles.image} resizeMode="cover" />
            ) : (
              <Text style={[styles.iconText, { color: iconColor }]}>
                {option.icon}
              </Text>
            )}
          </Animated.View>
          
          <Animated.View style={[styles.checkBadge, animatedCheckStyle]}>
            <Text style={styles.checkIcon}>✓</Text>
          </Animated.View>
        </View>
        
        <Animated.Text 
          style={[styles.label, isSelected && styles.labelSelected]}
        >
          {option.label}
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
};

export const CircleSelector: React.FC<CircleSelectorProps> = ({
  options,
  selectedId,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <AnimatedOption
          key={option.id}
          option={option}
          isSelected={selectedId === option.id}
          onSelect={onSelect}
          index={index}
        />
      ))}
    </View>
  );
};

