import { ReactNode } from 'react';
import { Spacing } from '@/shared/theme/spacing';

export type CardVariant = 'glass' | 'solid';

export interface CardSurfaceProps {
  children: ReactNode;
  variant?: CardVariant;
  padding?: keyof typeof Spacing;
  radius?: number;
}

