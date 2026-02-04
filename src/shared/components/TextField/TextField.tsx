import React, { useState } from 'react';
import { View, Text, TextInput, Platform } from 'react-native';
import { TextFieldProps } from './TextField.types';
import { styles } from './TextField.styles';
import { Colors } from '@/shared/theme/colors';

export const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  multiline = false,
  error,
  helperText,
  maxLength,
}) => {
  const [inputHeight, setInputHeight] = useState(multiline ? 100 : 48);

  const handleContentSizeChange = (event: any) => {
    if (multiline && Platform.OS !== 'web') {
      setInputHeight(Math.max(100, event.nativeEvent.contentSize.height + 16));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label} accessibilityLabel={label}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.inputMultiline,
          multiline && Platform.OS !== 'web' && { height: inputHeight },
          error && styles.inputError,
        ]}
        placeholder={placeholder}
        placeholderTextColor={Colors.text.light}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        maxLength={maxLength}
        onContentSizeChange={handleContentSizeChange}
        accessibilityLabel={label}
        accessibilityHint={helperText || error}
      />
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : (
        <View style={{ minHeight: 16 }} />
      )}
    </View>
  );
};

