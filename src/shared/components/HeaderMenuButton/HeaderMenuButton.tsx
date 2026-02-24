import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './HeaderMenuButton.styles';

interface HeaderMenuButtonProps {
    onPress: () => void;
}

/**
 * Botón "☰" para abrir el sidebar/drawer.
 * Se posiciona en la esquina superior derecha de la pantalla.
 */
export const HeaderMenuButton: React.FC<HeaderMenuButtonProps> = ({
    onPress,
}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={onPress}
                activeOpacity={0.7}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
                <Text style={styles.icon}>☰</Text>
            </TouchableOpacity>
        </View>
    );
};
