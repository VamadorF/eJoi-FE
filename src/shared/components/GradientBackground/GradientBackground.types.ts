import { ReactNode, ImageSourcePropType } from 'react';

export type GradientVariant = 'auth' | 'wizard' | 'creating' | 'ready' | 'chat';

export interface GradientBackgroundProps {
  variant: GradientVariant;
  children: ReactNode;
  overlayImage?: ImageSourcePropType;
  overlayOpacity?: number;
  blur?: number;
  safeArea?: boolean;
}

