import React, { createContext, useContext } from 'react';
import { View } from 'react-native';
import { Spacing } from '@/shared/theme/spacing';
import { CardSurfaceProps } from './CardSurface.types';
import { getCardStyles } from './CardSurface.styles';

const CardSurfaceContext = createContext<{ textColor?: string }>({});

export const useCardSurfaceContext = () => useContext(CardSurfaceContext);

export const CardSurface: React.FC<CardSurfaceProps> = ({
  children,
  variant = 'solid',
  padding = 'md',
  radius = 16,
  textColor,
}) => {
  const paddingValue = Spacing[padding];
  const dynamicStyles = getCardStyles(variant, paddingValue, radius);

  return (
    <CardSurfaceContext.Provider value={{ textColor }}>
      <View style={dynamicStyles.card}>{children}</View>
    </CardSurfaceContext.Provider>
  );
};

