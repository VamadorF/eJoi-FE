import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

interface CategoryPillProps {
  label: string;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({ label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm + 2,
    backgroundColor: Colors.base.primary,
    borderRadius: 24,
    shadowColor: Colors.base.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.white,
    textTransform: 'capitalize',
    letterSpacing: 0.5,
    lineHeight: 18, // 14 * 1.3
  },
});

