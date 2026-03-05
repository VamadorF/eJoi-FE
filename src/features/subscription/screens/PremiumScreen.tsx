/**
 * PremiumScreen — Tinder-inspired paywall
 *
 * Pantalla de suscripción premium con plan selector tabs + detail card.
 * Se renderiza como overlay full-screen dentro de HomeScreen.
 *
 * TODO: [ANALYTICS] Trackear apertura, cierre, selección de plan, compra
 * TODO: [BACKEND] Integrar con billing SDK real (react-native-iap)
 * TODO: [BACKEND] Refresh de suscripción al volver a la app
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    View,
    Text,
    Pressable,
    ScrollView,
    ActivityIndicator,
    useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { Colors } from '@/shared/theme/colors';
import { PREMIUM_PLANS, PremiumPlan } from '../config/premiumPlans';
import {
    getDisplayPrice,
    handleSubscribe,
    SubscribeResult,
} from '../helpers/premiumHelpers';
import { useSubscriptionStore } from '../store/subscription.store';
import { premiumStyles as styles } from './PremiumScreen.styles';

// ============================================================
// Types
// ============================================================

interface PremiumScreenProps {
    /** Companion data, for personalizing text */
    companion?: { name?: string } | null;
    /** Callback when user dismisses the screen */
    onClose: () => void;
    /** Callback after a successful purchase */
    onPurchaseSuccess?: () => void;
}

// ============================================================
// Component
// ============================================================

export const PremiumScreen: React.FC<PremiumScreenProps> = ({
    companion,
    onClose,
    onPurchaseSuccess,
}) => {
    const companionName = companion?.name ?? 'tu compañer@';

    // --- Responsive breakpoints ---
    const { width, height } = useWindowDimensions();
    const isXS = width <= 360 || height <= 700;
    const isTablet = width >= 600;

    // Responsive sizes
    const heroEmojiSize = isXS ? 36 : isTablet ? 52 : 44;
    const heroTitleSize = isXS ? 20 : isTablet ? 28 : 24;
    const heroSubSize = isXS ? 12 : isTablet ? 15 : 13.5;
    const detailTitleSize = isXS ? 18 : isTablet ? 26 : 22;
    const benefitTitleSize = isXS ? 13 : isTablet ? 16 : 14.5;
    const benefitSubSize = isXS ? 11.5 : isTablet ? 14 : 12.5;
    const priceSize = isXS ? 24 : isTablet ? 34 : 28;
    const ctaHeight = isXS ? 46 : isTablet ? 56 : 52;
    const ctaFontSize = isXS ? 14 : isTablet ? 18 : 16;
    const cardPadding = isXS ? 18 : isTablet ? 32 : 24;
    const scrollPadH = isXS ? 14 : isTablet ? 40 : 20;
    const tabFontSize = isXS ? 11.5 : isTablet ? 15 : 13;
    const maxContentWidth = isTablet ? 550 : undefined;

    // --- State ---
    const [selectedPlanIndex, setSelectedPlanIndex] = useState(() => {
        // Default to the highlighted (recommended) plan
        const idx = PREMIUM_PLANS.findIndex((p) => p.highlighted);
        return idx >= 0 ? idx : 0;
    });
    const [pricesLoaded, setPricesLoaded] = useState(false);
    const [prices, setPrices] = useState<Record<string, string | null>>({});
    const [purchasingPlanId, setPurchasingPlanId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const selectedPlan = PREMIUM_PLANS[selectedPlanIndex];

    // Benefits with companion name replaced
    const displayBenefits = useMemo(() => {
        return selectedPlan.benefits.map((b) => ({
            title: b.title.replaceAll('{name}', companionName),
            subtitle: b.subtitle.replaceAll('{name}', companionName),
        }));
    }, [selectedPlan, companionName]);

    // --- Store ---
    const confirmSubscription = useSubscriptionStore((s) => s.confirmSubscription);

    // --- Load prices ---
    useEffect(() => {
        loadPrices();
    }, []);

    const loadPrices = useCallback(async () => {
        setError(null);

        try {
            /**
             * TODO: [BILLING] Reemplazar este mock con la carga real de precios:
             * 1. Inicializar react-native-iap
             * 2. Llamar getProducts() con los productIds
             * 3. Poblar el cache con updatePriceCache()
             * 4. Leer precios con getDisplayPrice()
             */

            // Mock: simular delay de carga
            await new Promise((resolve) => setTimeout(resolve, 800));

            const loadedPrices: Record<string, string | null> = {};
            for (const plan of PREMIUM_PLANS) {
                const price = getDisplayPrice(plan.productId);
                // Usar defaultPrice como fallback si billing SDK no está integrado
                loadedPrices[plan.productId] = price ?? plan.defaultPrice;
            }

            setPrices(loadedPrices);
            setPricesLoaded(true);
        } catch (err) {
            setError('No pudimos cargar los precios. Intenta de nuevo.');
        }
    }, []);

    // --- Handle purchase ---
    const onPressPurchase = useCallback(async () => {
        if (purchasingPlanId) return;

        setPurchasingPlanId(selectedPlan.id);
        setError(null);

        // TODO: [ANALYTICS] Trackear intento de compra: { planId, productId }

        const result: SubscribeResult = await handleSubscribe(selectedPlan.productId);

        if (result.success) {
            // TODO: [BACKEND] Actualizar estado premium en el servidor
            // TODO: [BACKEND] Unlock persistente de features
            confirmSubscription();
            onPurchaseSuccess?.();
            onClose();
        } else {
            setError(result.error ?? 'Error al procesar la compra.');
        }

        setPurchasingPlanId(null);
    }, [purchasingPlanId, selectedPlan, confirmSubscription, onPurchaseSuccess, onClose]);

    const isPurchasing = purchasingPlanId === selectedPlan.id;
    const currentPrice = prices[selectedPlan.productId];

    // ============================================================
    // Render
    // ============================================================
    return (
        <View style={styles.overlay}>
            <LinearGradient
                colors={[Colors.base.primary, Colors.base.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Premium</Text>
                    </View>

                    {/* Content */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={[
                            styles.scrollContent,
                            { paddingHorizontal: scrollPadH },
                            isTablet && { alignItems: 'center' as const },
                        ]}
                    >
                        {/* Hero */}
                        <View style={[
                            styles.heroContainer,
                            maxContentWidth ? { maxWidth: maxContentWidth, width: '100%' } : undefined,
                        ]}>
                            <Text style={[styles.heroEmoji, { fontSize: heroEmojiSize }]}>✨</Text>
                            <Text style={[
                                styles.heroTitle,
                                { fontSize: heroTitleSize, lineHeight: Math.round(heroTitleSize * 1.25) },
                            ]}>
                                Desbloquea la experiencia completa
                            </Text>
                            <Text style={[
                                styles.heroSubtitle,
                                { fontSize: heroSubSize, lineHeight: Math.round(heroSubSize * 1.45) },
                                isTablet && { maxWidth: 400 },
                            ]}>
                                Lleva tu conexión con {companionName} al siguiente nivel
                            </Text>
                        </View>

                        {/* Plan Selector Tabs */}
                        <View style={[
                            styles.planSelectorContainer,
                            maxContentWidth ? { maxWidth: maxContentWidth, width: '100%' } : undefined,
                        ]}>
                            <View style={styles.planSelectorRow}>
                                {PREMIUM_PLANS.map((plan, index) => {
                                    const isActive = index === selectedPlanIndex;
                                    const price = prices[plan.productId];

                                    return (
                                        <Pressable
                                            key={plan.id}
                                            onPress={() => setSelectedPlanIndex(index)}
                                            style={[
                                                styles.planTab,
                                                isActive && styles.planTabActive,
                                            ]}
                                        >
                                            {/* Badge */}
                                            {plan.badge && (
                                                <LinearGradient
                                                    colors={[Colors.base.primary, Colors.base.secondary]}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 0 }}
                                                    style={styles.tabBadge}
                                                >
                                                    <Text style={styles.tabBadgeText}>{plan.badge}</Text>
                                                </LinearGradient>
                                            )}

                                            <Text style={[
                                                styles.planTabTitle,
                                                { fontSize: tabFontSize },
                                                isActive && styles.planTabTitleActive,
                                            ]}>
                                                {plan.title}
                                            </Text>

                                            {pricesLoaded && price && (
                                                <Text style={[
                                                    styles.planTabPrice,
                                                    isActive && styles.planTabPriceActive,
                                                ]}>
                                                    {price}
                                                </Text>
                                            )}
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </View>

                        {/* Error or Detail Card */}
                        {error && !pricesLoaded ? (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorEmoji}>😔</Text>
                                <Text style={styles.errorTitle}>Algo salió mal</Text>
                                <Text style={styles.errorMessage}>{error}</Text>
                                <Pressable onPress={loadPrices}>
                                    <LinearGradient
                                        colors={[Colors.base.primary, Colors.base.secondary]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.retryButton}
                                    >
                                        <Text style={styles.retryButtonText}>Reintentar</Text>
                                    </LinearGradient>
                                </Pressable>
                            </View>
                        ) : (
                            <View style={[
                                styles.detailCard,
                                { padding: cardPadding },
                                maxContentWidth ? { maxWidth: maxContentWidth, width: '100%' } : undefined,
                            ]}>
                                {/* Plan header */}
                                <View style={styles.detailHeader}>
                                    <Text style={[styles.detailTitle, {
                                        fontSize: detailTitleSize,
                                        lineHeight: Math.round(detailTitleSize * 1.25),
                                    }]}>
                                        {selectedPlan.title}
                                    </Text>
                                    <Text style={styles.detailDescription}>
                                        {selectedPlan.description}
                                    </Text>
                                </View>

                                <View style={styles.detailDivider} />

                                {/* Benefits */}
                                <View style={styles.benefitsList}>
                                    {displayBenefits.map((benefit, index) => (
                                        <View key={index} style={styles.benefitRow}>
                                            <LinearGradient
                                                colors={[Colors.base.primary, Colors.base.secondary]}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                                style={styles.checkCircle}
                                            >
                                                <Text style={styles.checkMark}>✓</Text>
                                            </LinearGradient>
                                            <View style={styles.benefitTextBlock}>
                                                <Text style={[styles.benefitTitle, {
                                                    fontSize: benefitTitleSize,
                                                    lineHeight: Math.round(benefitTitleSize * 1.3),
                                                }]}>
                                                    {benefit.title}
                                                </Text>
                                                <Text style={[styles.benefitSubtitle, {
                                                    fontSize: benefitSubSize,
                                                    lineHeight: Math.round(benefitSubSize * 1.4),
                                                }]}>
                                                    {benefit.subtitle}
                                                </Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>

                                {/* Price */}
                                <View style={styles.priceContainer}>
                                    {pricesLoaded ? (
                                        <>
                                            <Text style={[styles.priceText, { fontSize: priceSize }]}>
                                                {currentPrice ?? '—'}
                                            </Text>
                                            <Text style={styles.priceNote}>
                                                Cancela cuando quieras
                                            </Text>
                                        </>
                                    ) : (
                                        <ActivityIndicator size="small" color={Colors.base.primary} />
                                    )}
                                </View>

                                {/* CTA */}
                                <Pressable
                                    onPress={onPressPurchase}
                                    disabled={isPurchasing || !pricesLoaded}
                                    style={({ pressed }) => [
                                        pressed && !isPurchasing && { opacity: 0.92, transform: [{ scale: 0.98 }] },
                                    ]}
                                >
                                    <LinearGradient
                                        colors={
                                            isPurchasing || !pricesLoaded
                                                ? ['rgba(242,10,100,0.40)', 'rgba(186,176,237,0.40)']
                                                : [Colors.base.primary, Colors.base.secondary]
                                        }
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={[
                                            styles.ctaButton,
                                            { height: ctaHeight, borderRadius: ctaHeight / 2 },
                                            (isPurchasing || !pricesLoaded) && styles.ctaButtonDisabled,
                                        ]}
                                    >
                                        {isPurchasing ? (
                                            <ActivityIndicator size="small" color="#FFFFFF" />
                                        ) : (
                                            <Text style={[styles.ctaText, { fontSize: ctaFontSize }]}>
                                                Suscribirme
                                            </Text>
                                        )}
                                    </LinearGradient>
                                </Pressable>
                            </View>
                        )}

                        {/* Footer note */}
                        <Text style={styles.footerNote}>
                            Pago seguro · Se renueva automáticamente
                        </Text>
                    </ScrollView>
                </SafeAreaView>

                {/* Full-screen purchase overlay */}
                {purchasingPlanId && (
                    <View style={styles.purchaseOverlay}>
                        <ActivityIndicator size="large" color="#FFFFFF" />
                        <Text style={styles.purchaseText}>Procesando compra...</Text>
                    </View>
                )}
            </LinearGradient>
        </View>
    );
};

export default PremiumScreen;
