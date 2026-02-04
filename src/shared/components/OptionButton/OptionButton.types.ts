import { ReactNode } from 'react';

export type RightIconType = 'check' | 'arrow' | ReactNode;

export interface OptionButtonProps {
  title: string;
  label?: string; // Deprecated: use 'title' instead
  subtitle?: string;
  selected?: boolean;
  disabled?: boolean;
  onPress: () => void;
  leftIcon?: ReactNode;
  rightIcon?: RightIconType;
}

