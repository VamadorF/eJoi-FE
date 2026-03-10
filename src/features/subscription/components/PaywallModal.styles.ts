import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { shadowStyle } from '@/shared/utils/shadow';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PINK = Colors.base.primary; // #f20a64
const PURPLE = Colors.base.secondary; // #bab0ed

export const styles = StyleSheet.create({
    // ===== OVERLAY =====
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        elevation: 9999,
    },
    backdropGradient: {
        flex: 1,
    },

    // ===== CONTAINER =====
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: Colors.background.white,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        maxHeight: '94%',
        overflow: 'hidden',
        ...shadowStyle({
            color: '#000',
            opacity: 0.15,
            radius: 20,
            offset: { width: 0, height: -6 },
            elevation: 12,
        }),
    },
    scrollContent: {
        paddingBottom: 24,
    },

    // ===== HEADER =====
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 8,
    },
    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(60, 60, 59, 0.08)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeText: {
        fontSize: 18,
        color: Colors.text.secondary,
        fontFamily: Typography.fontFamily.bold,
    },
    headerTitle: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: 16,
        color: Colors.text.primary,
        letterSpacing: 0.3,
    },
    headerSpacer: {
        width: 36,
    },

    // ===== HERO SECTION =====
    heroSection: {
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 8,
        paddingBottom: 20,
    },
    heroEmoji: {
        fontSize: 48,
        marginBottom: 12,
    },
    heroTitle: {
        fontFamily: Typography.fontFamily.black,
        fontSize: 26,
        lineHeight: 32,
        color: Colors.text.primary,
        textAlign: 'center',
        marginBottom: 8,
    },
    heroSubtitle: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: 14,
        lineHeight: 20,
        color: Colors.text.secondary,
        textAlign: 'center',
        maxWidth: SCREEN_WIDTH * 0.8,
    },

    // ===== COUNTER BADGE =====
    counterBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(242, 10, 100, 0.1)',
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 6,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(242, 10, 100, 0.3)',
    },
    counterText: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: 12,
        color: PINK,
        marginLeft: 6,
    },

    // ===== PLANS =====
    plansSection: {
        paddingHorizontal: 16,
        gap: 10,
        marginBottom: 20,
    },
    planCard: {
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: Colors.border.light,
    },
    planCardHighlighted: {
        borderColor: 'rgba(242, 10, 100, 0.22)',
    },
    planCardSelected: {
        borderColor: PINK,
        borderWidth: 2,
    },
    planCardInner: {
        backgroundColor: Colors.background.white,
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    planCardInnerHighlighted: {
        backgroundColor: 'rgba(247, 191, 216, 0.22)',
    },
    planCardInnerSelected: {
        backgroundColor: 'rgba(247, 191, 216, 0.55)',
    },
    planLeftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    planEmoji: {
        fontSize: 28,
        marginRight: 12,
    },
    planTextBlock: {
        flex: 1,
    },
    planTitle: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: 15,
        lineHeight: 20,
        color: Colors.text.primary,
        marginBottom: 2,
    },
    planTitleSelected: {
        color: PINK,
    },
    planSubtitle: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: 12,
        lineHeight: 16,
        color: Colors.text.secondary,
    },
    planMessages: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: 11,
        lineHeight: 14,
        color: Colors.text.secondary,
        marginTop: 2,
    },
    planRightSection: {
        alignItems: 'flex-end',
        marginLeft: 12,
    },
    planPrice: {
        fontFamily: Typography.fontFamily.extraBold,
        fontSize: 18,
        lineHeight: 22,
        color: Colors.text.primary,
    },
    planPriceSelected: {
        color: PINK,
    },
    planPeriod: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: 11,
        color: Colors.text.secondary,
    },

    // ===== RECOMMENDED BADGE =====
    recommendedBadgeOuter: {
        position: 'absolute',
        top: -1,
        right: 16,
        zIndex: 10,
    },
    recommendedBadge: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    recommendedText: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: 9,
        color: '#FFFFFF',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },

    // ===== RADIO INDICATOR =====
    radioOuter: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: Colors.border.medium,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    radioOuterSelected: {
        borderColor: PINK,
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: PINK,
    },

    // ===== CTA BUTTON =====
    ctaSection: {
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    ctaGradient: {
        height: 52,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadowStyle({
            color: PINK,
            opacity: 0.3,
            radius: 20,
            offset: { width: 0, height: 8 },
            elevation: 10,
        }),
    },
    ctaGradientDisabled: {
        opacity: 0.5,
    },
    ctaText: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: 17,
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },

    // ===== ERROR =====
    errorContainer: {
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    errorText: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: 13,
        color: Colors.error,
        textAlign: 'center',
    },

    // ===== RESTORE =====
    restoreButton: {
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    restoreText: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: 13,
        color: Colors.text.secondary,
        textDecorationLine: 'underline',
    },

    // ===== LEGAL =====
    legalText: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: 11,
        lineHeight: 16,
        color: Colors.text.secondary,
        textAlign: 'center',
        paddingHorizontal: 32,
        marginTop: 4,
    },
});
