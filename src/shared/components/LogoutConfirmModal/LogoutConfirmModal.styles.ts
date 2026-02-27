import { StyleSheet, Dimensions, PixelRatio, Platform } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Escala proporcional basada en un diseño de 375pt (iPhone SE / X base)
const scale = (size: number) => (SCREEN_WIDTH / 375) * size;
const verticalScale = (size: number) => (SCREEN_HEIGHT / 812) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
    },
    modal: {
        backgroundColor: Colors.background.white,
        borderRadius: moderateScale(20),
        paddingTop: verticalScale(28),
        paddingHorizontal: scale(24),
        paddingBottom: verticalScale(20),
        width: SCREEN_WIDTH * 0.85,
        maxWidth: scale(380),
        ...(Platform.OS === 'web'
            ? { boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.20)' }
            : {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.2,
                shadowRadius: 20,
                elevation: 20,
            }),
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: verticalScale(16),
    },
    icon: {
        fontSize: moderateScale(36),
    },
    title: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: moderateScale(24),
        lineHeight: moderateScale(31),
        color: Colors.text.primary,
        textAlign: 'center',
        marginBottom: verticalScale(12),
    },
    message: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: moderateScale(16),
        lineHeight: moderateScale(24),
        color: Colors.text.secondary,
        textAlign: 'center',
        marginBottom: verticalScale(28),
    },
    actions: {
        gap: verticalScale(10),
    },
    cancelButton: {
        paddingVertical: verticalScale(14),
        borderRadius: moderateScale(14),
        backgroundColor: Colors.background.light,
        alignItems: 'center',
    },
    cancelButtonText: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: moderateScale(16),
        lineHeight: moderateScale(24),
        color: Colors.text.primary,
    },
    logoutButton: {
        paddingVertical: verticalScale(14),
        borderRadius: moderateScale(14),
        backgroundColor: Colors.error,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: scale(8),
    },
    logoutButtonDisabled: {
        opacity: 0.65,
    },
    logoutButtonText: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: moderateScale(16),
        lineHeight: moderateScale(24),
        color: Colors.text.white,
    },
    loadingText: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: moderateScale(14),
        lineHeight: moderateScale(21),
        color: Colors.text.white,
    },
});
