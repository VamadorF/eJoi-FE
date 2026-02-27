import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '@/shared/theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.75;

export const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        zIndex: 999,
    },
    overlayTouchable: {
        flex: 1,
    },
    drawer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: DRAWER_WIDTH,
        backgroundColor: Colors.background.white,
        zIndex: 1000,
        paddingTop: Platform.OS === 'ios' ? 56 : 40,
        paddingHorizontal: 20,
        paddingBottom: 28,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        ...(Platform.OS === 'web'
            ? { boxShadow: '-4px 0px 12px rgba(0, 0, 0, 0.15)' }
            : {
                shadowColor: '#000',
                shadowOffset: { width: -4, height: 0 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                elevation: 16,
            }),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border.light,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text.primary,
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.background.light,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 14,
        color: Colors.text.secondary,
    },
    content: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.text.secondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
        marginTop: 4,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: Colors.border.light,
        paddingTop: 14,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 10,
        backgroundColor: 'rgba(244, 67, 54, 0.08)',
        gap: 10,
    },
    logoutIcon: {
        fontSize: 18,
    },
    logoutText: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.error,
    },
});

export const DRAWER_WIDTH_VALUE = DRAWER_WIDTH;
