import React, { useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    runOnJS,
} from 'react-native-reanimated';

import { useCompanionStore } from '@/features/companion/store/companion.store';
import { styles, DRAWER_WIDTH_VALUE } from './AppDrawer.styles';

interface AppDrawerProps {
    visible: boolean;
    onClose: () => void;
    onLogoutPress: () => void;
}

/**
 * Sidebar/Drawer reutilizable que se desliza desde la derecha.
 * Muestra info del companion, intereses y botón de cerrar sesión.
 */
export const AppDrawer: React.FC<AppDrawerProps> = ({
    visible,
    onClose,
    onLogoutPress,
}) => {
    const { companion } = useCompanionStore();

    const translateX = useSharedValue(DRAWER_WIDTH_VALUE);
    const overlayOpacity = useSharedValue(0);

    useEffect(() => {
        if (visible) {
            translateX.value = withTiming(0, {
                duration: 280,
                easing: Easing.out(Easing.cubic),
            });
            overlayOpacity.value = withTiming(1, { duration: 250 });
        } else {
            translateX.value = withTiming(DRAWER_WIDTH_VALUE, {
                duration: 220,
                easing: Easing.in(Easing.cubic),
            });
            overlayOpacity.value = withTiming(0, { duration: 200 });
        }
    }, [visible]);

    const drawerAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const overlayAnimatedStyle = useAnimatedStyle(() => ({
        opacity: overlayOpacity.value,
        pointerEvents: overlayOpacity.value > 0 ? 'auto' : 'none',
    }));

    if (!visible && translateX.value === DRAWER_WIDTH_VALUE) {
        return null;
    }

    return (
        <>
            {/* Overlay */}
            <Animated.View style={[styles.overlay, overlayAnimatedStyle]}>
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.overlayTouchable} />
                </TouchableWithoutFeedback>
            </Animated.View>

            {/* Drawer */}
            <Animated.View style={[styles.drawer, drawerAnimatedStyle]}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Menú</Text>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                </View>

                {/* Contenido scrollable */}
                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                </ScrollView>

                {/* Footer con Logout */}
                <View style={styles.footer}>
                    <Text style={styles.sectionTitle}>Sesión</Text>
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={onLogoutPress}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.logoutIcon}>🚪</Text>
                        <Text style={styles.logoutText}>Cerrar sesión</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </>
    );
};
