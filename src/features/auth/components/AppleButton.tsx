import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Text, ViewStyle, ActivityIndicator, Animated } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from './AppleButton.styles';
import { Colors } from '@/shared/theme/colors';

export interface AppleButtonProps {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export const AppleButton: React.FC<AppleButtonProps> = ({
  onPress,
  disabled = false,
  loading = false,
  style,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 600,
      delay: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        style={[styles.button, disabled && styles.disabled, style]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator size="small" color={Colors.text.primary} style={styles.loader} />
        ) : (
          <FontAwesome5 name="apple" size={20} color="#000000" style={styles.icon} />
        )}
        <Text style={styles.text}>Continue with Apple</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

