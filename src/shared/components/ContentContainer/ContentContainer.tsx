import React from 'react';
import { View } from 'react-native';
import { ContentContainerProps } from './ContentContainer.types';
import { getContentContainerStyles } from './ContentContainer.styles';

export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  maxWidth = 600,
  centered = true,
}) => {
  const styles = getContentContainerStyles(maxWidth, centered);

  return <View style={styles.container}>{children}</View>;
};

