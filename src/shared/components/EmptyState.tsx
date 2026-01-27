import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { styles } from './EmptyState.styles';

export interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  messageStyle?: TextStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  icon,
  containerStyle,
  titleStyle,
  messageStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {message && (
        <Text style={[styles.message, messageStyle]}>{message}</Text>
      )}
    </View>
  );
};

