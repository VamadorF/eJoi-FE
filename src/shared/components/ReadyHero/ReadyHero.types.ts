import { ImageSourcePropType } from 'react-native';

export interface ReadyHeroAvatar {
  name: string;
  uri?: string;
}

export interface ReadyHeroProps {
  avatar: ReadyHeroAvatar;
  title: string;
  subtitle: string;
  backgroundImage?: ImageSourcePropType;
  ctaLabel: string;
  onCTA: () => void;
  interests?: string[];
  boundaries?: string[];
}

