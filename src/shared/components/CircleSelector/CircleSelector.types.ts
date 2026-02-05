import { ImageSourcePropType } from 'react-native';

export interface CircleSelectorOption {
  id: string;
  label: string;
  icon?: string; // Emoji o símbolo como texto
  image?: ImageSourcePropType;
}

export interface CircleSelectorProps {
  options: CircleSelectorOption[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

