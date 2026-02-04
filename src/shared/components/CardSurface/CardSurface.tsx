import React from 'react';
import { View } from 'react-native';
import { Spacing } from '@/shared/theme/spacing';
import { CardSurfaceProps } from './CardSurface.types';
import { getCardStyles } from './CardSurface.styles';

export const CardSurface: React.FC<CardSurfaceProps> = ({
  children,
  variant = 'solid',
  padding = 'md',
  radius = 16,
}) => {
  const paddingValue = Spacing[padding];
  const dynamicStyles = getCardStyles(variant, paddingValue, radius);

  return <View style={dynamicStyles.card}>{children}</View>;
};

