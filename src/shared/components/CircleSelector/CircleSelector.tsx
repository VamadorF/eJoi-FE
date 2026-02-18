import React, { useEffect } from 'react';
import { View, Text, Image, Pressable, useWindowDimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withSequence,
  FadeIn,
} from 'react-native-reanimated';
import { CircleSelectorProps } from './CircleSelector.types';
import { styles } from './CircleSelector.styles';
import { Colors } from '@/shared/theme/colors';

// Colores específicos para los iconos de género
const getIconColor = (id: string, isSelected: boolean): string => {
  if (id === 'femenino') return Colors.base.primary; // Rosa/magenta
  if (id === 'masculino') return isSelected ? Colors.base.primary : Colors.base.secondary; // Púrpura claro o rosa si seleccionado
  if (id === 'neutro') return isSelected ? Colors.base.primary : '#6BBF8A'; // Verde suave para neutro
  return isSelected ? Colors.base.primary : Colors.base.secondary;
};

type Option = { id: string; label: string; image?: any; icon?: string };

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

interface AnimatedOptionProps {
  option: Option;
  isSelected: boolean;
  onSelect: (id: string) => void;
  index: number;

  // Tamaño del círculo calculado desde el ancho del dispositivo + cantidad de opciones
  circleSize: number;

  gap: number;
  isLast: boolean;
}

const AnimatedOption: React.FC<AnimatedOptionProps> = ({
  option,
  isSelected,
  onSelect,
  index,
  circleSize,
  gap,
  isLast,
}) => {
  const scale = useSharedValue(1);
  const borderWidth = useSharedValue(isSelected ? 4 : 0);
  const checkScale = useSharedValue(isSelected ? 1 : 0);
  const iconColor = getIconColor(option.id, isSelected);

  useEffect(() => {
    if (isSelected) {
      scale.value = withSequence(
        withSpring(1.02, { damping: 10, stiffness: 350 }),
        withSpring(1, { damping: 14, stiffness: 220 })
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
      withSpring(0.98, { damping: 16, stiffness: 420 }),
      withSpring(1.02, { damping: 10, stiffness: 350 }),
      withSpring(1, { damping: 14, stiffness: 220 })
    );
    onSelect(option.id);
  };

  const imageInset = clamp(Math.floor(circleSize * 0.06), 6, 10);
  const imageSize = circleSize - imageInset * 2;
  const iconSize = clamp(Math.floor(circleSize * 0.43), 26, 54);
  const iconLineHeight = Math.floor(iconSize * 1.12);

  return (
    <Animated.View
      entering={FadeIn.delay(index * 100).duration(300)}
      style={[
        styles.optionContainer,
        !isLast && { marginRight: gap },
      ]}
    >
      <Pressable onPress={handlePress} hitSlop={10}>
        <View style={styles.circleWrapper}>
          <Animated.View
            style={[
              styles.circle,
              {
                width: circleSize,
                height: circleSize,
                borderRadius: circleSize / 2,
                zIndex: isSelected ? 2 : 1,
              },
              animatedCircleStyle,
            ]}
          >
            {option.image ? (
              <Image
                source={option.image}
                style={{
                  width: imageSize,
                  height: imageSize,
                  borderRadius: imageSize / 2,
                }}
                resizeMode="cover"
              />
            ) : (
              <Text
                style={[
                  styles.iconText,
                  { color: iconColor, fontSize: iconSize, lineHeight: iconLineHeight },
                ]}
              >
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
          numberOfLines={1}
          ellipsizeMode="tail"
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
  const { width } = useWindowDimensions();
  const n = Math.max(1, options.length);

  const GAP = 26;

  const H_PADDING = 24;

  const available = width - H_PADDING * 2 - GAP * (n - 1);
  const raw = Math.floor(available / n);

  const circleSize = clamp(raw, 52, 120);

  return (
    <View style={[styles.container, { paddingHorizontal: H_PADDING }]}>
      {options.map((option: any, index: number) => (
        <AnimatedOption
          key={option.id}
          option={option}
          isSelected={selectedId === option.id}
          onSelect={onSelect}
          index={index}
          circleSize={circleSize}
          gap={GAP}
          isLast={index === options.length - 1}
        />
      ))}
    </View>
  );
};
