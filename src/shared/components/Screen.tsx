import React from 'react';
import { SafeAreaView, View, ViewStyle } from 'react-native';
import { styles } from './Screen.styles';

export interface ScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
  safeAreaStyle?: ViewStyle;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  style,
  safeAreaStyle,
}) => {
  return (
    <SafeAreaView style={[styles.safeArea, safeAreaStyle]}>
      <View style={[styles.container, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

