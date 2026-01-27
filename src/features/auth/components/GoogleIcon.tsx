import React from 'react';
import { View, StyleSheet } from 'react-native';

interface GoogleIconProps {
  size?: number;
}

export const GoogleIcon: React.FC<GoogleIconProps> = ({ size = 20 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Logo de Google simplificado con colores oficiales */}
      <View style={[styles.quadrant, styles.blue, { top: 0, left: 0 }]} />
      <View style={[styles.quadrant, styles.red, { top: 0, right: 0 }]} />
      <View style={[styles.quadrant, styles.yellow, { bottom: 0, left: 0 }]} />
      <View style={[styles.quadrant, styles.green, { bottom: 0, right: 0 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 2,
    overflow: 'hidden',
  },
  quadrant: {
    position: 'absolute',
    width: '50%',
    height: '50%',
  },
  blue: {
    backgroundColor: '#4285F4',
    borderTopLeftRadius: 2,
  },
  red: {
    backgroundColor: '#EA4335',
    borderTopRightRadius: 2,
  },
  yellow: {
    backgroundColor: '#FBBC05',
    borderBottomLeftRadius: 2,
  },
  green: {
    backgroundColor: '#34A853',
    borderBottomRightRadius: 2,
  },
});

