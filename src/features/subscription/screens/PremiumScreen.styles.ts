import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';

const PINK = Colors.base.primary;     // '#f20a64'
const PURPLE = Colors.base.secondary; // '#bab0ed'
const TEXT = '#1F1F1F';
const SUB = '#5B5B5B';

export const premiumStyles = StyleSheet.create({
    // ========================
    // Overlay
    // ========================
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        elevation: 9999,
    },
    gradient: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },

    // ========================
    // Header
    // ========================
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 4,
    },
    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.20)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontFamily: Typography.fontFamily.bold,
    },
    headerTitle: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: 16,
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    headerSpacer: {
        width: 36,
    },

    // ========================
    // Scroll content
    // ========================
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 40,
    },

    // ========================
    // Hero section
    // ========================
    heroContainer: {
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 4,
    },
    heroEmoji: {
        fontSize: 44,
        marginBottom: 8,
    },
    heroTitle: {
        fontFamily: Typography.fontFamily.black,
        fontSize: 24,
        lineHeight: 30,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 6,
    },
    heroSubtitle: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: 14,
        lineHeight: 20,
        color: 'rgba(255,255,255,0.80)',
        textAlign: 'center',
        maxWidth: 300,
    },

    // ========================
    // Plan Selector Tabs (Tinder-style)
    // ========================
    planSelectorContainer: {
        marginBottom: 20,
    },
    planSelectorRow: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 16,
        padding: 4,
        gap: 4,
    },
    planTab: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    planTabActive: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOpacity: 0.10,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    planTabTitle: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: 13,
        color: 'rgba(255,255,255,0.65)',
    },
    planTabTitleActive: {
        color: PINK,
    },
    planTabPrice: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: 10.5,
        color: 'rgba(255,255,255,0.50)',
        marginTop: 2,
    },
    planTabPriceActive: {
        color: SUB,
    },
    tabBadge: {
        position: 'absolute',
        top: -6,
        right: -2,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    tabBadgeText: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: 9,
        color: '#FFFFFF',
    },

    // ========================
    // Detail Card (single plan view)
    // ========================
    detailCard: {
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.95)',
        padding: 24,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
        elevation: 5,
    },
    detailHeader: {
        alignItems: 'center',
        marginBottom: 16,
    },
    detailTitle: {
        fontFamily: Typography.fontFamily.black,
        fontSize: 22,
        lineHeight: 28,
        color: TEXT,
        textAlign: 'center',
    },
    detailDescription: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: 14,
        lineHeight: 20,
        color: SUB,
        textAlign: 'center',
        marginTop: 4,
    },
    detailDivider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.06)',
        marginVertical: 16,
    },

    // Benefits
    benefitsList: {
        gap: 14,
        marginBottom: 20,
    },
    benefitRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    checkCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 1,
    },
    checkMark: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: 13,
        lineHeight: 14,
        color: '#FFFFFF',
    },
    benefitTextBlock: {
        flex: 1,
    },
    benefitTitle: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: 14.5,
        lineHeight: 19,
        color: TEXT,
        marginBottom: 2,
    },
    benefitSubtitle: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: 12.5,
        lineHeight: 17,
        color: SUB,
    },

    // Price in card
    priceContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    priceText: {
        fontFamily: Typography.fontFamily.black,
        fontSize: 28,
        lineHeight: 34,
        color: TEXT,
    },
    priceNote: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: 12,
        lineHeight: 17,
        color: SUB,
        marginTop: 2,
    },

    // CTA in card
    ctaButton: {
        height: 52,
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: PINK,
        shadowOpacity: 0.30,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
        elevation: 8,
    },
    ctaButtonDisabled: {
        shadowOpacity: 0,
        elevation: 0,
        opacity: 0.55,
    },
    ctaText: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: 16,
        lineHeight: 20,
        color: '#FFFFFF',
        letterSpacing: 0.3,
    },

    // ========================
    // Error state
    // ========================
    errorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        paddingHorizontal: 32,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 24,
        marginBottom: 20,
    },
    errorEmoji: {
        fontSize: 44,
        marginBottom: 16,
    },
    errorTitle: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: 18,
        color: TEXT,
        textAlign: 'center',
        marginBottom: 8,
    },
    errorMessage: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: 14,
        lineHeight: 20,
        color: SUB,
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 22,
    },
    retryButtonText: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: 14,
        color: '#FFFFFF',
    },

    // ========================
    // Footer note
    // ========================
    footerNote: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: 12,
        lineHeight: 17,
        color: 'rgba(255,255,255,0.55)',
        textAlign: 'center',
        marginTop: 4,
    },

    // ========================
    // Loading overlay
    // ========================
    purchaseOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.50)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        elevation: 10000,
        borderRadius: 0,
    },
    purchaseText: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: 16,
        color: '#FFFFFF',
        marginTop: 16,
    },
});
