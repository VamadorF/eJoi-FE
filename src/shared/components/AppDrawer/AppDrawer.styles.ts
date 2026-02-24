import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';

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
        shadowColor: '#000',
        shadowOffset: { width: -4, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 16,
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
        fontFamily: Typography.fontFamily.bold,
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
        fontSize: 11,
        fontFamily: Typography.fontFamily.medium,
        color: Colors.text.secondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
        marginTop: 4,
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginBottom: 20,
    },
    interestChip: {
        backgroundColor: Colors.auxiliary.secondary,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 14,
    },
    interestChipText: {
        fontSize: 12,
        fontFamily: Typography.fontFamily.medium,
        color: Colors.text.primary,
    },
    companionInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.background.light,
        padding: 12,
        borderRadius: 12,
        marginBottom: 20,
        gap: 10,
    },
    companionAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.auxiliary.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    companionAvatarText: {
        fontSize: 18,
    },
    companionTextContainer: {
        flex: 1,
    },
    companionName: {
        fontSize: 15,
        fontFamily: Typography.fontFamily.bold,
        color: Colors.text.primary,
    },
    companionPersonality: {
        fontSize: 12,
        fontFamily: Typography.fontFamily.regular,
        color: Colors.text.secondary,
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border.light,
        marginVertical: 8,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: Colors.border.light,
        paddingTop: 14,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.background.light,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginBottom: 16,
        gap: 8,
    },
    detailEmoji: {
        fontSize: 16,
    },
    detailText: {
        fontSize: 14,
        fontFamily: Typography.fontFamily.regular,
        color: Colors.text.primary,
        flex: 1,
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
        fontFamily: Typography.fontFamily.bold,
        color: Colors.error,
    },
});

export const DRAWER_WIDTH_VALUE = DRAWER_WIDTH;
