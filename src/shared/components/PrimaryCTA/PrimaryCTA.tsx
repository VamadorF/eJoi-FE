import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
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
    >
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
          <TouchableOpacity
            style={[styles.button, isDisabled && styles.buttonDisabled]}
            onPress={onPress}
            disabled={isDisabled}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color={Colors.text.white} size="small" />
            ) : (
              <Text style={[styles.label, isDisabled && styles.labelDisabled]}>
                {label}
              </Text>
            )}
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
};

