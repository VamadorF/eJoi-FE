import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { CircleSelectorProps } from './CircleSelector.types';
import { styles } from './CircleSelector.styles';
import { Colors } from '@/shared/theme/colors';

// Colores específicos para los iconos de género
const getIconColor = (id: string, isSelected: boolean): string => {
  if (id === 'femenino') {
    return Colors.base.primary; // Rosa/magenta
  }
  if (id === 'masculino') {
    return isSelected ? Colors.base.primary : Colors.base.secondary; // Púrpura claro o rosa si seleccionado
  }
  return isSelected ? Colors.base.primary : Colors.base.secondary;
};

export const CircleSelector: React.FC<CircleSelectorProps> = ({
  options,
  selectedId,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = selectedId === option.id;
        const iconColor = getIconColor(option.id, isSelected);
        
        return (
          <TouchableOpacity
            key={option.id}
            style={styles.optionContainer}
            onPress={() => onSelect(option.id)}
            activeOpacity={0.8}
          >
            <View style={styles.circleWrapper}>
              <View style={[styles.circle, isSelected && styles.circleSelected]}>
                {option.image ? (
                  <Image source={option.image} style={styles.image} resizeMode="cover" />
                ) : (
                  <Text style={[styles.iconText, { color: iconColor }]}>
                    {option.icon}
                  </Text>
                )}
              </View>
              
              {isSelected && (
                <View style={styles.checkBadge}>
                  <Text style={styles.checkIcon}>✓</Text>
                </View>
              )}
            </View>
            
            <Text style={[styles.label, isSelected && styles.labelSelected]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

