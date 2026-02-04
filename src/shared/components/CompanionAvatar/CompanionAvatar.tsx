import React from 'react';
import { View, Text, Image } from 'react-native';
import { CompanionAvatarProps } from './CompanionAvatar.types';
import { getAvatarStyles } from './CompanionAvatar.styles';

export const CompanionAvatar: React.FC<CompanionAvatarProps> = ({
  name,
  uri,
  size = 150,
  glow = false,
}) => {
  const styles = getAvatarStyles(size, glow);
  const initial = name.charAt(0).toUpperCase();

  return (
    <View style={styles.container}>
      {uri ? (
        <Image source={{ uri }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.initial}>{initial}</Text>
        </View>
      )}
    </View>
  );
};

