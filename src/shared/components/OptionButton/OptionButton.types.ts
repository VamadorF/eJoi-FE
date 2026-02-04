import { ReactNode } from 'react';

export type RightIconType = 'check' | 'arrow' | ReactNode;

export interface OptionButtonProps {
  label: string;
  subtitle?: string;
  selected?: boolean;
  disabled?: boolean;
  onPress: () => void;
  leftIcon?: ReactNode;
  rightIcon?: RightIconType;
}

