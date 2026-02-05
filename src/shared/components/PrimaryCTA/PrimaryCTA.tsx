import React from 'react';
import { View, Text, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryCTAProps } from './PrimaryCTA.types';
import { styles } from './PrimaryCTA.styles';
import { Colors } from '@/shared/theme/colors';

export const PrimaryCTA: React.FC<PrimaryCTAProps> = ({
  label,
  onPress,
  disabled = false,
  loading = false,
}) => {
  const isDisabled = disabled || loading;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      pointerEvents="box-none"
    >
      <View style={styles.container} pointerEvents="box-none">
        <SafeAreaView style={styles.safeArea} edges={['bottom']} pointerEvents="box-none">
          <Pressable
            style={({ pressed }) => [
              styles.button,
              isDisabled && styles.buttonDisabled,
              pressed && !isDisabled && styles.buttonPressed,
            ]}
            onPress={onPress}
            disabled={isDisabled}
          >
            {loading ? (
              <ActivityIndicator color={Colors.text.white} size="small" />
            ) : (
              <Text style={[styles.label, isDisabled && styles.labelDisabled]}>
                {label}
              </Text>
            )}
          </Pressable>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
};

