import React from 'react';
import { View, Text } from 'react-native';
import { ChoiceChip } from '../ChoiceChip';
import { SummaryListProps } from './SummaryList.types';
import { styles } from './SummaryList.styles';

export const SummaryList: React.FC<SummaryListProps> = ({
  items,
  chipifyArrays = false,
}) => {
  const renderValue = (value: string | string[], chipify: boolean) => {
    if (Array.isArray(value)) {
      if (chipify) {
        return (
          <View style={styles.chipsContainer}>
            {value.map((item, index) => (
              <ChoiceChip
                key={index}
                label={item}
                selected={true}
                onPress={() => {}}
                size="sm"
              />
            ))}
          </View>
        );
      }
      return <Text style={styles.value}>{value.join(', ')}</Text>;
    }
    return <Text style={styles.value}>{value}</Text>;
  };

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.label}>{item.label}:</Text>
          {renderValue(item.value, chipifyArrays)}
        </View>
      ))}
    </View>
  );
};

