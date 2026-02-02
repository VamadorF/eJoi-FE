import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Spacing } from '@/shared/theme/spacing';

export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  style?: any;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  style,
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${progress}%`,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: Spacing.screen.paddingHorizontal,
    paddingVertical: Spacing.md,
  },
  track: {
    height: 4,
    backgroundColor: Colors.auxiliary.primary,
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: Colors.base.primary,
    borderRadius: 2,
  },
});

