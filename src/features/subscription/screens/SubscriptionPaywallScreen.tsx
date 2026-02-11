import React, { useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  ScrollView,
  ImageSourcePropType,
  Animated,
} from 'react-native';

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

import { RootStackParamList } from '@/shared/types/navigation';
import { GradientBackground, ContentContainer } from '@/shared/components';
import { useSubscriptionStore, PlanId } from '@/features/subscription/store/subscription.store';

import { styles } from './SubscriptionPaywallScreen.styles';

type Nav = NativeStackNavigationProp<RootStackParamList, 'SubscriptionPaywall'>;
type Rt = RouteProp<RootStackParamList, 'SubscriptionPaywall'>;

type Plan = {
  id: PlanId;
  title: string;
  price: string;
  recommended?: boolean;
  image: ImageSourcePropType;
  perks: { title: string; subtitle: string }[];
};

const PLANS: Plan[] = [
  {
    id: 'Amigo',
    title: 'Amigo',
    price: '$12.990 / mes',
    image: require('@/assets/images/paywall/amigo.png'),
    perks: [
      { title: 'Acceso al chat', subtitle: 'Habla con {name} y rompe el hielo.' },
      { title: 'Memoria básica', subtitle: '{name} recuerda lo esencial para mantener contexto.' },
      { title: 'Acceso 24/7', subtitle: 'Disponible cuando lo necesites.' },
    ],
  },
  {
    id: 'Amigo Cercano',
    title: 'Amigo Cercano',
    price: '$25.990 / mes',
    recommended: true,
    image: require('@/assets/images/paywall/amigo-cercano.png'),
    perks: [
      { title: 'Memoria emocional avanzada', subtitle: '{name} recuerda gustos y anécdotas importantes.' },
      { title: 'Continuidad extendida', subtitle: 'Conversaciones más fluidas en el tiempo.' },
      { title: 'Respuestas más profundas', subtitle: 'Más naturales y personalizadas.' },
    ],
  },
  {
    id: 'Mejor Amigo',
    title: 'Mejor Amigo',
    price: '$64.990 / mes',
    image: require('@/assets/images/paywall/mejor-amigo.png'),
    perks: [
      { title: 'Memoria ilimitada', subtitle: '{name} recuerda detalles y evolución de la relación.' },
      { title: 'Máxima continuidad', subtitle: 'Menos “reinicios”, más conexión real.' },
      { title: 'Acceso prioritario', subtitle: 'Sé de los primeros en probar nuevas funciones.' },
    ],
  },
];

export const SubscriptionPaywallScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();

  const companion = route.params?.companion;
  const companionName = companion?.name ?? 'tu compañer@';

  const selectedPlan = useSubscriptionStore((s) => s.selectedPlan);
  const selectPlan = useSubscriptionStore((s) => s.selectPlan);
  const confirmSubscription = useSubscriptionStore((s) => s.confirmSubscription);

  const isDisabled = useMemo(() => !selectedPlan, [selectedPlan]);

  const defaultPlan = useMemo(() => PLANS.find((p) => p.recommended) ?? PLANS[0], []);
  const activePlan = useMemo(() => {
    return PLANS.find((p) => p.id === selectedPlan) ?? defaultPlan;
  }, [selectedPlan, defaultPlan]);

  const perksToShow = useMemo(() => {
    return activePlan.perks.map((x) => ({
      title: x.title.replaceAll('{name}', companionName),
      subtitle: x.subtitle.replaceAll('{name}', companionName),
    }));
  }, [activePlan, companionName]);

  const heroImage = useMemo(() => activePlan.image, [activePlan]);

  // Animación perks
  const perksAnim = useRef(new Animated.Value(1)).current;
  const perksSlide = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    perksAnim.setValue(0);
    perksSlide.setValue(8);

    Animated.parallel([
      Animated.timing(perksAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(perksSlide, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [activePlan.id, perksAnim, perksSlide]);

  const handleContinue = () => {
    confirmSubscription();
    navigation.replace('Home');
  };

  return (
    <GradientBackground variant="wizard" overlayOpacity={0.06}>
      <View style={styles.screen}>
        <ContentContainer>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={{ flex: 1 }}
          >
            {/* HERO */}
            <View style={styles.hero}>
              <ImageBackground
                source={heroImage}
                style={styles.heroBg}
                imageStyle={styles.heroBgImg}
                resizeMode="cover"
              >
                <LinearGradient
                  colors={['rgba(0,0,0,0.08)', 'rgba(0,0,0,0.62)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.heroOverlay}
                />

                <View style={styles.heroContent}>
                  <Text style={styles.heroTitle}>Desbloquea la experiencia completa</Text>
                  <Text style={styles.heroSubtitle}>
                    Para seguir conversando con {companionName}, elige una suscripción.
                  </Text>
                </View>
              </ImageBackground>
            </View>

            {/* BENEFICIOS */}
            <View style={styles.benefitsCardOuter}>
              <View style={styles.benefitsCard}>
                <Text style={styles.benefitsHeader}>
                  Lo que hace especial a {activePlan.title}
                </Text>

                <View style={styles.headerDivider} />

                <Animated.View
                  style={[
                    styles.benefitsList,
                    { opacity: perksAnim, transform: [{ translateY: perksSlide }] },
                  ]}
                >
                  {perksToShow.map((b) => (
                    <View key={b.title} style={styles.benefitRow}>
                      <View style={styles.checkCircle}>
                        <Text style={styles.checkMark}>✓</Text>
                      </View>

                      <View style={styles.benefitTextBlock}>
                        <Text style={styles.benefitTitle}>{b.title}</Text>
                        <Text style={styles.benefitSubtitle}>{b.subtitle}</Text>
                      </View>
                    </View>
                  ))}
                </Animated.View>

                <Text style={styles.microNote}>Cancela cuando quieras · Pago seguro</Text>
              </View>
            </View>

            {/* PLANES */}
            <View style={styles.plansSection}>
              <Text style={styles.plansTitle}>Elige tu plan</Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.planChipsRow}
              >
                {PLANS.map((p) => {
                  const active = selectedPlan === p.id;
                  const isRecommendedVisual = !selectedPlan && p.recommended;

                  const Badge = () => (
                    <View style={styles.badgeSlot}>
                      {p.recommended ? (
                        <View style={styles.recoMiniBadge}>
                          <Text style={styles.recoMiniBadgeText}>Recomendado</Text>
                        </View>
                      ) : (
                        <View style={styles.recoMiniBadgePlaceholder} />
                      )}
                    </View>
                  );

                  return (
                    <Pressable
                      key={p.id}
                      onPress={() => selectPlan(p.id)}
                      hitSlop={10}
                      style={({ pressed }) => [pressed && { opacity: 0.96 }]}
                    >
                      {active ? (
                        <LinearGradient
                          colors={['#FF2D87', '#C78BFF']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.planChipOuterActive}
                        >
                          <View style={[styles.planChip, styles.planChipInnerActive]}>
                            <Badge />

                            <Text style={[styles.planChipTitle, styles.planChipTitleActive]}>
                              {p.title}
                            </Text>

                            <Text style={styles.planChipPrice}>{p.price}</Text>

                            <Text style={styles.planHint}>
                              {p.id === 'Amigo' && 'Para empezar suave'}
                              {p.id === 'Amigo Cercano' && 'Más conexión y continuidad'}
                              {p.id === 'Mejor Amigo' && 'La experiencia completa'}
                            </Text>
                          </View>
                        </LinearGradient>
                      ) : (
                        <View
                          style={[
                            styles.planChipOuter,
                            isRecommendedVisual && styles.planChipOuterRecommended,
                          ]}
                        >
                          <View
                            style={[
                              styles.planChip,
                              isRecommendedVisual && styles.planChipInnerRecommended,
                            ]}
                          >
                            <Badge />

                            <Text style={styles.planChipTitle}>{p.title}</Text>
                            <Text style={styles.planChipPrice}>{p.price}</Text>

                            <Text style={styles.planHint}>
                              {p.id === 'Amigo' && 'Para empezar suave'}
                              {p.id === 'Amigo Cercano' && 'Más conexión y continuidad'}
                              {p.id === 'Mejor Amigo' && 'La experiencia completa'}
                            </Text>
                          </View>
                        </View>
                      )}
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          </ScrollView>
        </ContentContainer>

        {/* CTA LOCAL */}
        <View style={styles.ctaDock} pointerEvents="box-none">
          <LinearGradient
            colors={[
              'rgba(232, 208, 245, 0.00)',
              'rgba(232, 208, 245, 0.92)',
              'rgba(232, 208, 245, 1.00)',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.ctaFade}
            pointerEvents="none"
          />

          <Pressable
            onPress={handleContinue}
            disabled={isDisabled}
            style={({ pressed }) => [
              styles.ctaButton,
              isDisabled && styles.ctaButtonDisabled,
              pressed && !isDisabled && { transform: [{ scale: 0.99 }], opacity: 0.95 },
            ]}
          >
            <Text style={[styles.ctaText, isDisabled && styles.ctaTextDisabled]}>
              Continuar
            </Text>
          </Pressable>
        </View>
      </View>
    </GradientBackground>
  );
};

export default SubscriptionPaywallScreen;