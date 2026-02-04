import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ProgressBar } from '../ProgressBar';
import { WizardHeaderProps } from './WizardHeader.types';
import { styles } from './WizardHeader.styles';
import { Colors } from '@/shared/theme/colors';

export const WizardHeader: React.FC<WizardHeaderProps> = ({
  title,
  step,
  total,
  onBack,
  onClose,
  showClose = false,
}) => {
  const progress = step / total;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        {onBack ? (
          <TouchableOpacity
            style={styles.leftButton}
            onPress={onBack}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.text.white} />
          </TouchableOpacity>
        ) : (
          <View style={styles.leftButton} />
        )}

        {title && (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}

        {showClose && onClose ? (
          <TouchableOpacity
            style={styles.rightButton}
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close" size={24} color={Colors.text.white} />
          </TouchableOpacity>
        ) : (
          <View style={styles.rightButton} />
        )}
      </View>

      <View style={styles.progressContainer}>
        <ProgressBar value={progress} />
      </View>
    </SafeAreaView>
  );
};

