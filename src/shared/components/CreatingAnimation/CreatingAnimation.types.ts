import { ImageSourcePropType } from 'react-native';

export interface CreatingAnimationProps {
  image?: ImageSourcePropType;
  durationMs?: number;
  messages?: string[];
  onDone?: () => void;
  showMessages?: boolean;
}

