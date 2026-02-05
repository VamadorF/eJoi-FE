import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing['2xl'],
  },
  optionContainer: {
    alignItems: 'center',
  },
  circleWrapper: {
    position: 'relative',
  },
  circle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.base.secondary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  circleSelected: {
    borderWidth: 2,
    borderColor: Colors.base.primary,
    shadowColor: Colors.base.primary,
    shadowOpacity: 0.15,
  },
  iconText: {
    fontSize: 56,
    color: Colors.base.secondary,
    lineHeight: 64, // 56 * 1.15
  },
  iconTextSelected: {
    color: Colors.base.primary,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  checkBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.background.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  checkIcon: {
    fontSize: 18,
    color: Colors.base.primary,
    fontWeight: 'bold',
    lineHeight: 22, // 18 * 1.2
  },
  label: {
    marginTop: Spacing.lg,
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20, // 16 * 1.25
  },
  labelSelected: {
    color: Colors.base.primary,
    fontFamily: Typography.fontFamily.bold,
  },
});

