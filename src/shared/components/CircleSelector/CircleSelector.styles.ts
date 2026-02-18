import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center', 
  },

  optionContainer: {
    alignItems: 'center',
  },

  circleWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  circle: {
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
    overflow: 'hidden',
  },

  circleSelected: {
    borderWidth: 2,
    borderColor: Colors.base.primary,
    shadowColor: Colors.base.primary,
    shadowOpacity: 0.15,
  },

  iconText: {
    color: Colors.base.secondary,
    fontFamily: Typography.fontFamily.medium,
  },

  iconTextSelected: {
    color: Colors.base.primary,
  },

  checkBadge: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    width: 30,
    height: 30,
    borderRadius: 15,
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
    lineHeight: 22,
  },

  label: {
    marginTop: Spacing.lg,
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 120,
  },

  labelSelected: {
    color: Colors.base.primary,
    fontFamily: Typography.fontFamily.bold,
  },
});
