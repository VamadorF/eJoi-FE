import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 54 : 36,
        right: 16,
        zIndex: 100,
    },
    button: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: 'FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        // Sombra sutil
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    icon: {
        fontSize: 22,
        color: '#FFFFFF',
    },
});
