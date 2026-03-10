/**
 * PaywallModal — Modal fullscreen premium que bloquea el chat
 *
 * Se monta como overlay absoluto sobre HomeScreen.
 * Muestra 3 planes de suscripción con diseño oscuro premium.
 * Animaciones de entrada slide-up, selección con spring scale.
 */
import React, { useEffect } from 'react';
import {
    View,
    Text,
    Pressable,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import Animated, {
    FadeIn,
    FadeOut,
    SlideInDown,
    SlideOutDown,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withSequence,
    withRepeat,
    withTiming,
    Easing,
    interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/shared/theme/colors';
import { PAYWALL_PLANS, type PaywallPlan } from '../constants/paywall.constants';
import type { PlanId } from '../store/subscription.store';
import { styles } from './PaywallModal.styles';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// ===== TYPES =====
interface PaywallModalProps {
    visible: boolean;
    companionName?: string;
    selectedPlan: PlanId | null;
    onSelectPlan: (planId: PlanId) => void;
    onPurchase: () => Promise<void>;
    onRestore: () => Promise<void>;
    onDismiss: () => void;
    purchaseState: 'idle' | 'loading' | 'success' | 'error';
    error: string | null;
    /** Si el paywall fue disparado por límite (no se puede cerrar) */
    isBlocking: boolean;
    messagesRemaining: number;
}

// ===== PLAN CARD COMPONENT =====
const PlanCard: React.FC<{
    plan: PaywallPlan;
    isSelected: boolean;
    onSelect: () => void;
    index: number;
}> = ({ plan, isSelected, onSelect, index }) => {
    const scale = useSharedValue(1);

    useEffect(() => {
        if (isSelected) {
            scale.value = withSequence(
                withSpring(0.96, { damping: 15, stiffness: 400 }),
                withSpring(1, { damping: 12, stiffness: 300 })
            );
        }
    }, [isSelected, scale]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <AnimatedPressable
            onPress={onSelect}
            entering={SlideInDown.delay(100 + index * 80).duration(400).springify()}
            style={animatedStyle}
        >
            <View
                style={[
                    styles.planCard,
                    plan.highlighted && styles.planCardHighlighted,
                    isSelected && styles.planCardSelected,
                ]}
            >
                {/* Recommended badge */}
                {plan.highlighted && (
                    <View style={styles.recommendedBadgeOuter}>
                        <LinearGradient
                            colors={[Colors.auxiliary.primary, Colors.base.secondary]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.recommendedBadge}
                        >
                            <Text style={styles.recommendedText}>Recomendado</Text>
                        </LinearGradient>
                    </View>
                )}

                <View
                    style={[
                        styles.planCardInner,
                        plan.highlighted && styles.planCardInnerHighlighted,
                        isSelected && styles.planCardInnerSelected,
                    ]}
                >
                    <View style={styles.planLeftSection}>
                        {/* Radio indicator */}
                        <View
                            style={[
                                styles.radioOuter,
                                isSelected && styles.radioOuterSelected,
                            ]}
                        >
                            {isSelected && <View style={styles.radioInner} />}
                        </View>

                        {/* Plan info */}
                        <View style={styles.planTextBlock}>
                            <Text
                                style={[
                                    styles.planTitle,
                                    isSelected && styles.planTitleSelected,
                                ]}
                            >
                                {plan.emoji} {plan.title}
                            </Text>
                            <Text style={styles.planSubtitle}>{plan.subtitle}</Text>
                            <Text style={styles.planMessages}>
                                {plan.messages} mensajes / mes
                            </Text>
                        </View>
                    </View>

                    {/* Price */}
                    <View style={styles.planRightSection}>
                        <Text
                            style={[
                                styles.planPrice,
                                isSelected && styles.planPriceSelected,
                            ]}
                        >
                            {plan.priceFallback}
                        </Text>
                        <Text style={styles.planPeriod}>/ mes</Text>
                    </View>
                </View>
            </View>
        </AnimatedPressable>
    );
};

// ===== SHIMMER FOR HIGHLIGHTED PLAN =====
const ShimmerEffect: React.FC = () => {
    const shimmerProgress = useSharedValue(0);

    useEffect(() => {
        shimmerProgress.value = withRepeat(
            withTiming(1, { duration: 2500, easing: Easing.linear }),
            -1,
            false
        );
    }, [shimmerProgress]);

    const shimmerStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            shimmerProgress.value,
            [0, 0.3, 0.5, 0.7, 1],
            [0, 0.15, 0.3, 0.15, 0]
        ),
    }));

    return (
        <Animated.View
            style={[
                {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: Colors.base.secondary,
                    borderRadius: 16,
                },
                shimmerStyle,
            ]}
            pointerEvents="none"
        />
    );
};

// ===== MAIN COMPONENT =====
export const PaywallModal: React.FC<PaywallModalProps> = ({
    visible,
    companionName,
    selectedPlan,
    onSelectPlan,
    onPurchase,
    onRestore,
    onDismiss,
    purchaseState,
    error,
    isBlocking,
    messagesRemaining,
}) => {
    const insets = useSafeAreaInsets();
    const isLoading = purchaseState === 'loading';
    const canDismiss = !isBlocking;

    if (!visible) return null;

    return (
        <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(200)}
            style={styles.overlay}
        >
            <LinearGradient
                colors={['rgba(186, 176, 237, 0.2)', 'rgba(255, 255, 255, 0.92)']}
                style={styles.backdropGradient}
            >
                <View style={styles.container}>
                    <Animated.View
                        entering={SlideInDown.duration(500).springify().damping(18)}
                        exiting={SlideOutDown.duration(300)}
                        style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}
                    >
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            bounces={false}
                            contentContainerStyle={styles.scrollContent}
                        >
                            {/* HEADER */}
                            <View style={styles.header}>
                                {canDismiss ? (
                                    <Pressable
                                        onPress={onDismiss}
                                        style={styles.closeButton}
                                        hitSlop={12}
                                    >
                                        <Text style={styles.closeText}>✕</Text>
                                    </Pressable>
                                ) : (
                                    <View style={styles.headerSpacer} />
                                )}
                                <Text style={styles.headerTitle}>eJoi Premium</Text>
                                <View style={styles.headerSpacer} />
                            </View>

                            {/* HERO */}
                            <View style={styles.heroSection}>
                                {messagesRemaining <= 0 && (
                                    <View style={styles.counterBadge}>
                                        <Text style={{ fontSize: 14 }}>⚡</Text>
                                        <Text style={styles.counterText}>
                                            Has alcanzado el límite de mensajes gratis
                                        </Text>
                                    </View>
                                )}

                                <Text style={styles.heroEmoji}>✨</Text>

                                <Animated.Text
                                    entering={FadeIn.delay(200).duration(400)}
                                    style={styles.heroTitle}
                                >
                                    Desbloquea la{'\n'}experiencia completa
                                </Animated.Text>

                                <Animated.Text
                                    entering={FadeIn.delay(350).duration(400)}
                                    style={styles.heroSubtitle}
                                >
                                    Elige el plan que mejor se adapte a ti y sigue la conversación con {companionName ?? 'tu companion'} sin interrupciones.
                                </Animated.Text>
                            </View>

                            {/* PLANS */}
                            <View style={styles.plansSection}>
                                {PAYWALL_PLANS.map((plan, index) => (
                                    <View key={plan.id} style={{ position: 'relative' }}>
                                        {plan.highlighted && <ShimmerEffect />}
                                        <PlanCard
                                            plan={plan}
                                            isSelected={selectedPlan === plan.id}
                                            onSelect={() => onSelectPlan(plan.id)}
                                            index={index}
                                        />
                                    </View>
                                ))}
                            </View>

                            {/* ERROR */}
                            {error && (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorText}>{error}</Text>
                                </View>
                            )}

                            {/* CTA */}
                            <View style={styles.ctaSection}>
                                <Pressable
                                    onPress={onPurchase}
                                    disabled={!selectedPlan || isLoading}
                                    style={({ pressed }) => [
                                        pressed && !isLoading && { opacity: 0.9, transform: [{ scale: 0.98 }] },
                                    ]}
                                >
                                    <LinearGradient
                                        colors={[Colors.base.primary, '#E56AA6', Colors.base.secondary]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={[
                                            styles.ctaGradient,
                                            (!selectedPlan || isLoading) && styles.ctaGradientDisabled,
                                        ]}
                                    >
                                        {isLoading ? (
                                            <ActivityIndicator color="#FFFFFF" size="small" />
                                        ) : (
                                            <Text style={styles.ctaText}>
                                                {selectedPlan
                                                    ? `Suscribirse · ${PAYWALL_PLANS.find((p) => p.id === selectedPlan)?.priceFallback}/mes`
                                                    : 'Selecciona un plan'}
                                            </Text>
                                        )}
                                    </LinearGradient>
                                </Pressable>
                            </View>

                            {/* RESTORE */}
                            <Pressable onPress={onRestore} style={styles.restoreButton}>
                                <Text style={styles.restoreText}>Restaurar compras</Text>
                            </Pressable>

                            {/* LEGAL */}
                            <Text style={styles.legalText}>
                                Pago seguro · Cancela cuando quieras · Los precios pueden variar según tu ubicación
                            </Text>
                        </ScrollView>
                    </Animated.View>
                </View>
            </LinearGradient>
        </Animated.View>
    );
};

export default PaywallModal;
